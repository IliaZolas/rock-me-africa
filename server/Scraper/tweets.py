import snscrape.modules.twitter as sntwitter
import pandas as pd
import json
import boto3
import datetime
import os


# list of 50 bands suggested by GPT
# accounts = ['VulvodyniaMetal', 'DispleasedDisf', 'BoargazmBand', 'Desolationbandza', 'KrankdUpBand', 'SpectralRealm', 'thefossilhunter', 'V0IDSA', 'PolarDawnSA', 'deadnebula', 'stasisbandza', 'LastOneAliveZA', 'zombiesatemygf', 'RedHelenBand', 'bleedingspawn', 'madgodza', 'PosthumousZA', 'craving_aurora', 'Terminatryx', 'Nethercyst', 'thehellcatsza', 'atlantisbandza', 'WRUSTSA', 'RhakshahSA', 'TheDriftSA', 'OctainiumZA', 'state_dependency', 'FacingTheGallows', 'voiceofdestruction', 'The_Union_SA', 'junkyard_lipstick', 'soultoneSA', 'MyFlawlessEnding', 'ThreadOfOmen', 'TheatreRunRed', 'DemogorothSatanum', 'SikThCapeTown', 'Ohgodband', 'Riddlebreak', 'SacriFistSA', 'MaximumCarnage_', 'Surdusband', 'DeitysMuse', 'WrathRising', 'BleedingSpawn', 'TaunusheimSA', 'CrowBlackSky', 'nebuladisrupt', 'KHWASA', 'Ashurum']
# accounts = ["seether", "mindassault", "Junkyardlipstick", "TheBlackCatBones", "Deadlineband1", "FacingTheGallows", "aandklas_pta", "KobusDeKockJr", "PolarDustMusic", "deitysma", "dirty_moonshine", "shotgun_torii", "climatecontrol", "ReverseTheSands", "StateDeceiver", "TheDriftSA", "TheFakeLeatherCoats", "DevilSpeak", "terminatryx", "adorned_za", "Octainiumband", "Ruff_Majik", "TheBarStoolPreachersZA", "ForsakingFate", "Bulletscript", "choking","SurdusBand", "redhelenband", "The_Heresy_SA", "theoutlaworchestra", "AmberLightChoices", "tokyolucyband", "climatecontro1", "Climate_Control", "desolation_band", "sonofhawkband", "KingOfTheHillZA", "CautionBoyBand", "Geraas_Platform", "The_Touch_SA", "TerminXband",  "CrimsonHouseSA", "OneDaySkyBand", "TurbineZA", "SubMissionSA", "Black_Pistol", "meltdowners", "thefabledring", "RiddlebreakBand", "reveryza", "nuff_saidza"]


# List of Twitter accounts to query which are correct
accounts = ["WeBeFTG", "BlackCatBonesSA","RedHelenBand","DirtyMoonshine", "VulvodyniaSlam", "OneDaySky", "SDOrgyMusic", "ccband", "Riddlebreak"]

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
