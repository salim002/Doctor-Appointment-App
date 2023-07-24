import React, {useState, useEffect} from "react"
import Layout from "../components/Layout";
import axios from "axios";
import {useParams} from "react-router-dom";
import {DatePicker, TimePicker, message} from "antd";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/alertSlice";

const BookingPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const {user} = useSelector(state => state.user);

  const getUserData = async ()=>{
    try{
      const res = await axios.post("/api/v1/doctor/getDoctorById",
      {doctorId: params.doctorId},
        {
        headers: {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      })
      if(res.data.success){
        setDoctors(res.data.data);
      }
    } catch(error){
      console.log(error);
    }
  }

  const handleAvailability = async () => {
    try {
      if(!date && !time){
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true); 
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error);
    }
  };
    
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if(!date && !time){
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch(error){
      dispatch(hideLoading());
      console.log(error);
    }
  };
  

  useEffect(()=>{
      getUserData();
      // eslint-disable-next-line
  }, [])
    
  return (
    <Layout>
    <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && doctors.timings && (
            <div>
                <h4>Dr. {doctors.firstName} {doctors.lastName} </h4>
                <h4>Fees: {doctors.feesPerCunsaltation} </h4>
                <h4>Timings: {doctors.timings[0]} - {doctors.timings[1]} </h4>
                <div className="d-flex flex-column w-50">
                    <DatePicker format="DD-MM-YYYY" 
                        onChange={(value) => {
                          setIsAvailable(false);
                          setDate(moment(value).format("DD-MM-YYYY"))
                        }
                        }
                        className="m-2"
                    />
                    <TimePicker format="HH:mm" className="m-2" onChange={(value) => {
                      setTime(moment(value).format("HH:mm"))
                      setIsAvailable(false)
                    }
                    }/>
                    <button className="btn btn-primary mt-2" onClick={handleAvailability} >Check Availability</button>
                    {!isAvailable && (
                      <button className="btn btn-dark mt-2" onClick={handleBooking}>Book Now</button>
                    )}
                </div>
            </div>
        )}
      </div>
    </Layout>
  )
}

export default BookingPage
