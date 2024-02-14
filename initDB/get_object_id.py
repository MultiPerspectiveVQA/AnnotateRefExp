import pymongo
from bson.objectid import ObjectId

db_name = "vqa-therapy"
col_name = "annotated-train"
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client[db_name]
col = db[col_name]


doc = col.find_one({"question": "What is the color of the flower vase?", "answers":["blue and white", "blue white", "blue"]})

print(doc)