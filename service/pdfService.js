const fs = require("fs")
const Promise = require("bluebird")
const puppeteer = require("puppeteer")

import UploadService from "./uploadService"

class PdfService {

    constructor() {
        this.uploadService = UploadService
    }

    async generatePdf() {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto(`file://${process.cwd()}/test.html`, { waitUntil: "networkidle0" })
            const pdf = await page.pdf({ format: 'A4' })
            fs.writeFileSync("test.pdf", pdf)
            await this.uploadService.uploadToS3(pdf)
            
            browser.close()
            return Promise.resolve()    
        } catch (error) {
            console.log("PDF SERVICE", error)
            return Promise.reject(error)
        }
        
    }
}

export default new PdfService()