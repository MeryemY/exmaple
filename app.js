const express = require('express')
const app = express()
const port = 3000
const fal = require("@fal-ai/serverless-client");

fal.config({
  credentials: "54f4efc6-3806-46d2-b40d-039a4b51fcb4:ed1a4e2863f987d29f611c98924087aa",
});

app.use(express.static('./'))
app.use(express.json())
app.post('/api', async (req, res) => {
const result = await fal.subscribe("fal-ai/fooocus", {
  input: {
    prompt: req.body.prompt
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
  res.status(200).json(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
