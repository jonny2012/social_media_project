import * as path from "path"
import * as uuid from "uuid"


class FileService {

    savefile(file: any) {
        // копирует и перемещает картинку в static в корне проекта

        try {
            let fileName = uuid.v4() + ".jpg"
            const filePath = path.resolve(__dirname, "../../", "static/", "posts", fileName);
            file.mv(filePath)
            return fileName
        }
        catch (e) {
            console.log(e)
        }
    }

    saveProfileImage(file: any) {

        try {
            let fileName = uuid.v4() + ".jpg"
            const filePath = path.resolve(__dirname, "../../", "static/", "avatar", fileName);
            file.mv(filePath)
            return fileName
        }
        catch (e) {
            console.log(e)
        }
    }

}
export default new FileService()