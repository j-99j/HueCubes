from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load block hues
with open("block_hues.json") as f:
    block_hues = json.load(f)

# Routes
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hues")
def hues():
    with open('block_hues.json') as f:
        hues = json.load(f)
    return render_template('hues.html', hues=hues)

@app.route("/generate-gradient", methods=["POST"])
def generate_gradient():
    data = request.json
    block1 = data["block1"]
    block2 = data["block2"]
    distance = data["distance"]

    # Generate gradient logic (similar to earlier Python script)
    hue1 = block_hues.get(block1)
    hue2 = block_hues.get(block2)
    gradient = []
    for i in range(distance + 1):
        t = i / distance
        interpolated_hue = hue1 * (1 - t) + hue2 * t
        closest_block = min(block_hues, key=lambda b: abs(block_hues[b] - interpolated_hue))
        gradient.append(closest_block)

    return jsonify({"gradient": gradient})

if __name__ == "__main__":
    app.run(debug=True)
