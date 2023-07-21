import React from 'react'
import Layout from "../components/Layout";
import {useSelector, useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/alertSlice";
import {useNavigate} from "react-router-dom";

import {Tabs, message} from "antd";
import axios from "axios";

const NotificationPage = () => {
    const navigate = useNavigate();

    const {user} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    // Handle Read Notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
            "/api/v1/user/get-all-notification",
            {
                userId: user._id,
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
            } else {
            message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("somthing went wrong");
        }
    };

    const handleDeleteAllRead = ()=>{

    }

  return (
    <Layout>
      <h4 className="pt-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
            <div className="d-flex justify-content-end">
                <h4 className="p-2" onClick={handleMarkAllRead}>Mark All Read</h4>
            </div>
            {
                user?.notification.map(notificationMsg => (
                    <div className="card" style={{cursor: "pointer"}}>
                        <div className="card-text" onClick={() => navigate(notificationMsg.onClickPath)}>{notificationMsg.message}</div>
                    </div>
                ))
            }
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
                <h4 className="p-2" onClick={handleDeleteAllRead}>Delete All Read</h4>
            </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default NotificationPage
