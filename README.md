This repo is still under progress.

##  Getting Started

### Frontend Setup
```bash
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📁 Project Structure

```
gratitude-app/
├── app/                  # Next.js pages and routes
├── components/          # Reusable React components
├── backend/            # Flask backend server
├── early_mvp/         # Email functionality testing
└── public/           # Static assets
```


