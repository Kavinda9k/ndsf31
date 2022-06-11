// ---> to get names
//await forLoop(page, grabAllVideos)
// const forLoop = async (page, grabAllVideos) => {
//     let realNames = []
//     for (i=0 ; i < grabAllVideos.length; i++) {
//       await page.goto(grabAllVideos[i].tiktokUsername)
//       const name = await page.evaluate(() => {
//           return document.querySelector(".tiktok-qpyus6-H1ShareSubTitle.ekmpd5l6").textContent
//       })
//       realNames.push(name)
//     }

//     console.log(realNames)
  
//     page.close()
//   }

