import {BaseClass} from "../utils/base-class";
import {Page as page} from "puppeteer";

const puppeteer = require('puppeteer')

const mockResponseObject = [
    {
        id: 1,
        title: 'How to Mock a Response',
        author: 'A. Friend',
        genre: 'business',
        price: '0.00',
        rating: '★★★★★',
        stock: 65535
    }
];

(async () => {
    let b = new BaseClass();
    await b.open();
    await page.setRequestInterception(true)

    page.on('request', (request) => {
        if (request.url() === 'https://danube-webshop.herokuapp.com/api/books') {
            request.respond({
                content: 'application/json',
                body: JSON.stringify(mockResponseObject)
            })
        } else request.continue()
    })

    await page.setViewport({ width: 1200, height: 800 })

    await page.goto('https://danube-webshop.herokuapp.com/')
    const today = new Date();
    const date = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear()+ '_' +today.getTime() ;
    const name ="response_interception"+date;
    await page.screenshot({ path: '../../screenshots/'+name+'.png' })
    await page.screenshot({ path: 'screenshot.png' })

    await browser.close()
})()
