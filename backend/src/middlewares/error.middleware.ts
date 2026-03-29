import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const appErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!(err as AppError).statusCode) {
        return next(err);
    }

    console.log(err);

    res.status((err as AppError).statusCode).json({
        success: false,
        message: err.message
    });
}

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}