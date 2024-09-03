
import { access_key_id, s3_region, secret_access_key } from "@/helpers/envs";
import { FileManagerBucket } from "./file-manager.bucket";
import { FileManagerFactoryAbstract } from "./manage-files.abstract";



export class S3FileManagerFactory extends FileManagerFactoryAbstract {
    createFileManager(location: string): any {
        return new FileManagerBucket(
            {
                accessKeyId: access_key_id,
                secretAccessKey: secret_access_key,
                region: s3_region,
            },
            location,
        );
    }
}