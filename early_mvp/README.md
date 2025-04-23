# **Gratitude App Prototype**  

## **Overview**  
This is an early-stage prototype of a **gratitude journaling app** designed to help users develop a habit of gratitude. Users can enter 10 things they are grateful for, provide their email, and receive a **daily email reminder** with a randomly selected gratitude entry. The app is built using **HTML, CSS, and JavaScript** for the front end and **Node.js with Express** for the back end. **Nodemailer** is used to automate email delivery, and **node-cron** schedules daily email reminders at **9 AM**.  

## **Features**  
✅ Users input **10 gratitude entries**  
✅ Email input and submission functionality  
✅ Data is temporarily stored on the server (in-memory storage)  
✅ **Nodemailer** sends a **random gratitude entry** to the user daily at 9 AM  
✅ **Node-cron** automates email scheduling  

## **Project Structure**  
```
gratitude-app/
  ├── front-end/
  │    ├── index.html      # Front-end UI
  │    ├── script.js       # Handles user input and server requests
  │    ├── styles.css      # Basic styling for the UI
  ├── server/
  │    ├── app.js          # Node.js backend with Express & Nodemailer
  │    ├── package.json    # Dependencies and scripts
  └── README.md            # Project documentation
```

## **Installation & Setup**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/your-username/gratitude-app.git
cd gratitude-app/server
```

### **2. Install Dependencies**  
```bash
npm install
```

### **3. Configure Email Credentials**  
Edit `app.js` and replace:  
```js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "YOUR_GMAIL_APP_PASSWORD",
  },
});
```
🔹 **Important:** Use an **App Password** if using Gmail or configure a different email service.  

### **4. Start the Server**  
```bash
npm start
```
Server runs at: **http://localhost:3000**  

### **5. Open the Front-End**  
Open `index.html` in a browser or use:  
```bash
live-server front-end
```
