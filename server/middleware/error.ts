import { NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import {Request, Response} from 'express';

export const ErrorMiddleware = (
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
    )=>{
    err.statusCode= err.statusCode || 500;
    err.message = err.message || 'Internal server error';

    //wrong mongodb id error
    if(err.name == 'CastError'){
        const message = `Resource not found. invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    //dublicate key error 
    if(err.code = 11000){
        const message = `Duplicate ${Object.keys(err.keyvalue)} entered`;
        err = new ErrorHandler(message,400);
    }

    //wrong jwt error
    if(err.name === 'JsonWebTokenError'){
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }

    //JWT expired error
    if(err.name === 'TokenExpiredError'){
        const message = `Json Web token is expired, try again`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.messagel
    });
}