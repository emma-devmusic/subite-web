
import * as AWS from 'aws-sdk';
// import { ConflictException, Logger } from '@nestjs/common';

export class FileManagerBucket {

    private bucket: string;
    private s3: AWS.S3;

    constructor(creds: any, bucket: string) {
        this.bucket = bucket;
        this.s3 = new AWS.S3(creds);
    }

    async uploadFile(file: any, filename: string | null = null): Promise<string> {
        try {
            const params: AWS.S3.PutObjectRequest = {
                Bucket: this.bucket,
                Key: filename || file.originalname,
                Body: file,
            }
            const result = await this.s3.upload(params).promise();
            return result.Location;
        } catch (e:any) {
            console.log(e);
            throw new Error('Upload File Error: ' + e.message);
        }
    }

    async downloadFile(url: string): Promise<any> {
        try {
            const params: AWS.S3.GetObjectRequest = {
                Bucket: this.bucket,
                Key: url,
            };
            const response = await this.s3.getObject(params).promise();
            const bodyBuffer: Buffer = response.Body as Buffer;

            const downloadedFile = {
                fieldname: 'file',
                originalname: url,
                encoding: 'buffer',
                mimetype: response.ContentType,
                size: bodyBuffer.length,
                buffer: bodyBuffer,
            };

            return downloadedFile;
        } catch (error:any) {
            throw new Error('Download File Error: ' + error.message);
        }
    }

    async deleteFile(url: string, bucket: string): Promise<void> {
        try {
            const target = 's3.amazonaws.com';
            if (!url.includes(target)) throw new Error('Invalid URL');
            const setKey = `${url.split(target)[1].slice(1)}`
            const params: AWS.S3.DeleteObjectRequest = {
                Bucket: bucket,
                Key: setKey,
            };
            await this.s3.deleteObject(params).promise();
        } catch (e:any) {
            throw new Error('Delete File Error: ' + e.message);
        }
    }

    async getSignedUrl(key: string, expiresIn: number, bucket: string): Promise<string> {
        try {
            return new Promise((res, rej) => {
                this.s3.getSignedUrl('getObject', {
                    Bucket: bucket ? bucket : this.bucket,
                    Key: key,
                    Expires: expiresIn,
                }, (err, data) => {
                    if (err) {
                        rej(err);
                    }
                    return res(data)
                })
            });
        } catch (e:any) {
            throw new Error('Generate Signed URL Error: ' + e.message);
        }
    }
}