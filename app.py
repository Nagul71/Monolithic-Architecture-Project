from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Mern7Sql@127.0.0.1/shapes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

# Shape Model
class Shape(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    shape_type = db.Column(db.String(50), nullable=False)
    area = db.Column(db.Float, nullable=False)
    perimeter = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Float, nullable=True)

# Create Database
with app.app_context():
    db.create_all()

# Home Page Route
@app.route('/')
def home():
    return render_template('index.html')

# API Route to Calculate and Save Shape Data
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    shape_type = data.get('shape_type')

    if shape_type == "circle":
        radius = data.get('radius')
        area = 3.1415 * radius ** 2
        perimeter = 2 * 3.1415 * radius
        volume = None  # No volume for 2D shapes

    elif shape_type == "rectangle":
        length = data.get('length')
        width = data.get('width')
        area = length * width
        perimeter = 2 * (length + width)
        volume = None

    elif shape_type == "triangle":
        base = data.get('base')
        height = data.get('height')
        side1, side2, side3 = data.get('side1'), data.get('side2'), data.get('side3')
        area = 0.5 * base * height
        perimeter = side1 + side2 + side3
        volume = None

    else:
        return jsonify({"error": "Invalid shape"}), 400

    # Save to database
    shape = Shape(shape_type=shape_type, area=area, perimeter=perimeter, volume=volume)
    db.session.add(shape)
    db.session.commit()

    return jsonify({"message": "Calculation saved!", "area": area, "perimeter": perimeter, "volume": volume})

if __name__ == '__main__':
    app.run(debug=True)
