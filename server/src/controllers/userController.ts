import userService from "../DBservices/userService";
import ApiError from "../errors/apiErrors";
import { Request, Response, NextFunction } from "express";


class UserController {

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userId = req.params.id
        try {
            if (!userId) {
                next(ApiError.badRequest("data not entered in params"))
                return
            }
            const findedUser = await userService.findUserById(userId)
            if (!findedUser) {
                res.json({ message: " User not found" })
                return
            }
            return res.json(findedUser)
        }
        catch (error: any) {
            next(ApiError.internal(error))
        }
    }

    async getAllUserDataByUserId(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userId = req.params.id
        try {
            const userData = await userService.findUserByIdAndPopulate(userId)

            if (!userData) {
                res.json({ message: "Error on get userData" })
                next(ApiError.badRequest("UserId is not correct"))
            }
            return res.json(userData)

        }
        catch (error: any) {
            next(ApiError.internal(error))
        }
    }
}
export default new UserController()