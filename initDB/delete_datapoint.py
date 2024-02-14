import pymongo
from bson.objectid import ObjectId

db_name = "vqa-therapy"
col_name = "annotated-train"
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client[db_name]
col = db[col_name]


doc = col.delete_one({"_id" : ObjectId("658e61f5f5455c13a828b978")})
print(doc)