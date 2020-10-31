import {Browser, Page as page, Page} from "puppeteer";

const puppeteer = require('puppeteer');

class InterceptorSample{
    async inter(){

        const browser = await puppeteer.launch({headless:false,slowMo:250});
        const page = await browser.newPage();

        await page.setRequestInterception(true);

        page.on('request', (request: { url: () => string; respond: (arg0: { content: string; body: string; }) => void; continue: () => void; })  => {
            if (request.url() === 'https://danube-webshop.herokuapp.com/api/books') {
                request.respond({
                    content: 'application/json',
                    body: JSON.stringify(mockResponseObject)
                });
            } else request.continue();
        })

        await page.setViewport({ width: 1200, height: 800 });

        await page.goto('https://danube-webshop.herokuapp.com/');
        await page.click('.preview-title:nth-child(1)');
        const today = new Date();
        const date = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear()+ '_' +today.getTime() ;
        const name ="response_interception"+date;
        await page.screenshot({ path: '../../screenshots/'+name+'.png' });

        await browser.close();

    }
}
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

let a = new InterceptorSample();
a.inter();

