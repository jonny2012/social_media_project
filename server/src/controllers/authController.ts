import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authService from "../DBservices/authService";
import userService from "../DBservices/userService";
import ApiError from "../errors/apiErrors";
import fileService from "../services/fileService";

export interface User {
    username: string;
    email: string;
    password: string;
    fullName: string;
    profileImage: string
}
class AuthController {
    async registerAuthUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { username, email, password, fullName }: User = req.body;
        const { profileImage }: any = req.files
        try {
            const profileImageName = fileService.saveProfileImage(profileImage)
            if (!profileImageName) {
                next(ApiError.badRequest("No image in formData"))
                return
            }
            const existUser = await authService.findOneUserByEmail(email);
            if (existUser)
                return res.json({ message: "Email is already registered" });
            const hashedPassword = await bcrypt.hash(password, 10);
            await authService.createUser(username, email, hashedPassword);
            await userService.createUser(username, fullName, profileImageName);
            return res.json({ message: "User succesfully created" });
        } catch (error) {
            next(ApiError.internal("Internal server Error"))

        }
    }

    async loginAuthUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { email, password }: Partial<User> = req.body;
        try {
            if (!email) {
                res.json({ message: "Data not entered" });
                return;
            }
            const user = await authService.findOneUserByEmail(email);
            if (!user) return res.json({ message: "Wrong email" });

            if (!password) return res.json({ message: "Password not entered" });
            const isValidPassword = bcrypt.compare(password, user.password);

            if (!isValidPassword)
                return res.status(400).json({ message: "Wrong password" });
            const token = jwt.sign({ userId: user._id, email }, "secret_key", {
                expiresIn: "1h",
            });

            return res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user._id, email: user.email, username: user.username },
            });
        } catch (err) {
            next(ApiError.internal("Internal server Error"))
        }
    }
}

export default new AuthController();
