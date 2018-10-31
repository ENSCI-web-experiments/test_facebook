const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

let browser, page

let user_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'user_data.json')))

async function run() {
    browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications']
    })
    page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 800,
    })
    await page.goto('https://facebook.com')
    login()
}

async function login() {
    await page.type('#email', user_data.email, {delay: 30})
    await page.type('#pass', user_data.password, {delay: 30})
    let loginButton = await page.$('#loginbutton input')
    await loginButton.click()
    await page.waitForNavigation()
    await page.screenshot({ path: 'facebook.png' })
    await browser.close()
}

run()
