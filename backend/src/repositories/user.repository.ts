import UserModel, { IUser } from "../models/user.model";

export interface IUserRepository {
    createUser(userData: Partial<IUser>): Promise<IUser>;
    getUserById(userId: string): Promise<IUser | null>;
    getAllUsers(): Promise<IUser[]>;
    getUserByEmail(email: string): Promise<IUser | null>;
    updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    getUserByToken(token: string): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData);
        return await user.save();
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const user = await UserModel.findById(userId);
        return user;
    }

    async getAllUsers(): Promise<IUser[]> {
        const users = await UserModel.find();
        return users;
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel
            .findOne({ email: email.toLowerCase() });
        return user;
    }

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );
        return user;
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        const user = await UserModel.findByIdAndDelete(userId);
        return user;
    }

    async getUserByUsername(username: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ username: username });
        return user;
    }

    async getUserByToken(token: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ verificationToken: token });
        return user;
    }
}