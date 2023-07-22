import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModels.js";


export const getAllUserController = async (req, res) => {
    try{
        const users = await userModel.find({});
        return res.status(200).json({
            success: true,
            message: "Users data list",
            data: users
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while fetching users",
            error
        })
    }
}

export const getAllDcotrorsController = async (req, res) => {
    try{
        const doctors = await doctorModel.find({});
        return res.status(200).json({
            success: true,
            message: "Doctors data list",
            data: doctors
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while fetching doctors data",
            error
        })
    }
}

export const changeAccountStatusController = async (req, res) => {
    try{
        const {doctorId, status} = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status});
        const user = await userModel.findOne({_id: doctor.userId});
        const notification = user.notification;
        notification.push({
            type: "doctor-account-request-updated",
            message: `Your Doctor Account Request Has ${status}`,
            onClickPath: "/notification"
        })
        user.isDoctor === "approved" ? true : false;
        await user.save();
        return res.status(201).json({
            success: true,
            message: "Account Status",
            data: doctor
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in account status",
            error
        })
    }
}