const puppeteer = require("puppeteer");

const path = "pdf/";
const options = {};
const cfgs = [
  { url: "https://www.baidu.com", path: "baidu.pdf" },
  { url: "https://www.google.com", path: "google.pdf" },
  { url: "https://www.bing.com", path: "bing.pdf" },
];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 0; i < cfgs.length; i++) {
    await page.goto(cfgs[i].url, { waitUntil: "networkidle2" });
    await page.pdf({ path: path + cfgs[i].path, format: "A4", ...options });

    //sleep 100ms
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  await browser.close();
})();
