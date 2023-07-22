import doctorModel from "../models/doctorModel.js";

export const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        return res.status(200).json({
            success: true,
            message: "Doctor data fetch success",
            data: doctor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Fetching Doctor Details",
            error
        });
    }
};
