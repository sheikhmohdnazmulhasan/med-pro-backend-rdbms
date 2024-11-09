import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET
}