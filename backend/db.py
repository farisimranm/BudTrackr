import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient

# Create a new client and connect to the server
load_dotenv()
uri = os.getenv('MONGO_URI')
cluster = MongoClient(uri)
db = cluster["BudTrackr"]

user_collection = db["USER"]
budget_collection = db["BUDGET"]
income_collection = db["INCOME"]
necessity_collection = db["NECESSITY"]
desire_collection = db["DESIRE"]
saving_collection = db["SAVING"]


def is_connected():
    try:
        cluster.admin.command('ping')
        return True
    except Exception as e:
        print("Failed to connect to BudTrackr cluster: " + e)
        return False
