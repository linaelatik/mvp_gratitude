from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Using SQLite instead of PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gratitude.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model
class GratitudeEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_email = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/entries', methods=['GET'])
def get_entries():
    entries = GratitudeEntry.query.order_by(GratitudeEntry.created_at.desc()).all()
    return jsonify([{
        'id': entry.id,
        'content': entry.content,
        'user_email': entry.user_email,
        'created_at': entry.created_at.isoformat()
    } for entry in entries])

@app.route('/api/entries', methods=['POST'])
def create_entry():
    print("Headers:", dict(request.headers))  # Debug print
    print("Raw data:", request.get_data())    # Debug print
    data = request.json
    print("Parsed data:", data)               # Debug print
    try:
        entry = GratitudeEntry(
            content=data['content'],
            user_email=data.get('email')
        )
        db.session.add(entry)
        db.session.commit()
        print("Entry saved successfully:", entry.id)  # Debug print
        return jsonify({
            'id': entry.id,
            'content': entry.content,
            'user_email': entry.user_email,
            'created_at': entry.created_at.isoformat()
        })
    except Exception as e:
        print("Error saving entry:", str(e))  # Debug print
        import traceback
        print("Traceback:", traceback.format_exc())  # Debug print
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/entries/<int:id>', methods=['DELETE'])
def delete_entry(id):
    entry = GratitudeEntry.query.get_or_404(id)
    db.session.delete(entry)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database initialized at:", app.config['SQLALCHEMY_DATABASE_URI'])
    app.run(debug=True, port=3001)