const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
})

app.post('/api', async (req, res) => {
    try {
        const { input } = req.body;
        console.log('Received input:', input.vin);
        console.log('Received input:', input.checkType);
        const msg = await takeVinInfo(input);
        res.json({ message: msg });
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ error: e.message });
    }
});

async function takeVinInfo(input) {
    const { checkType: selected, vin: vin_code } = input;
    const browser = await puppeteer.launch({ headless: false });
    // Чтобы браузер не открывался, установите значение "true" на 32-й строке для параметра "headless": headless: true.
    const page = await browser.newPage();
    
    try {
        await page.goto('https://vin01.ru/', { timeout: 8000 });
        await page.locator('#vinToggleButton').click();
        await page.locator('#vinNumber').hover();
        await page.type('#vinNumber', vin_code);
        await page.locator('#searchByVinNumberButton').click();
        await page.select('#checkType', selected);
        await page.locator('#getCheckButton').click();

        await page.waitForSelector('.alert', { timeout: 6000 });
        const text = await page.$eval('.alert', element => element.textContent);
        console.log('Text content:', text);
        return text;

    } catch (error) {
        console.error('Error:', error);
        return 'Не удалось получить данные с сервера! Пожалуйста, повторите запрос позднее.';
    } finally {
        await browser.close();
    }
}