import { useState } from "react";
import "../Response.scss";
import {
  Tabs,
  Tab,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import Summary from "./Summary";
import Report from "./Report";
import axios from "axios";
import Notification from "../../../AlertModal/Notification";
import NoRecords from "../../../NoRecords/NoRecords";

const ResponseTab = ({
  surveyId,
  headers,
  responseData,
  surveyDetails,
  isOpen,
  setIsOpen,
  notification,
  setNotification,
  acceptResponse,
  setAcceptResponse,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleAcceptChange = async (e) => {
    setAcceptResponse({ [e.target.name]: e.target.checked });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/survey/response/update/accept/${surveyId}`,
        { data: { isAcceptingResponse: e.target.checked } },
        { headers }
      );
      res.data === true
        ? setNotification({
            severity: "success",
            message: "Survey now accepting responses",
          })
        : setNotification({
            severity: "warning",
            message: "Survey not accepting response",
          });
      setIsOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <section>
      <div className="response-tab">
        <Notification
          isOpen={isOpen}
          severity={notification.severity}
          setIsOpen={setIsOpen}
          message={notification.message}
        />
        <div className="response-tab-header">
          <span className="response-header">
            {responseData.length} responses
          </span>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row id="accept-label">
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="primary"
                    name="isAcceptingResponse"
                    checked={acceptResponse.isAcceptingResponse}
                    onChange={handleAcceptChange}
                  />
                }
                label="Accepting Responses"
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className="filter-section">
          <span>
            <span className="filter-text">District : </span>
            {surveyDetails.district}
          </span>
          <span>
            <span className="filter-text">Gender : </span>
            {surveyDetails.gender}
          </span>
          <span>
            <span className="filter-text">Age : </span>
            {surveyDetails.age}
          </span>
        </div>
        <div className="tab-container">
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={tabValue}
            onChange={handleTabChange}
          >
            <Tab label="Summary" />
            <Tab label="Reports" />
          </Tabs>
        </div>
      </div>
      {tabValue === 0 &&
        (responseData.length === 0 ? (
          <NoRecords message={"No Responses Received"} />
        ) : (
          <Summary responseData={responseData} surveyDetails={surveyDetails} />
        ))}
      {tabValue === 1 && <Report surveyDetails={surveyDetails} />}
    </section>
  );
};

export default ResponseTab;
