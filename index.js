const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const async = require('async')
const express = require('express')
const app = express()
const url = require('url')

app.get('/friends', function (req, res) {
    friends(req, res)
})

app.get('/images', function (req, res) {
    images(req, res)
})

let browser, page

let user_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'user_data.json')))

async function images(req, res) {
    let images = []
    if (req.query.url) {
        await init()
        await login()
        if (/photos$/.test(req.query.url) === true) {
            await page.goto(req.query.url)
        } else {
            await page.goto(url.resolve(req.query.url + '/', 'photos_all'))
        }
        await page.waitFor(3000)
        images = await getImages()
        await browser.close()
        res.json(images)
    } else {
        await init()
        await login()
        await page.click('div[data-click=profile_icon]>a')
        await page.waitForNavigation()
        await page.goto(url.resolve(page.url() + '/', 'photos_all'))
        await page.waitFor(3000)
        images = await getImages()
        await browser.close()
        res.json(images)
    }
}

async function friends(req, res) {
    let friends = []
    if (req.query.url) {
        await init()
        await login()
        await page.goto(req.query.url)
        await page.waitFor(3000)
        await page.click('a[data-tab-key=friends]')
        await page.waitFor(3000)
        friends = await getFriends()
        await browser.close()
        res.json(friends)
    } else {
        await init()
        await login()
        await page.click('div[data-click=profile_icon]>a')
        await page.waitFor(3000)
        await page.click('a[data-tab-key=friends]')
        await page.waitFor(3000)
        friends = await getFriends()
        await browser.close()
        res.json(friends)
    }
}

async function init() {
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
}

async function login() {
    await page.type('#email', user_data.email, { delay: 5 })
    await page.type('#pass', user_data.password, { delay: 5 })
    let loginButton = await page.$('#loginbutton input')
    await loginButton.click()
    await page.waitForNavigation()
}

async function getImages() {
    let allImages = []
    let allImagesSrc = []
    for (let i = 0; i < 10; i++) {
        let images = await page.$$eval('a.uiMediaThumb', images => images.map((a) => {
            let href = null
            try {
                href = /url\(([^)]+)\);/.exec(a.innerHTML)[1].replace(/&amp;/gim, '&')
            } catch (ignore) {}
            return {
                label: a.getAttribute('aria-label'),
                page: a.href,
                src: href
            }
        }))
        images.forEach((image) => {
            if (allImagesSrc.indexOf(image.src) === -1) {
                allImages.push(image)
                allImagesSrc.push(image.src)
            }
        })
        await page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight)
        })
        await page.waitFor(1000)
    }
    return new Promise(resolve => {
        resolve(allImages)
    })
}

async function getFriends() {
    let allFriends = []
    let allFriendsHref = []
    for (let i = 0; i < 10; i++) {
        let friends = await page.$$eval('div.fsl.fwb.fcb>a', friends => friends.map((a) => {
            return {
                name: a.innerText,
                href: a.href
            }
        }))
        friends.forEach((friend) => {
            if (allFriendsHref.indexOf(friend.href) === -1) {
                allFriends.push(friend)
                allFriendsHref.push(friend.href)
            }
        })
        await page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight)
        })
        await page.waitFor(1000)
    }
    return new Promise(resolve => {
        resolve(allFriends)
    })
}

app.listen(8090, function () {
  console.log('Facebook scraper listening on port 8090')
})
