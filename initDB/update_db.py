import pymongo
from bson.objectid import ObjectId

db_name = "vqa-therapy"
col_name = "annotated-val"
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client[db_name]
col = db[col_name]



doc = col.find_one_and_update({"_id" : ObjectId("658e60e4619ad78835d3da44")},{"$set":
    {"object_lookup": "it", "ref exp": "it",'ambiguous_question': 'Yes'}
},upsert=True
)