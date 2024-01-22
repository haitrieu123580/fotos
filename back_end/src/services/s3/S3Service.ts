import dotenv from 'dotenv';
import { S3 } from "aws-sdk";
import { Container, Service } from 'typedi';
import fs from 'fs'
dotenv.config();

@Service()
class S3Service {
    private s3 = new S3({
        region: process.env.AWS_S3_BUCKGET_REGION,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    })

    //upload
    public uploadFile = async (file: any): Promise<any> => {
        const fileStream = fs.createReadStream(file.path);
        return this.s3.upload({
            Bucket: String(process.env.AWS_S3_BUCKGET_NAME),
            Body: fileStream,
            Key: file.filename
        })
    }
    //get

    //delete
}
export default S3Service;