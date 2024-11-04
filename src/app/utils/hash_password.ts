import bcrypt from 'bcryptjs';
import config from '../config';

export async function encryptPassword(solidPassword: string) {

    try {
        const hashedPassword = await bcrypt.hash(solidPassword, config.bcrypt_salt_round as string);
        return hashedPassword;

    } catch (error) {
        return solidPassword;
    }
}