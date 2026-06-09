import { chromium } from 'playwright';
const b = await chromium.launch();
// desktop: capture an early frame (entrance) and a settled frame
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4321', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(450);
await p.screenshot({ path: '/tmp/desktop_enter.png' });
await p.waitForTimeout(2000);
await p.screenshot({ path: '/tmp/desktop_settled.png' });
// mobile settled
let m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:4321', { waitUntil: 'networkidle' });
await m.waitForTimeout(2000);
await m.screenshot({ path: '/tmp/mobile.png', fullPage: true });
await b.close();
console.log('done');
