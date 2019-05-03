const Promise = require("bluebird")
import PdfService from "../service/pdfService"

class PdfController {

    constructor() {
        this.pdfService = PdfService
    }

    async initiate() {
        try {
            await this.pdfService.generatePdf()
            return Promise.resolve()
        } catch(error) {
            console.log("PDF CONTROLLER", error)
            return Promise.reject(error)
        }
    }
}

let pdfController = new PdfController()
export default pdfController