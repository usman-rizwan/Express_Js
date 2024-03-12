import User from "../models/UserModel.js"
const getAllUsers = async ()=>{
    try {
        return await User.find({});
    } catch (error) {
        return error
    }
}
export {
    getAllUsers
};