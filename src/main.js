const express = require("express");
const Vue = require("vue")
const serverRender = require("vue-server-renderer")
const fs = require("fs")

const server = express();

const app = new Vue({
  data() {
    return {
      msg: 'hello SSR',
      text: 'text'
    }
  },
  template: `<div>
    <span>{{msg}}</span>
    <input v-model="text" />
  </div>`
})

const redner = serverRender.createRenderer({
  template: fs.readFileSync("./public/index.html", 'utf-8')
});

let desc = {
  title: "vue-ssr",
  meta: "<meta type='descpriton' content='vue-ssr 服务端渲染' />"
}

server.get("*", async (req, res) => {
  try {
    console.log("请求已发送")

    const html = await redner.renderToString(app, desc)
    res.send(html)
  } catch (error) {
    console.log(error)
  }
})

server.listen(12306, () => {
  console.log("服务端开启,12306")
})
