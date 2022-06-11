const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const express = require('express');
const res = require("express/lib/response");
const app = express()
const path = require('path')
const toCSV = require('./ops/toCSV')
const autoScroll = require('./ops/autoscroll')
path.join(__dirname,'/index.html')



const ObjectsToCsv = require('objects-to-csv');

const port = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, './public')))


app.get("/tag/:id", (req, res) => {
  try {
      (async () => {
    const browser = await puppeteer.launch(
        {headless: false,
        ignoreDefaultArgs: ['--disable-extensions']})
    const page = await browser.newPage()
    await page.goto(`https://www.tiktok.com/tag/${req.params.id}`)

    await autoScroll(page);

    const grabAllVideos = await page.evaluate(() => {
        const videos = document.querySelectorAll('.tiktok-x6y88p-DivItemContainerV2.e19c29qe7')
        
        let videoArray = []
        videos.forEach((video) => {
            const videoInfo = video.querySelectorAll("div")
            const tiktokUsername = videoInfo[0]
            const tiktokUsernameLink = `https://www.tiktok.com/@${tiktokUsername.textContent}`
            const videoTitle = videoInfo[1]
            const videoAtagSelector = videoTitle.querySelector("a")
            const videoLink = videoAtagSelector.getAttribute("href")
            

            videoArray.push({tiktokUsername: tiktokUsernameLink, videoLink: videoLink})  
        })

        return videoArray
    })

     console.log(grabAllVideos)
     console.log(`items: ${grabAllVideos.length}`)
   
     const singleObj = grabAllVideos.map(onevideo => {
         return  JSON.stringify(onevideo)  + "\r\n"
     })

     await fs.writeFile("links.txt", JSON.stringify(grabAllVideos) , 'utf8'); 
     

     res.redirect("https://abey-tiktok-scraper.herokuapp.com/convert")
     
     // working download file
     //res.download(path.join(__dirname, './test.csv'))
    

    await browser.close()

   
}) ()

}
  catch (error) {
      res.send(error)
  }
})




app.get("/convert", async (req, res) => {

    try {
        const  listArray = await fs.readFile("links.txt")
        const JSONobjP = await JSON.parse(listArray)
        const csvt = await new ObjectsToCsv(JSONobjP).toDisk('./test.csv', { allColumns: true });

        res.download(path.join(__dirname, './test.csv'))
        
    } catch (error) {
        res.send(error)
    }
    
})

app.get('/results', (req,res) => {
    res.sendFile(path.join(__dirname, './public/results.html'))
})


app.get("/test", (req, res) => {
   
    res.send("working")
     
  })
  

app.listen(port, () => {
    console.log("Server is up on port 3000")
})











