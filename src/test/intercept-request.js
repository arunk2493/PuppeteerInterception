const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setViewport({ width: 1200, height: 800 })

    await page.setRequestInterception(true)

    page.on('request', (request) => {
        console.log('>>', request.method(), request.url())
        request.continue()
    })

    page.on('response', (response) => {
        console.log('<<', response.status(), response.url())
    })

    await page.goto('https://danube-webshop.herokuapp.com/')
    const today = new Date();
    const date = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear()+ '_' +today.getTime() ;
    const name ="request_interception"+date;
    await page.screenshot({ path: '../../screenshots/'+name+'.png' })

    await browser.close()
})()
