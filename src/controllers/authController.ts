import type {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {pool} from "../config/db.js";
import type {Signup, Login} from "../types/authTypes.js";

// signup
export const signup = async (
    req : Request<{}, {}, Signup>,
    res: Response
): Promise<void> => {
    try {
        const {email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );
        res.json(result.rows[0]);
    } catch (err : any) {
        res.status(500).json({error : err.message});
    }
};

// login
export const login = async (
    req : Request<{}, {}, Login>,
    res : Response 
): Promise<void> => {
    try {
        const {email, password} = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",[email]
        );
        const user = result.rows[0];

        if (!user) {
            res.status(400).json({error: "User not found"});
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            res.status(400).json({error : "Invalid credentials"});
            return;
        }

        const token = jwt.sign(
            {userId : user.id},
            process.env.JWT_SECRET as string,
            {expiresIn: '1d'}
        );
        res.json({token});
    } catch (err : any) {
        res.status(500).json({ error : err.message});
    }
};