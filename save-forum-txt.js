const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// ---------------------------
// Load credentials & site info
// ---------------------------
const credsPath = path.resolve(__dirname, ".forum-credentials.json");
if (!fs.existsSync(credsPath)) {
  console.error("Credentials file not found: .forum-credentials.json");
  process.exit(1);
}

// Destructure site info and login credentials from JSON
const { site, username: FORUM_USERNAME, password: FORUM_PASSWORD, thread, user: FORUM_USER } =
  JSON.parse(fs.readFileSync(credsPath));

// Full thread URL
const START_URL = site + thread;

// Name of the site (used for folder organization)
const SITE_NAME = "WinnerWithin"; // <-- change if you have another forum

// Folder structure for TXT exports: exports/txt/<SITE_NAME>/<USERNAME>/
const TXT_OUTPUT_DIR = `./exports/txt/${SITE_NAME}/${FORUM_USER}`;
fs.mkdirSync(TXT_OUTPUT_DIR, { recursive: true });

// Path of the single output text file
const OUTPUT_FILE = path.join(TXT_OUTPUT_DIR, "thread.txt");

// ---------------------------
// Puppeteer main function
// ---------------------------
(async () => {
  // ---------------------------
  // Launch Chromium in headless mode (background)
  // ---------------------------
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // ---------------------------
  // Go to login page
  // ---------------------------
  await page.goto(site + "/login", { waitUntil: "networkidle2" });

  // Fill username and password
  await page.type('input[name="login"]', FORUM_USERNAME, { delay: 50 });
  await page.type('input[name="password"]', FORUM_PASSWORD, { delay: 50 });

  // Set redirect to thread page after login
  await page.evaluate((url) => {
    const redirectInput = document.querySelector('input[name="_xfRedirect"]');
    if (redirectInput) redirectInput.value = url;
  }, START_URL);

  // Submit form via JS
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.evaluate(() => {
      document.querySelector('form[action="/login/login"]').submit();
    }),
  ]);

  console.log("Logged in and redirected to thread successfully");

  // ---------------------------
  // Save thread pages as TXT
  // ---------------------------
  let pageNum = 1;

  // Clear file if it exists
  if (fs.existsSync(OUTPUT_FILE)) fs.writeFileSync(OUTPUT_FILE, "", "utf-8");

  while (true) {
    console.log(`Extracting text for page ${pageNum}...`);

    // ---------------------------
    // Wait a few seconds to let content load
    // ---------------------------
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds

    // ---------------------------
    // Extract visible text from page
    // ---------------------------
    const pageText = await page.evaluate(() => {
      return document.body.innerText;
    });

    // ---------------------------
    // Append text to the single .txt file
    // ---------------------------
    fs.appendFileSync(
      OUTPUT_FILE,
      `\n\n===== Page ${pageNum} =====\n\n${pageText}\n`,
      "utf-8"
    );

    console.log(`Saved text for page ${pageNum} -> ${OUTPUT_FILE}`);

    // ---------------------------
    // Find the "Next" button
    // ---------------------------
    const nextButton = await page.$("a.pageNav-jump--next");
    if (!nextButton) {
      console.log("No Next button found. End of thread.");
      break;
    }

    // Click "Next" and wait for navigation
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 }),
        nextButton.click(),
      ]);
    } catch (e) {
      console.log("Navigation timeout reached. Possibly AJAX navigation. Continuing...");
      await new Promise((r) => setTimeout(r, 2000));
    }

    pageNum++;
  }

  await browser.close();
  console.log("All pages saved as text successfully!");
})();
