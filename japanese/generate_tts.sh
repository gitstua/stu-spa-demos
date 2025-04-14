#!/bin/bash

#show error if not running on macOS where it has say
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "❌ This script is intended to run on macOS only."
  exit 1
fi
# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
  echo "❌ ffmpeg could not be found. Please install it first."
  exit 1
fi
# Check if say command is available
if ! command -v say &> /dev/null; then
  echo "❌ say command could not be found. Please install it first."
  exit 1
fi
# Check if the input file exists
if [ ! -f "words.csv" ]; then
  echo "❌ Input file 'words.csv' not found. Please place it in the same directory as this script."
  exit 1
fi


set -e

INPUT_FILE="words.csv"
OUTPUT_DIR="audio_files"
VOICE="Kyoko" # macOS Japanese voice
RATE=110      # Speaking rate

mkdir -p "$OUTPUT_DIR"

echo "🎙️  Generating MP3 audio from $INPUT_FILE ..."
echo ""

count=0
errors=0

while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" ]] && continue

  jp=$(echo "$line" | awk -F',' '{print $1}' | sed 's/^"//;s/"$//')

  if [[ $jp =~ \[sound:(.*)\] ]]; then
    filename="${BASH_REMATCH[1]}"
  else
    echo "❌ Could not extract filename from: $jp"
    ((errors++))
    continue
  fi

  # Extract Japanese characters (assumes final part of field)
  japanese_text=$(echo "$jp" | sed -E 's/.* ([^ ]+)$/\1/')

  base="${filename%.mp3}"
  aiff_path="$OUTPUT_DIR/${base}.aiff"
  mp3_path="$OUTPUT_DIR/${base}.mp3"

  echo "🔊 $filename ← $japanese_text"

  if ! say -v "$VOICE" -r "$RATE" -o "$aiff_path" "$japanese_text"; then
    echo "❌ Error generating $filename"
    ((errors++))
    continue
  fi

  # Convert AIFF to MP3 with ffmpeg (you can also use `lame` if you prefer)
  if ! ffmpeg -loglevel error -y -i "$aiff_path" -codec:a libmp3lame -qscale:a 4 "$mp3_path"; then
    echo "❌ ffmpeg failed for $filename"
    ((errors++))
    continue
  fi

  rm "$aiff_path"
  ((count++))

done < "$INPUT_FILE"

echo ""
echo "✅ Done! $count items processed, $errors errors"
echo "📁 MP3 audio files saved to: $OUTPUT_DIR"
