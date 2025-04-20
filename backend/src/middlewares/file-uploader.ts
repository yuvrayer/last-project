import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";
import config from 'config'
import s3Client from "../aws/s3";

declare global {
    namespace Express {
        interface Request {
            fileURL?: string
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    if (!req.files.file) return next();

    try {
        const vacationImage = req.files.file as UploadedFile

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: config.get<string>('s3.bucket'),
                Key: `${v4()}${path.extname(vacationImage.name)}`,
                Body: vacationImage.data,
                ContentType: vacationImage.mimetype
            }
        })

        const response = await upload.done()

        req.fileURL = `${response.Bucket}/${response.Key}` // response.location: http://localstack:4566/fjgkdfjk/gjkdfd/djfgkdk

        next()
    }
    catch (e) {
        next(e)
    }
}