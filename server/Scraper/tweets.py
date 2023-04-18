import snscrape.modules.twitter as sntwitter
import pandas as pd
import json
import boto3
import datetime
import os

# List of Twitter accounts to query
accounts = ["WeBeFTG", "BlackCatBonesSA","RedHelenBand","DirtyMoonshine"]

# Query parameters
most_recent_date = datetime.datetime.now().strftime('%Y-%m-%d')
since_date = '2018-01-01'
query = " OR ".join(["(from:{} since:{} until:{})".format(account, since_date, most_recent_date) for account in accounts])

# Scrape tweets
tweets = []
for account in accounts:
    for tweet in sntwitter.TwitterSearchScraper(query).get_items():
        if tweet.user.username == account:
            # Fetch user profile picture url
            user = sntwitter.TwitterUserScraper(tweet.user.id).get_items()
            profile_pic_url = user.profileImageUrl if isinstance(user, sntwitter.User) else None

            # Check for attached media
            media_url = None
            if tweet.media:
                for media in tweet.media:
                    if isinstance(media, sntwitter.Photo):
                        media_url = media.fullUrl

            # Append tweet information to list
            tweets.append([tweet.date, tweet.user.username, tweet.content, tweet.url, media_url])

            break

# Convert to DataFrame
df = pd.DataFrame(tweets, columns=['Date', 'User', 'Tweet', 'Tweet Link', 'Image URL'])

# Save to JSON
json_data = df.to_json(orient='records')
with open(os.path.join(os.path.dirname(__file__), 'tweets.json'), 'w') as outfile:
    json.dump(json.loads(json_data), outfile)

print(df)
