# Basic Japanese Phrases for Travel

This repository contains a collection of common Japanese phrases useful for travelers to Japan. The main content is stored in [`words.csv`](words.csv), formatted for easy import into Anki, a popular flashcard application.

I did a one shot prompt to GitHub Copilot 
```
The SPA should
read words.csv which is a list of "cards"
display the first field text (front)
when a user clicks then show the second column text (back)
instead of showing [sound:stujap_1.mp3] you should add a html5 button to play this mo3 from ./audio_files/stujap_1.mp3
the audio should play when the card

```

Copilot generated the below app which worked first time
![screenshot of Copilot generated SPA](<copilot-one-shot.png>)

## About [`words.csv`](words.csv)

The [`words.csv`](words.csv) file includes Japanese phrases that are particularly helpful when:
- Ordering food and drinks
- Asking for directions
- Shopping
- Using transportation
- Handling emergencies
- Basic greetings and courtesy phrases

Each line in the file follows this format:
```
"[sound:X.mp3] Japanese phrase","English translation","tags"
```

Where:
- `[sound:X.mp3]` refers to an audio file that Anki will play
- Japanese phrase includes both kanji and kana
- Tags help organize the flashcards (e.g., polite, questions, food_and_drink)

## Importing into Anki

To use these phrases in Anki:

1. Download and install [Anki](https://apps.ankiweb.net/) if you haven't already
2. Prepare your audio files (.mp3 format) using `./generate_tts.sh` (1.mp3, 2.mp3, etc.)
3. Place audio files in your Anki media collection folder
4. Open Anki and select the deck you want to add cards to (or create a new one)
5. Click on "File" → "Import"
6. Browse to and select the [`words.csv`](words.csv) file
7. Make sure the import settings show:
   - Field separator: Comma
   - Allow HTML: Checked
8. Click "Import"

## Creating Your Own Word Lists with AI

You can easily create similar word lists using AI tools like ChatGPT. Here's a prompt template you can use:

```
Create some words for me to learn as flashcards in a format compatible with Anki. Add 3 tab-separated columns:
1. Front (Romaji + Kanji)
2. Back (English)
3. Tags

Please include 20 common phrases for [your specific topic/situation].
```

Example topics you might request:
- Restaurant phrases
- Shopping vocabulary
- Train station expressions
- Emergency phrases
- Business meeting terminology

The resulting output will be formatted correctly for Anki import, with tabs separating each column.

## Customizing Your Learning

Feel free to modify the [`words.csv`](words.csv) file to add your own phrases or remove ones you already know. The tab-separated format makes it easy to edit in any text editor.