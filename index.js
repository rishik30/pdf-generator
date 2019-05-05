const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

//load env variables
require("dotenv").config()

import PdfController from "./controller/pdfController"

const PORT = 3000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "SUCCESS"
    })
})

app.post("/createPdf", (req, res) => {
    PdfController.initiate().then(() => {
        res.status(200).json({
            status: "SUCCESS"
        })
    }).catch((error) => {
        console.log("API ERROR", error)
        res.status(500).json({
            status: "FAILED",
            data: error
        })
    })
})

app.listen(3000, () => {
    console.log(`Server started at port...${PORT}`)
})