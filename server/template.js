import express from "express";
import App from "../src/components/App.jsx";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();

router.get("/", async (req, res) => {
  const theHtml = `
  <html>
    <head>
      <title>Shmetsy</title>
    </head>
    <body>
      <div id="suggested">{{{suggested}}}</div>
      <script src="./bundle.js" charset="utf-8"></script>
    </body>
  </html>
  `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<App />);
  const htmlToSend = hbsTemplate({ suggested: reactComp });
  res.send(htmlToSend);
});

module.exports = router;
