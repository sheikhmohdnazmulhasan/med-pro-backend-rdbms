import bcrypt from 'bcryptjs';
import config from '../config';

export async function encryptPassword(solidPassword: string) {

    try {
        const hashedPassword = await bcrypt.hash(solidPassword, Number(config.bcrypt_salt_round));
        return hashedPassword;

    } catch (error) {
        console.log(error);
        return solidPassword;
    }
}