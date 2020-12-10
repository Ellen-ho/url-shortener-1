import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import Url, { IUrl } from '../../models/url'
import generateUrl from '../../public/js/generateUrl'
const router = express.Router()
const PORT = process.env.PORT ? '' : ':3000'


// 進入 Index
router.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../views') });
})
// 導向原先儲存的網址
router.get('/:hash', (req: express.Request, res: express.Response) => {
    const hash = req.params.hash

    Url.find({ shortUrlHash: hash })
        .lean()
        .then((result: any) => {
            // 沒找到表示之前沒轉換過
            if (result.length === 0) {
                const returnObj = {
                    code: 0,
                    errorMsg: 'The short URL does not exist!'
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(returnObj));
            } else {
                res.redirect(result[0].originUrl)
            }
        })
        .catch((error: mongoose.Error) => console.log(error))
})

// 產生短網址
router.post('/', (req: express.Request, res: express.Response) => {
    // 從 req.body 拿出表單裡的資料
    const originUrl = req.body.originUrl.trim()
    // 輸入空格就導回首頁
    if (originUrl === '') { res.redirect('/') }

    const originHost = `${req.protocol}://${req.hostname}${PORT}`
    // 尋找是否有儲存原連結
    Url.find({ originUrl: originUrl })
        .lean()
        .then((result: any) => {
            // 若沒找到就產生一組並儲存
            if (result.length === 0) {
                // 確認短網址沒有重複
                Url.find()
                    .lean()
                    .then((urlList: any) => {
                        // 產生短網址亂碼 & 確保沒有重複
                        let shortUrlHash
                        do {
                            shortUrlHash = generateUrl(5)
                        } while (hasDuplicatedShortUrlHash(urlList, shortUrlHash))

                        // 建立實例模型
                        const newShortUrl = new Url({
                            originUrl: originUrl,
                            shortUrlHash: shortUrlHash
                        })
                        const shortUrl = `${originHost}/${shortUrlHash}`
                        // 將實例存入資料庫
                        try {
                            newShortUrl.save()
                            const returnObj = {
                                code: 0,
                                shortUrl: shortUrl
                            }

                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(returnObj));
                        } catch (error) {
                            return console.log(error)
                        }
                    })
            } else {
                const returnObj = {
                    code: 0,
                    shortUrl: `${originHost}/${result[0].shortUrlHash}`
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(returnObj));
            }
        })
        .catch((error: mongoose.Error) => console.log(error))
})

module.exports = router

function hasDuplicatedShortUrlHash(urlList: IUrl[], urlHash: string): boolean {
    const result = urlList.some((v) => {
        return v.shortUrlHash === urlHash
    })
    return result
}
