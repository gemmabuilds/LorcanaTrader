import playwright from 'playwright';

export async function loadTcgItem(itemId) {
    const browser = await playwright.chromium.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(`https://www.tcgplayer.com/product/${itemId}?Language=English`);
    await page.waitForLoadState('domcontentloaded');

    const marketTr = page.locator('tr', {
        hasText: 'market',
        hasNotText: 'buylist'
    });
    const normalPrice = await marketTr.locator('css=td:nth-child(2)').textContent();
    const foilPrice = await marketTr.locator('css=td:nth-child(3)').textContent();

    const response = { 'normal': normalPrice, 'foil': foilPrice };

    await browser.close();

    return response;
}