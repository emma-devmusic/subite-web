// import { ManageFileInterface } from "../interfaces/manage-files.interfaces";

export abstract class FileManagerFactoryAbstract {
    abstract createFileManager(location?: string | undefined): any;
}