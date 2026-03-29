import jwt, { Secret, SignOptions } from 'jsonwebtoken';

interface JWTPayload {
    id: string;
    email: string;
}

export const createJWT = (payload: JWTPayload): string => {
    const secretKey: Secret = process.env.JWT_SECRET || 'your_super_secure_secret_key';

    const expiresIn: SignOptions['expiresIn'] =
        (process.env.JWT_EXPIRY || '7d') as SignOptions['expiresIn'];

    const signOptions: SignOptions = {
        algorithm: 'HS256',
        expiresIn,
        issuer: 'social-media-app',
    };

    return jwt.sign(payload, secretKey, signOptions);
};

export const verifyJWT = (token: string): JWTPayload | null => {
    try {
        const secretKey: Secret = process.env.JWT_SECRET || 'your_super_secure_secret_key';

        const decoded = jwt.verify(token, secretKey, {
            algorithms: ['HS256'],
            issuer: 'social-media-app',
        }) as JWTPayload;

        return decoded;
    } catch {
        return null;
    }
};
