from flask import Flask
from googleapiclient import discovery
from googleapiclient.errors import HttpError
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

api_key = os.getenv("API_KEY")

@app.route('/')
def index():
    return 'Greetings! :)'


@app.route('/categories')
def categories():
    try:
        youtube = discovery.build('youtube', 'v3', developerKey=api_key)
        req = youtube.videoCategories().list(regionCode='US', part='snippet')
        result = req.execute()

        items = []
        for item in result["items"]:
            if not item["snippet"]["assignable"]:
                continue
            items.append({
                "id": item["id"],
                "channelId": item["snippet"]["channelId"],
                "title": item["snippet"]["title"],
            })

        return {
            "items": items
        }
    except HttpError:
        return {
            "error": "Error when trying to get data from Youtube Data API"
        }


@app.route('/categories/<string:category_id>/videos')
def videos(category_id):
    try:
        youtube = discovery.build('youtube', 'v3', developerKey=api_key)
        req = youtube.videos().list(
            chart='mostPopular',
            part='snippet,contentDetails,topicDetails',
            videoCategoryId=category_id,
            maxResults=50
        )
        return req.execute()
    except HttpError as err:
        return {
            "error": "Error when trying to get data from Youtube Data API"
        }


if __name__ == '__main__':
        app.run(debug=True,host='0.0.0.0')