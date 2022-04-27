import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Admin.scss";
import AdminHome from "./AdminHome";
import { SupervisorAccountTwoTone } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserIcon from "./UserIcon";
import SurveyIcon from "./SurveyIcon";
import ComplaintIcon from "./ComplaintIcon";
import AdminIcon from "./AdminIcon";
import axios from "axios";
import Cookie from "js-cookie";
import BackdropLoading from "../../Loading/BackdropLoading";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [dashInfo, setDashInfo] = useState({});

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  const getDashInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/survey/dashboard/getdetails`,
        { headers }
      );
      setDashInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDashInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (Object.keys(dashInfo).length === 0 && dashInfo.constructor === Object) {
    return <BackdropLoading />;
  }

  return (
    <div>
      <AdminHome />
      <div className={classes.content}>
        <div className="dashboard-container">
          <div className="header-bar">
            <div className="all-complaint-container">
              <Avatar id="all-complaint-avatar">
                <SupervisorAccountTwoTone />
              </Avatar>
              <span>Admin Dashboard</span>
            </div>
          </div>
          <div className="dash-content">
            <main className="dashboard-main">
              <div
                className="dash-card"
                onClick={() => {
                  history.push("/admin/users");
                }}
              >
                <UserIcon />
                <div className="dash-info">
                  <span>Users</span>
                  <span>Total users: {dashInfo.userCount - 1}</span>
                </div>
              </div>
              <div
                className="dash-card"
                onClick={() => {
                  history.push("/admin/surveys");
                }}
              >
                <SurveyIcon />
                <div className="dash-info">
                  <span>Surveys</span>
                  <span>Total surveys: {dashInfo.surveyCount}</span>
                </div>
              </div>
              <div
                className="dash-card"
                onClick={() => {
                  history.push("/admin/complaints");
                }}
              >
                <ComplaintIcon />
                <div className="dash-info">
                  <span>Complaints</span>
                  <span>Total complaints: {dashInfo.complaintsCount}</span>
                </div>
              </div>
            </main>
            <AdminIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
