import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import "./UserHome.scss";
import { makeStyles, Paper, Grid, Avatar } from "@material-ui/core";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import NavBar from "../NavBar/NavBar";
import FamilyCard from "./FamilyCard";
import FamilyAddBtn from "./FamilyAddBtn";
import BackdropLoading from "../Loading/BackdropLoading";
import Notification from "../AlertModal/Notification";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const UserHome = ({ isOpen, setIsOpen,notification, setNotification }) => {
  const [userDetails, setUserDetails] = useState({});
  const [memberNum, setMemberNum] = useState(0);
  const classes = useStyles();

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  // Setup Graph Data //
  if (userDetails.firstName) {
    var surveyData = [
      {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        surveys: userDetails.surveys,
      },
    ];

    if (userDetails.members) {
      for (let i = 0; i < userDetails.members.length; i++) {
        surveyData.push({
          name: `${userDetails.members[i].firstName} ${userDetails.members[i].lastName}`,
          surveys: userDetails.members[i].surveys,
        });
      }
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/user`, {
        headers,
      });
      setUserDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = "Home";
    getUserDetails();
  }, [memberNum]); // eslint-disable-line react-hooks/exhaustive-deps

  if (
    Object.keys(userDetails).length === 0 &&
    userDetails.constructor === Object
  ) {
    return <BackdropLoading />;
  }

  return (
    <div>
      <NavBar user={true} />
      <Notification
        isOpen={isOpen}
        severity={notification.severity}
        setIsOpen={setIsOpen}
        message={notification.message}
      />
      <div className="container">
        <h1 className="title">My Dashboard</h1>
        <Grid container spacing={2} alignContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} className={classes.paper} id="profile-paper">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Avatar
                    alt="User Avatar"
                    src={`assets/${userDetails.avatar}`}
                    className={classes.large}
                    id="avatar"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <div className="profile-info">
                    <p className="name">
                      {userDetails.firstName} {userDetails.lastName}
                    </p>
                    <p className="general district">{userDetails.district}</p>
                    <p className="general">{userDetails.email}</p>
                    <p className="general">{userDetails.age} years old</p>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} className={classes.paper} id="chart-paper">
              <Chart data={surveyData} height={160} rotated>
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                  barWidth={1}
                  valueField="surveys"
                  argumentField="name"
                />
                <Title text="Total Surveys" />
                <Animation />
              </Chart>
            </Paper>
          </Grid>
        </Grid>
        <span className="family">Family</span>
        <Grid container spacing={2}>
          {userDetails.members &&
            userDetails.members.map((member, i) => {
              return (
                <FamilyCard
                  key={i}
                  id={member._id}
                  avatar={member.avatar}
                  firstName={member.firstName}
                  lastName={member.lastName}
                  age={member.age}
                  relationship={member.relationship}
                  headers={headers}
                  setMemberNum={setMemberNum}
                  setIsOpen={setIsOpen}
                  setNotification={setNotification}
                />
              );
            })}
          {userDetails.members.length <= 3 && (
            <FamilyAddBtn
              headers={headers}
              setMemberNum={setMemberNum}
              setIsOpen={setIsOpen}
              setNotification={setNotification}
            />
          )}
        </Grid>
      </div>
    </div>
  );
};

export default UserHome;
