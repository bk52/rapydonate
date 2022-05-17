import CryptoJS from 'crypto-js';

export const Encryption = (message, key) => {
    const parsedKey = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
    const enc = CryptoJS.AES.encrypt(message, parsedKey, { mode: CryptoJS.mode.ECB, keySize: 128, iv: iv }).toString();
    return enc;
}