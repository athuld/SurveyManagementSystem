import { forwardRef, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Cookie from "js-cookie";
import axios from "axios";
import "./Survey.scss";
import { useHistory } from "react-router-dom";
import Notification from "../AlertModal/Notification";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserDialog = ({ dialogOpen, setDialogOpen, selectedSurvey }) => {
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState({
    severity: "",
    message: "",
  });

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

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
    getUserDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedUser("");
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleRespond = async (survey) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/survey/response/user/is_valid/`,
        { params: { surveyId: survey._id, userId: selectedUser } }
      );
      if (!res.data.result) {
        history.push({
          pathname: `/user/surveys/respond/${survey._id}`,
          state: {
            userId: selectedUser,
          },
        });
      } else {
        setIsOpen(true);
        setNotification({
          severity: "info",
          message: "This user has already responded to the survey!",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Notification
        isOpen={isOpen}
        severity={notification.severity}
        setIsOpen={setIsOpen}
        message={notification.message}
      />
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ fontWeight: 500, fontSize: "1.5em" }}>
            Survey Information
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div id="survey-dialog">
              <p>Gender: {selectedSurvey.gender}</p>
              <p>Age: {selectedSurvey.age}</p>
              <p>District: {userDetails.district}</p>
            </div>
            <div id="user-respond-select">
              <FormControl>
                <Select
                  displayEmpty
                  value={selectedUser}
                  onChange={handleUserChange}
                >
                  <MenuItem value="" disabled>
                    Select the user
                  </MenuItem>
                  {(selectedSurvey.age === "All" ||
                    selectedSurvey.age === userDetails.ageCategory) &&
                  (selectedSurvey.gender === "All" ||
                    selectedSurvey.gender === userDetails.gender) ? (
                    <MenuItem value={userDetails._id}>
                      {userDetails.firstName} {userDetails.lastName}
                    </MenuItem>
                  ) : (
                    <MenuItem disabled>
                      {userDetails.firstName} {userDetails.lastName}
                    </MenuItem>
                  )}
                  {userDetails.members &&
                    userDetails.members.map((member, key) =>
                      (selectedSurvey.age === "All" ||
                        selectedSurvey.age === member.ageCategory) &&
                      (selectedSurvey.gender === "All" ||
                        selectedSurvey.gender === member.gender) ? (
                        <MenuItem value={member._id} key={key}>
                          {member.firstName} {member.lastName}
                        </MenuItem>
                      ) : (
                        <MenuItem key={key} disabled>
                          {member.firstName} {member.lastName}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
              <p>Info: The greyed out users are not eligible to respond</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {selectedUser === "" ? (
            <Button onClick={handleClose} disabled color="primary">
              Respond
            </Button>
          ) : (
            <Button
              onClick={() => handleRespond(selectedSurvey)}
              color="primary"
            >
              Respond
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserDialog;
