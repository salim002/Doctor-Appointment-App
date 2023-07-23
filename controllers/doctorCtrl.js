import doctorModel from "../models/doctorModel.js";

export const getDoctorInfoController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ userId: req.body.userId });
      return res.status(200).json({
        success: true,
        message: "doctor data fetch success",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error,
        message: "Error in Fetching Doctor Details",
      });
    }
  };

export const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate(
        { userId: req.body.userId },
        req.body
        );
        return res.status(201).json({
        success: true,
        message: "Doctor Profile Updated",
        data: doctor,
        });
    } catch(error){
            console.log(error);
            return res.status(500).json({
            success: false,
            message: "Doctor Profile Update issue",
            error,
        });
    }
};

export const getDoctorByIdController = async (req, res) => {
  try{
    const doctor = await doctorModel.findOne({_id: req.body.doctorId});
    return res.status(200).json({
      success: true,
      message: "Single Doc info fetched",
      data: doctor
    })
  } catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in getting single doctor info",
      error
    })
  }
}