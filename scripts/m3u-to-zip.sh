#!/usr/bin/env bash
set -euo pipefail
shopt -s extglob

usage() {
	echo "Usage: $0 <m3u_url> [output.zip]" >&2
	exit 1
}

[[ $# -lt 1 ]] && usage

m3u_url="$1"
output_zip="${2:-}"

if [[ -z "$output_zip" ]]; then
	base_name=$(basename "${m3u_url%%[?#]*}")
	base_name=${base_name%.*}
	output_zip="./out/${base_name:-playlist}.zip"
fi

mkdir -p ./out/cache
cachedir="./out/cache"
workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT

curl -fsSL "$m3u_url" -o "$workdir/list.m3u"

base_url="${m3u_url%/*}/"

encode_spaces() {
	local s="$1"
	s="${s// /%20}"
	echo "$s"
}

resolve_url() {
	local entry="$1"
	if [[ "$entry" =~ ^https?:// ]]; then
		echo "$(encode_spaces "$entry")"
	else
		entry="${entry#./}"
		echo "$(encode_spaces "${base_url}${entry}")"
	fi
}

unique_name() {
	local path="$1" name suffix=1 stem ext
	stem="${path%.*}"
	ext="${path##*.}"
	[[ "$ext" == "$path" ]] && ext=""
	while [[ -e "$path" ]]; do
		path="$stem-$suffix"
		[[ -n "$ext" ]] && path+=".$ext"
		((suffix++))
	done
	echo "$path"
}

downloads=0
outputs=()
while IFS= read -r line || [[ -n "$line" ]]; do
	line=${line//$'\r'/}
	line="${line##+([[:space:]])}"
	line="${line%%+([[:space:]])}"
	[[ -z "$line" || "$line" =~ ^# ]] && continue
	url=$(resolve_url "$line")
	filename=$(basename "${line%%[?#]*}")
	target="$cachedir/$filename"
	target=$(unique_name "$target")
	if [[ ! -f "$target" ]]; then
		echo "Downloading: $filename"
		curl -f --retry 3 --retry-delay 1 -L "$url" -o "$target"
	else
		echo "Cached: $filename"
	fi
	if command -v ffmpeg >/dev/null 2>&1; then
		opus_target="$workdir/$(basename "${target%.*}").opus"
		opus_target=$(unique_name "$opus_target")
		ffmpeg -nostdin -v warning -y -i "$target" -ac 1 -ar 48000 -c:a libopus -b:a 48k "$opus_target"
		outputs+=("$opus_target")
	fi
	((downloads++))
done < "$workdir/list.m3u"

if [[ $downloads -eq 0 ]]; then
	echo "No entries found in playlist." >&2
	exit 1
fi

zip -jq "$output_zip" "${outputs[@]}"
echo "Created $output_zip with $downloads file(s)."
