const AWS = require("aws-sdk")
const uuid = require("uuid/v1")
const Promise = require("bluebird")

// const AWS_ACCESS_KEY = "AKIAQPDDWD725E275W7N"
// const AWS_SECRET_ACCESS_KEY = "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"

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secreyAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class UploadService {

    constructor() {
        console.log("ACCESS KEY", process.env.AWS_ACCESS_KEY_ID)
    }

    async uploadToS3(file) {
        const params = {
            Bucket: "pdfpptr",
            Key: `${uuid()}.pdf`,
            Body: file
        }
        await s3.upload(params, function(err, data) {
            if (err) {
                console.log("S3 upload Error", err)
                Promise.reject(err)
            } else {
                console.log("Successfully uploaded to S3", data)
                Promise.resolve()
            }
        })
    }
}

export default new UploadService()