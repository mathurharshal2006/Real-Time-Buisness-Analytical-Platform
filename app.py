from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database Configuration
DB_CONFIG = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '',
    'database': 'business_analytics',
    'port': 3307  # Specify your MySQL port here
}

# Establishing connection
try:
    connection = mysql.connector.connect(**DB_CONFIG)
    print("Connected to the database successfully!")
except mysql.connector.Error as err:
    print(f"Error: {err}")

# Default route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Business Analytics API!"})

# Route to fetch analytics data
@app.route('/data', methods=['GET'])
def get_data():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, revenue, sales, visitors, expenses FROM analytics")
        data = cursor.fetchall()  # Fetches all rows from the query
        return jsonify(data)      # Returns the data as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Returns error in case of failure

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
