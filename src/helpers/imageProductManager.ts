import { S3FileManagerFactory } from '@/services/set-manager.bucket';
import { v4 as uuidv4 } from 'uuid';
import { public_bucket, tenant_id } from './envs';





export const buildFilePathHelper = (
    path: string,
    tenant_id: number | string,
    user_id: number,
    type: 'products',
    product_uuid: string
) => `${path}/tx${tenant_id}ty/ty${user_id}fu/${type}/ty${product_uuid}pd`;


export const fileIntoSW3 = async (file: any, user_id: number, product_id: string) => {

    const imageId = uuidv4()
    const url = buildFilePathHelper(public_bucket, tenant_id, user_id, 'products', product_id)
    const factory = new S3FileManagerFactory();
    const fileManager = factory.createFileManager(url);

    return await fileManager.uploadFile(file, imageId);
}


export const deleteImageFromSW3 = async (url: string) => {

    const factory = new S3FileManagerFactory();
    const fileManager = factory.createFileManager(url);
    await fileManager.deleteFile(url, public_bucket);
}