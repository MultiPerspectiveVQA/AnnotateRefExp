import pymongo
import os
import json

db_name = "vqa-therapy"
col_name = "annotated-train"
root_folder = os.path.join("annotated_data", "train")
# col_name = "annotated-val"
# root_folder = os.path.join("annotated_data", "val")
jsonl_filename = "metadata.jsonl"
json_filename = "metadata.json"
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client[db_name]
col = db[col_name]
dataset = list()
for item in col.find():
    item.pop('_id')
    item.pop('noun_chunks')
    dataset.append(item)

with open(os.path.join(root_folder, jsonl_filename), 'w') as f:
    for data in dataset:
        json.dump(data, f)
        f.write("\n")

with open(os.path.join(root_folder, json_filename), 'w') as f:
    json.dump(dataset, f)


