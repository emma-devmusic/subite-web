import * as crypto from 'crypto-js';
import { getFromSessionStorage, setInSessionStorage } from './helpers';
import { LoginData, LoginResponse } from '@/types';

export default class EncryptData {
    constructor(private key: string) {
        this.key = key;
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }
    encrypt(data: any) {
        try {
            return crypto.AES.encrypt(data, this.key).toString();
        } catch (e: any) {
            throw new Error(e.stack);
        }
    }
    decrypt(data: any) {
        try {
            const w = crypto.AES.decrypt(data, this.key);
            const datadecrypted = JSON.parse(w.toString(crypto.enc.Utf8));
            if (!datadecrypted) {
                throw new Error('Unauthorized');
            }
            return {
                error: false,
                data: datadecrypted,
            };
        } catch (e: any) {
            return { error: true, message: e.message };
        }
    }
}


export const encryptLoginDataInSessionStorage = (data: any) => {
    const encrypter = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`)
    const encryptData = encrypter.encrypt(
        JSON.stringify(data)
    )
    setInSessionStorage('user-login-data', encryptData);
}

export const decryptLoginData = () => {
    const encrypter = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`);
    const loginDataEncrypt = getFromSessionStorage('user-login-data');
    return encrypter.decrypt(
        JSON.parse(loginDataEncrypt || '{}')
    )
    // const loginData = encrypter.decrypt(loginDataEncrypt);
    // return encrypter.decrypt(loginData.data.permissions)
    // return encrypter.decrypt(loginDataEncrypt);
}