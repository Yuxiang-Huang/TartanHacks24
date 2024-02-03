import base64
import os
from io import BytesIO
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from pydub import AudioSegment
from flask_cors import CORS

load_dotenv("../.env")
from mutagen.mp3 import MP3

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app)


def extractText(audio):
    transcript = client.audio.transcriptions.create(model="whisper-1", file=audio)
    return transcript


def numWords(transcript):
    return len(transcript.text.split())


def wordsPerMinute(audio, words):
    audio_length = audio.info.length
    wpm = (int)(words / (audio_length / 60))
    return wpm


def calculateFinalScore(transcript, wpm, volume):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "In the context of public speaking, give an overall score on the scale of 0-100 based off how well spoken this person is. The main considerations should be their pacing in words per minute, their uses of filler words, average volume in decibels and overall sentence flow. A good pace ranges from 120 to 160 words per minute. A good volume ranges from 50 to 80 decibels. The words per minute is "
                + str(wpm)
                + ", the volume is "
                + str(volume)
                + " dB, and the transcript is given below. Return in JSON with one key for a JSON list called response with each list element having the keys: transcript, score, pace, volume, fillerWords, numFillerWords, and feedback.",
            },
            {"role": "user", "content": transcript.text},
        ],
    )
    return response.choices[0].message.content


# def calculatePhraseScore(transcript):
#     response = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     response_format={ "type": "json_object" },
#     messages=[
#         {"role": "system", "content": "In the context of public speaking, calculate an overall score on the 0-10 scale on how well spoken this person represented in the transcript is. Break the text up into each phrase. Take note of excess filler words and hesitations, conciseness, clarity and flow, and engagement."},
#         {"role": "user", "content": transcript.text},
#     ]
#     )
#     return response.choices[0].message.content


@app.route("/", methods=["POST"])
def analyze_audio():
    blob_data = request.json.get("data")
    # blob_data = request.files["audio"].read()

    # mp3_path = "/audio.mp3"
    # BytesIO(blob_data).save(mp3_path)

    print(blob_data)
    transcript = extractText(blob_data.encode())

    # words = numWords(transcript)
    # wpm = wordsPerMinute(audio, words)
    # volume = 60
    # response = calculateFinalScore(transcript, wpm, volume)
    return {"message": "Hello, World!"}


app.run(debug=True)
