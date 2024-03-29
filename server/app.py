import base64
from bson import ObjectId
from constants import IMAGE_FILES
from flask import Flask, jsonify, request, redirect, url_for, send_file
from mongo_util import get_annotation_data, get_annotated_data, write_annotated_datapoint
import random
import os

app = Flask(__name__)

annotation_data = get_annotation_data()

@app.route("/api")
def hello_world():
    return jsonify({ "message": "Hello from server!" })

@app.route("/annotate")
@app.route("/next")
def annotate():
    if len(annotation_data) != 0:
        is_present = True
        keys = list(annotation_data.keys())
        annotation_datapoint = annotation_data.get(random.choice(keys))
    else:
        is_present = False
        annotation_datapoint = {}
    resp = {"is_present": is_present, "annotation_data": annotation_datapoint}
    return jsonify(resp), 200

@app.route("/submit", methods=["POST"])
def submit_annotated_datapoint():
    # if request.type != "POST" and request.mimetype != 'application/json':
    #     return jsonify({"message": "Invalid request type", "annotation_data": {}}), 200
    annotated_datapoint = request.json
    print(request.json)
    annotated_datapoint["_id"] = ObjectId(annotated_datapoint["_id"])
    write_annotated_datapoint(annotated_datapoint)
    annotation_data.pop(str(annotated_datapoint.get("_id")))
    return redirect(url_for("annotate"))

@app.route("/list-annotated")
def list_annotated():
    annotated_data = get_annotated_data()
    message = f"We have annotated {len(annotated_data)} datapoints"
    resp = {"is_present": True if len(annotation_data) > 0 else False, "annotated_data": annotated_data}
    return jsonify(resp), 200

@app.route("/get-image/<imagefile>", methods=["GET"])
def get_image(imagefile):
    file_path = os.path.join(IMAGE_FILES, imagefile) if imagefile != "logo.jpg" else "logo.jpg"
    return send_file(file_path, mimetype='image/jpg')
# flask --app app run --port 3001