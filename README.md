# Forum Exporter — Download Any Forum Thread in Minutes

✅ **Download/export any forum thread within minutes.**  
This project is made for **forum users** who want to **download an entire thread** (all pages) quickly.

It can export a thread in two formats:

- **Option 1:** **ONE TXT file** containing the entire thread (all pages combined)
- **Option 2:** **PDFs** (a separate PDF for every page of the thread)

---

# What You’ll Do (Simple Overview)

You will:
1. Download this repo onto your computer
2. Install **VS Code** (to run the scripts)
3. Install **Node.js** (so your computer can run the scripts)
4. Install **Puppeteer** (the tool that opens the browser automatically)
5. Edit **ONE file** (`.forum-credentials.json`) to add:
   - username: your forum username
   - password: your forum password
   - thread: the thread URL
   - user: user (name to save it as in your folder)
6. Run **one command** to download the thread

---

# ✅ Requirements (Install These First)

You only need two programs:

## 1) Download & Install VS Code
VS Code download (official):  
https://code.visualstudio.com/download

Install it like a normal program (Next → Next → Install).

---

## 2) Download & Install Node.js
Node.js download (official):  
https://nodejs.org/en/download

✅ Install the **LTS** version.

Node.js includes `npm` which we need for installing Puppeteer.

---

# Step 1 — Download This Repo (NO Git Required)

## Option A (recommended): Download ZIP
1. Open the repo link:  
   https://github.com/repoporep/forum-exporter/tree/main
2. Click the green **Code** button
3. Click **Download ZIP**
4. Extract/unzip the folder somewhere you can easily find it  
   (Desktop is fine)

GitHub’s official guide for downloading ZIPs:  
https://docs.github.com/en/get-started/start-your-journey/downloading-files-from-github

---

# Step 2 — Open the Project Folder in VS Code

1. Open **VS Code**
2. Click **File → Open Folder**
3. Select the extracted folder (example: `forum-exporter-main`)
4. Click **Open**

✅ You should now see the project files on the left side of VS Code.

---

# Step 3 — Open the Terminal in VS Code

Inside VS Code:
1. Click **Terminal → New Terminal**

A terminal window opens at the bottom.

✅ This is where you will type the commands.

---

# Step 4 — Install Puppeteer (ONE command)

In the VS Code terminal, type this and press Enter:

```bash
npm install puppeteer

---

# Step 5 — Edit your login + thread URL (the ONLY thing you must change)

✅ The **only** file you need to edit is:

- **`.forum-credentials.json`**

Open that file in VS Code.

Inside it, you will change **only** these 4 values:

   - username: your forum username
   - password: your forum password
   - thread: the thread URL
   - user: user (name to save it as in your folder)

---

# ✅ What `threadPath` means (IMPORTANT)

Your `threadPath` must always look like this:

- It **must start** with: `/thread/`
- It **must end** with: `/`
- Only the part **between** those two slashes changes

✅ Example format:

```text
/thread/THIS-PART-CHANGES/


