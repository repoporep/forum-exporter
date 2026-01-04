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

// Folder structure: exports/<SITE_NAME>/<USERNAME>/
const OUTPUT_DIR = `./exports/${SITE_NAME}/${FORUM_USER}`;
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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
  // Save thread pages as PDFs
  // ---------------------------
  let pageNum = 1;

  while (true) {
    console.log(`Saving page ${pageNum}...`);

    // ---------------------------
    // Wait a few seconds to let images and content load
    // ---------------------------
    //await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second

    // Save rendered page as PDF
    await page.pdf({
      path: `${OUTPUT_DIR}/page-${pageNum}.pdf`,
      format: "A4",
      printBackground: true,
    });

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
        page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 }), // max 10s
        nextButton.click(),
      ]);
    } catch (e) {
      console.log("Navigation timeout reached. Possibly AJAX navigation. Continuing...");
      // small delay to let content render
      await page.waitForTimeout(2000);
    }

    pageNum++;
  }

  await browser.close();
  console.log("All pages saved successfully!");
})();
