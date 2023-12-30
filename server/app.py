from bson import ObjectId
from flask import Flask, jsonify, request, redirect, url_for
from mongo_util import get_annotation_data, get_annotated_data, submit_annotated_datapoint
import random

app = Flask(__name__)

annotation_data = get_annotation_data()

@app.route("/api")
def hello_world():
    return jsonify({ "message": "Hello from server!" })

@app.route("/annotate")
@app.route("/next")
def annotate():
    if len(annotation_data) != 0:
        message = "Fetching next datapoint"
        keys = list(annotation_data.keys())
        annotation_datapoint = annotation_data.get(random.choice(keys))
    else:
        message =  "Hooray! We have annotated all available data"
        annotation_datapoint = {}
    resp = {"message": message, "annotation_data": annotation_datapoint}
    return jsonify(resp), 200

@app.route("/submit", methods=["POST"])
def submit_annotated_datapoint():
    if request.type != "POST" and request.mimetype != 'application/json':
        return jsonify({"message": "Invalid request type", "annotation_data": {}}), 200
    req_payload = request.json
    annotated_datapoint = req_payload.get("annotated_datapoint")
    annotated_datapoint["_id"] = ObjectId(annotated_datapoint["_id"])
    submit_annotated_datapoint(annotated_datapoint)
    annotation_data.pop(annotated_datapoint.get("_id"))
    return redirect(url_for("annotate"))

@app.route("/list-annotated")
def list_annotated():
    annotated_data = get_annotated_data()
    message = f"We have annotated {len(annotated_data)} datapoints"
    resp = {"message": message, "annotated_data": annotated_data}
    return jsonify(resp), 200
