import { Request,Response } from "express";
import User from "./../models/user.model"

export const singup = async (req : Request, res : Response) => {
    const {username,email,password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message : "User already exists"});
        const user = new User({username,email,password});
        await user.save();
        res.status(201).json({message : "User created successfully"});

    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
}