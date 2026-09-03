# Tech Titans Portal — Complete Setup Guide

## 📋 Step 1: Create Google Sheet Database

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Rename the spreadsheet to **"Tech Titans Portal DB"**.
3. Create these tabs (exact names):
   - `Students`
   - `Queries`
   - `AssociationFeedback`
   - `EventFeedback`
   - `Suggestions`

### Import Student Data
4. Go to the `Students` tab.
5. Open `backend/student_data.tsv` from this project.
6. Copy-paste all the content into the sheet (it has headers already).
7. The **Password** column should be **empty** — students will set their own on first login.

### Add Headers to Other Tabs
- **Queries**: `QueryID | Timestamp | RegisterNo | StudentName | Year | Subject | QueryType | Question | Status | Response`
- **AssociationFeedback**: `Timestamp | RegisterNo | Data`
- **EventFeedback**: `Timestamp | RegisterNo | Data`
- **Suggestions**: `Timestamp | RegisterNo | Data`

---

## 🔧 Step 2: Deploy Google Apps Script

1. In the Google Sheet, go to **Extensions → Apps Script**.
2. Delete the default code.
3. Paste the contents of `backend/Code.gs` from this project.
4. Click **Deploy → New deployment**.
5. Click the ⚙️ gear icon → select **Web app**.
6. Settings:
   - **Description**: Tech Titans Portal API
   - **Execute as**: Me
   - **Who has access**: Anyone
7. Click **Deploy**.
8. **Authorize** the script when prompted (click through the "unsafe" warning — it's your own script).
9. **Copy the Web App URL** (it looks like `https://script.google.com/macros/s/XXXXX/exec`).

---

## 🌐 Step 3: Configure Frontend

1. Create a `.env` file in the project root:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. Replace the URL with your actual Web App URL from Step 2.

---

## 🖥️ Step 4: Run Locally (Testing)

```bash
cd tech-titans-portal
npm install
npm run dev
```

Open `http://localhost:5173` and test the login flow.

> **Without the `.env` file**, the app uses a mock API for testing. Try register number `11524100084`.

---

## 🚀 Step 5: Deploy to GitHub Pages

### First Time Setup

1. Create a GitHub repository named `tech-titans-portal`.
2. Initialize git and push:
   ```bash
   cd tech-titans-portal
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/tech-titans-portal.git
   git push -u origin main
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
4. Go to **GitHub → Your Repo → Settings → Pages**.
5. Set Source to **Deploy from a branch**, Branch to **gh-pages**.
6. Your site will be live at: `https://YOUR_USERNAME.github.io/tech-titans-portal/`

### Updating the Site
After any code changes:
```bash
npm run deploy
```

---

## 🔐 How Login Works

### First-Time Student
1. Student enters their **Register Number**.
2. System checks Google Sheet → finds their name → shows it.
3. Since Password column is empty → prompts "Set Password" screen.
4. Student creates a password → it's saved to Google Sheet → they're logged in.

### Returning Student
1. Student enters their **Register Number**.
2. System checks → Password exists → shows "Enter Password" screen.
3. Student enters password → verified against Google Sheet → logged in.

---

## ⚠️ Important Notes

- **Never share** the Google Apps Script Web App URL publicly (keep it in `.env`).
- The **Password** column in Google Sheets stores plain text. For a student portal, this is acceptable. For production security, consider hashing.
- To **reset a student's password**, simply clear their Password cell in the Google Sheet.
- To **add new students**, add a new row with RegisterNo and Name.
