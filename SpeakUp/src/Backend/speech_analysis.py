from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv("./.env")
from mutagen.mp3 import MP3

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extractText(audio):
    transcript = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio
    )
    return transcript

def numWords(transcript):
    return len(transcript.text.split())

def wordsPerMinute(audio, words):
    audio_length = audio.info.length
    wpm = (int) (words / (audio_length / 60))
    return wpm
 
def calculateFinalScore(transcript, wpm, volume):    
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "In the context of public speaking, give an overall score on the scale of 0-100 based off how well spoken this person is. The main considerations should be their pacing in words per minute, their uses of filler words, average volume in decibels and overall sentence flow. A good pace ranges from 120 to 160 words per minute. A good volume ranges from 50 to 80 decibels. The words per minute is " + str(wpm) + ", the volume is " + str(volume) +" dB, and the transcript is given below. Return in JSON with one key for a JSON list called response with each list element having the keys: transcript, score, pace, volume, fillerWords, numFillerWords, and feedback."},
        {"role": "user", "content": transcript.text},
    ]
    )
    return response.choices[0].message.content

def highlightPhrases(transcript):
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "For each sentence in the transcript given in user content, grade the sentence on 1-5 scale based on quality in the context of public speaking. Return with one key for a JSON list of objects called phrases with object having two attributes, one being the text itself and one being the rating"},
        {"role": "user", "content": transcript.text},
    ]
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

file_path = "SpeakUp/src/Audio/Voice Recorder.mp3"
# file_path = "SpeakUp/src/Audio/Filler Words Recording.mp3"

raw_audio = open(file_path, "rb")
audio = MP3(file_path)
transcript = extractText(raw_audio)
words = numWords(transcript)
wpm = wordsPerMinute(audio, words)
volume = 60
response = calculateFinalScore(transcript, wpm, volume)
highlightResponses = highlightPhrases(transcript)
print(highlightResponses)
print(response)