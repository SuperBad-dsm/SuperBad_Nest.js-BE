import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Express } from 'express';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_AC,
      secretAccessKey: process.env.AWS_SC,
      region: process.env.AWS_RG,
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const key = `${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: process.env.S3_BK,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await this.s3.upload(params).promise();

    return {
      key: uploadResult.Key,
      url: uploadResult.Location,
    };
  }

  getFileUrl(key: string): string {
    return `https://${process.env.S3_BK}.s3.${process.env.AWS_RG}.amazonaws.com/${key}`;
  }
}
