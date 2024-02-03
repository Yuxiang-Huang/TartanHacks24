from openai import OpenAI

import os
from dotenv import load_dotenv
load_dotenv("./.env")

from mutagen.mp3 import MP3

file_path = "SpeakUp/src/Audio/Voice Recorder.mp3"

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
audio_file= open(file_path, "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file
)

audio = MP3(file_path)
audio_length = audio.info.length
words = len(transcript.text.split())
words_per_minute = (int) (words / (audio_length / 60))

if (words_per_minute < 120):
    print("You're slow!")
    print(words_per_minute)
elif (words_per_minute > 160):
    print("You're fast!")
    print(words_per_minute)
else:
    print("You're doing great!")
    print(words_per_minute)
