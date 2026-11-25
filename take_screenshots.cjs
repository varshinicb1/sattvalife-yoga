const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\varsh\\.gemini\\antigravity-cli\\brain\\9b729382-a43f-4b27-b270-e8b0a3d6e986';
const BASE_URL = 'https://sattvalife-yoga.web.app';

const routes = [
  { name: '01_live_home_desktop.png', path: '/', width: 1440, height: 900 },
  { name: '02_live_courses_desktop.png', path: '/courses', width: 1440, height: 900 },
  { name: '03_live_timetable_desktop.png', path: '/timetable', width: 1440, height: 900 },
  { name: '04_live_experiences_desktop.png', path: '/experiences', width: 1440, height: 900 },
  { name: '05_live_corporate_desktop.png', path: '/corporate', width: 1440, height: 900 },
  { name: '06_live_posture_lab_desktop.png', path: '/posture-lab', width: 1440, height: 900 },
  { name: '07_live_shop_desktop.png', path: '/shop', width: 1440, height: 900 },
  { name: '08_live_teachers_desktop.png', path: '/teachers', width: 1440, height: 900 },
  { name: '09_live_registration_desktop.png', path: '/registration', width: 1440, height: 900 },
  { name: '10_live_reviews_desktop.png', path: '/reviews', width: 1440, height: 900 },
  { name: '11_live_blog_desktop.png', path: '/blog', width: 1440, height: 900 },
  { name: '12_live_home_mobile.png', path: '/', width: 390, height: 844, isMobile: true },
  { name: '13_live_timetable_mobile.png', path: '/timetable', width: 390, height: 844, isMobile: true },
  { name: '14_live_shop_mobile.png', path: '/shop', width: 390, height: 844, isMobile: true },
  { name: '15_live_corporate_mobile.png', path: '/corporate', width: 390, height: 844, isMobile: true },
];

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
  });

  for (const item of routes) {
    const page = await browser.newPage();
    await page.setViewport({
      width: item.width,
      height: item.height,
      isMobile: !!item.isMobile,
      hasTouch: !!item.isMobile,
      deviceScaleFactor: 2,
    });

    const targetUrl = `${BASE_URL}${item.path}`;
    console.log(`Navigating to ${targetUrl} (${item.width}x${item.height})...`);
    try {
      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      const outPath = path.join(OUTPUT_DIR, item.name);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved: ${outPath}`);
    } catch (e) {
      console.error(`Error on ${item.path}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('All screenshots completed!');
}

capture().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
