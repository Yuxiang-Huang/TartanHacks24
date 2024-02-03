from openai import OpenAI

import os
from dotenv import load_dotenv
load_dotenv("./.env")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
audio_file= open("SpeakUp/src/Audio/Voice Recorder.mp3", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file
)
print(transcript)