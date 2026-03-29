import logger from "../config/logger.config";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const UserController = {
    async SignUpController(req: Request, res: Response) {
        logger.info('SignUpController called', { body: req.body });
        const response = await userService.signUp(req.body);
        res.status(201).json({
            message: 'User created successfully',
            data: response,
            success: true
        });
    },

    async VerifyTokenController(req: Request, res: Response) {
        logger.info('VerifyTokenController called', { token: req.params.token });
        const response = await userService.verifyTokenService(req.params.token);
        res.status(200).json({
            message: 'User verified successfully',
            data: response,
            success: true
        });
    },

    async SignInController(req: Request, res: Response) {
        logger.info('SignInController called', { email: req.body.email });
        const response = await userService.signin(req.body.email, req.body.password);
        res.status(200).json({
            message: 'User signed in successfully',
            data: response,
            success: true
        });
    },

    async GetCurrentUserController(req: Request, res: Response) {
        const userId = req.user!;
        const user = await userService.getUserById(userId);
        res.status(200).json({
            message: 'User fetched successfully',
            data: user,
            success: true
        });
    },

    async GetUserByIdController(req: Request, res: Response) {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        res.status(200).json({
            message: 'User fetched successfully',
            data: user,
            success: true
        });
    },

    async UpdateUserController(req: Request, res: Response) {
        const userId = req.user!;
        const user = await userService.updateUser(userId, req.body);
        res.status(200).json({
            message: 'User updated successfully',
            data: user,
            success: true
        });
    },

    async ResetPasswordController(req: Request, res: Response) {
        const { email, newPassword } = req.body;
        await userService.resetPassword(email, newPassword);
        res.status(200).json({
            message: 'Password reset successfully',
            success: true
        });
    },

    async GetAllUsersController(req: Request, res: Response) {
        const currentUserId = req.user;
        const users = await userRepository.getAllUsers();
        const filtered = currentUserId
            ? users.filter((u) => u._id.toString() !== currentUserId)
            : users;
        res.status(200).json({
            message: 'Users fetched successfully',
            data: filtered,
            success: true
        });
    },
}