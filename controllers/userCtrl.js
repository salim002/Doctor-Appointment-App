import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import doctorModel from "../models/doctorModel.js";

dotenv.config();

export const registerController = async (req, res) => {
    try{
        const existingUser = await userModel.findOne({email: req.body.email});
        if(existingUser){
            return res.status(200).json({message: "User Already Exists", success: false});
        }
        else{
            const password=req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newUser = new userModel(req.body);
            await newUser.save();
            return res.status(201).json({message: "Registered Successfully!", success: true});
        }
    } catch(error){
        console.log(error);
        return res.status(500).send({success: false, message: `Register controller ${error.message}`});
    }
};


export const loginController = async (req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email});
        if(user){
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if(isMatch){
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                return res.status(200).json({message: "Login successfully", success: true, token});
            }
            else{
                return res.status(200).json({message: "Invalid Email or Password", success: false});
            }
        }
        else{
            return res.status(200).json({message: "User not found", success: false});
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({message: `Error in Login CTRL ${error.message}`, success: false})
    }
};

export const authController = async (req, res) =>{
    try{
        const user = await userModel.findById({_id: req.body.userId});
        user.password = undefined;
        if(user){
            return res.status(200).json({success: true,
                data : user,
            });
        }
        else{
            return res.status(200).json({message: "User not found", success: false});
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({message: `Error in Authorization CTRL ${error.message}`, success: false, error});
    }
}

export const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: "pending" });
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
        type: "apply-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
        data: {
            doctorId: newDoctor._id,
            name: newDoctor.firstName + " " + newDoctor.lastName,
            onClickPath: "/admin/doctors",
        },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        return res.status(201).json({success: true, message: "Doctor Account Applied Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, error, message: "Error While Applying For Doctor"});
    }
};

export const getAllNotificationController = async (req, res) => {
    try{
        const user = await userModel.findOne({_id: req.body.userId});
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification = [];
        user.seenNotification = notification;
        const updatedUser = await user.save();
        return res.status(200).json({success: true, message: "All notification marked as read", data: updatedUser});
    } catch(error){
        console.log(error);
        return res.status(500).json({message: `Error in getting notification`, success: false, error})
    }
}
  