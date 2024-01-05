import constants
from pymongo import MongoClient

mongo_cluster = MongoClient(constants.MONGO_URL)
mongo_db = mongo_cluster[constants.MONGO_DB]
mongo_annotation_collection = mongo_db[constants.MONGO_ANNOTATION_COLLECTION]
mongo_annotated_collection = mongo_db[constants.MONGO_ANNOTATED_COLLECTION]

def get_annotation_data():    
    docs = mongo_annotation_collection.find({})
    annotation_set = dict()
    for doc in docs:
        if not mongo_annotated_collection.find_one({"_id":doc.get("_id")}):
            doc["_id"] = str(doc["_id"])
            annotation_set[doc["_id"]] = doc
    return annotation_set

def get_annotated_data():
    docs = mongo_annotated_collection.find({})
    annotated_set = list()
    for doc in docs:
        annotated_set.append(doc)
    return annotated_set

def write_annotated_datapoint(doc):
    mongo_annotated_collection.insert_one(doc)
