import argparse
import pymongo
import json

train_file_path = "../server/vqa_therapy/train/metadata.jsonl"
val_file_path = "../server/vqa_therapy/val/metadata.jsonl"

collection_map = {"train": "annotation-train",
                  "val": "annotation-val"}

def init_db(args):
    db_name = "vqa-therapy"
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client[db_name]
    return db

def get_collection_name(args):
    collection_name = collection_map[args.file]
    return collection_name

def collection_exists(db, collection_name):
    collection_list = db.list_collection_names()
    return True if collection_name in collection_list else False

def clean_collection(db, collection_name):
    collection = db[collection_name]
    collection.remove()

def load_data_file(args):
    file = train_file_path if args.file == "train" else "val"
    with open(file) as f:
        data = f.readlines()
    data = [json.loads(item) for item in data]
    return data

def main(args):
    print("Connecting to DB")
    db = init_db()
    print("Getting collection name")
    collection_name = get_collection_name(args)
    if collection_exists(db, collection_name):
        print("Cleaning up previously existing collection")
        clean_collection(db, collection_name)
    print(f"Reading {args.file} file")
    data = load_data_file(args)
    collection = db[collection_name]
    print(f"Writing to DB. Collection name {collection_name}")
    collection.insert_many(data)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Helper file to load vqa therapy data to mongo db')
    parser.add_argument('--file', required=True, type=str,
                        help='valid options include train/val')
    args = parser.parse_args()
    main(args)