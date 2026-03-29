import { IUser } from "../models/user.model";
import { IUserRepository } from "../repositories/user.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import bcrypt from 'bcrypt';
import { createJWT } from '../utils/helpers/jwt.helper';

export interface IUserService {
    signUp(userData: Partial<IUser>): Promise<IUser>;
    verifyTokenService(token: string): Promise<IUser | null>;
    signin(email: string, password: string): Promise<{ username: string; name: string; avatarUrl: string; email: string; _id: string; token: string }>;
    resetPassword(email: string, newPassword: string): Promise<void>;
    getUserById(userId: string): Promise<IUser>;
    updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser>;
}

export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async signUp(userData: Partial<IUser>): Promise<IUser> {
        const user = await this.userRepository.createUser(userData);
        if (!user) {
            throw new BadRequestError('Failed to create user');
        }

        return user;
    }

    async verifyTokenService(token: string): Promise<IUser | null> {
        const user = await this.userRepository.getUserByToken(token);
        
        if (!user) {
            throw new BadRequestError('Invalid verification token');
        }

        // check if the token has expired or not
        if (user.verificationTokenExpiry && user.verificationTokenExpiry < Date.now()) {
            throw new BadRequestError('Verification token has expired');
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        return user;
    }

    async signin(email: string, password: string): Promise<{ username: string; name: string; avatarUrl: string; email: string; _id: string; token: string }> {
        const user = await this.userRepository.getUserByEmail(email);
        
        if (!user) {
            throw new NotFoundError('No registered user found with this email');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new BadRequestError('Incorrect password');
        }

        return {
            username: user.username,
            name: user.name || '',
            avatarUrl: user.avatarUrl || '',
            email: user.email,
            _id: user._id.toString(),
            token: createJWT({ id: user._id.toString(), email: user.email })
        };
    }

    async resetPassword(email: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new NotFoundError('No account found with this email address');
        }
        const hashed = bcrypt.hashSync(newPassword, 10);
        await this.userRepository.updateUser(user._id.toString(), { password: hashed } as Partial<IUser>);
    }

    async getUserById(userId: string): Promise<IUser> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser> {
        // Prevent password update through this method
        delete (updateData as any).password;
        delete (updateData as any).email;
        const user = await this.userRepository.updateUser(userId, updateData);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }
}