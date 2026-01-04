# Forum Exporter — Download Any Forum Thread in Minutes

✅ **Download/export any forum thread within minutes.**  
This project is made for **forum users** who want to **download an entire thread** (all pages) quickly.

It can export a thread in two formats:

- **Option 1:** **ONE TXT file** containing the entire thread (all pages combined)
- **Option 2:** **PDFs** (a separate PDF for every page of the thread)

---

**How does it work?**

In laymen's terms, this program open a window in the background and then uses your username and pass to log in to the site then access the thread from the thread url you provide. It either extracts the text from the page it's on to attach to a single txt file or saves a pdf of the page it's on then clicks on to the next page until there's no pages left in the thread.

In your terminal, you'll see text mentioning what page of the thread it's on, in case you're curious about the progress. You can also just open the folder it created in file explorer to see the live changes it's making.

---

**How long does it take at most from downloading everything and setting it up, to running it, and archiving your first thread?**

*For programmers:* 15 minutes.

*For non-programmers:* 30 minutes.

Once you can run it, even for threads with 200 pages, it takes a few minutes to archive everything into your chosen folder and file type (txt or pdf).

---

**What is the folder format of archived threads?**

- The folder format exported for pdfs: is exports/winnerwithin/name-you-chose for each thread you chose to download.
- The folder format exported for one txt file is: is exports/txt/winnerwithin/name-you-chose for each thread you chose to download.

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

# Step 4 — Create your project folder (if needed)

If you already downloaded the repo, you can skip this step.

If you are starting fresh and want to create a folder manually, run:

```bash
mkdir forum-exporter
cd forum-exporter
```

---

# Step 4.1 — Initialize Node (if needed)

If the repo already includes a `package.json`, you can skip this step.

If you do **not** see a `package.json` in the folder, run:

    npm init -y

✅ This creates a basic Node project file.

---

# Step 4.2 — Install Puppeteer (required)

If you haven’t installed Puppeteer yet, run:

    npm install puppeteer

✅ This installs the required browser automation dependency.

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

Your thread path must look like this:

```text
/thread/some-thread-title.12345/
/thread/THIS-PART-CHANGES/
```

# ✅ How to copy your thread correctly (NO page numbers)

When you copy a thread URL from the forum, it might look like this:

- `https://exampleforum.com/thread/some-thread-title.12345/page-7`
- `https://exampleforum.com/thread/some-thread-title.12345/?page=7`

# ❌ Do NOT include page numbers

❌ Do **NOT** include:

- `/page-7`
- `?page=7`
- **or anything after the thread ID**

## ✅ Use ONLY the root thread path

✅ You must only use the root thread path like this:

- `/thread/some-thread-title.12345/`

✅ This ensures the script always starts from **page 1** and exports the **entire thread** correctly.

---

# ✅ Example `.forum-credentials.json` (copy/paste and edit)

### 1) Open the file

`.forum-credentials.json`

### 2) Replace the contents with this and edit it

```json
{
  "username": "PUT_YOUR_USERNAME_HERE",
  "password": "PUT_YOUR_PASSWORD_HERE",
  "thread": "/thread/some-thread-title.12345/",
  "name": "name that you want"
}
```
Don't change the site url!

✅ Save the file:

Windows: Ctrl + S

Mac: Cmd + S

---

# Step 6 — Run the exporter (choose ONE option)

You have two scripts you can run.

## ✅ Option 1 — Export the entire thread into ONE TXT file (all pages combined)

This option will:

- Create a new output folder
- Download every page of the thread
- Combine everything into one single TXT file

Run this command in the VS Code terminal:

    node save-forum-txt.js

✅ **Result:** A folder is created containing a single TXT file with the complete thread.

---

## ✅ Option 2 — Export the thread into PDFs (one PDF per page)

This option will:

- Create a new output folder
- Download every page of the thread
- Save each page as its own PDF

Run this command in the VS Code terminal:

    node save-forum.js

✅ **Result:** A folder is created containing PDF files for each thread page.

---

# Step 7: How do you know it's running?

In your terminal, you'll see text mentioning what page of the thread it's on, in case you're curious about the progress. 

You can also just open the folder it created in file explorer to see the live changes it's making.

---

# Where are the exported files saved?

After running either script:

1. Look inside the same project folder you opened in VS Code
2. You will see a new folder created containing your export (**TXT or PDFs**)

---
# HEADS UP: Preventing overwrite for if you plan to download more than one thread!!!

If you plan to download more than just one thread url, while you won't need to change your username and password (used to login in to the forums), and technically you only need to change the thead url, make sure to change the name of the thread under "name" in .forum-credentials.json so that you're not overwriting folders each time and wasting your time! Each time you put a new thread url, make sure to change the name accordingly, whether that's something like "Michael1" then "Michael2", or a different name entirely. This will ensure the subfolder you create is a new one and doesn't over-write the previous one that you generated.
