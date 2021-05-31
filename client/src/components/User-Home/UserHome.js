import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import "./UserHome.scss";

const UserHome = () => {
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async () => {
    const headers = {
      autherisation: `Bearer ${Cookie.get("accessToken")}`,
    };
    try {
      const res = await axios.get("http://localhost:5001/api/user", {
        headers,
      });
      console.log(res.data);
      setUserDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (
    Object.keys(userDetails).length === 0 &&
    userDetails.constructor === Object
  ) {
    return <p> Loading .....</p>;
  }
  return <div className="name">{`Hello ${userDetails.firstName}`}</div>;
};

export default UserHome;
