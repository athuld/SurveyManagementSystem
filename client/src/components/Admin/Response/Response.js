import { useEffect, useState } from "react";
import { Button, Tabs, Tab } from "@material-ui/core";
import { ArrowBackIos, DoneAll } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import "./Response.scss";
import BackdropLoading from "../../Loading/BackdropLoading";
import SurveyTab from "./SurveyTab";
import ResponseTab from "./ResponseTab/ResponseTab";

const Response = () => {
  document.body.style.backgroundColor = "#D8F4F9";
  const history = useHistory();
  const { surveyId } = useParams();

  const [surveyDetails, setSurveyDetails] = useState({});
  const [responseData, setResponseData] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  const getSurvey = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/survey/${surveyId}`
      );
      setSurveyDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getResponses = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/survey/response/${surveyId}`,
        { headers }
      );
      setResponseData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getSurvey();
    getResponses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (
    Object.keys(surveyDetails).length === 0 &&
    surveyDetails.constructor === Object
  ) {
    if (responseData.length === 0) {
      return <BackdropLoading />;
    }
  }

  return (
    <div>
      <div className="survey-nav">
        <nav className="nav-items">
          <div className="response-count">
            <h3>Responses</h3>
            <DoneAll />
            <h4>{responseData.length}</h4>
          </div>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={tabValue}
            onChange={handleTabChange}
          >
            <Tab label="Survey" />
            <Tab label="Responses" />
          </Tabs>
          <Button
            variant="contained"
            type="submit"
            startIcon={<ArrowBackIos />}
            id="save-btn"
            onClick={() => history.push("/admin/surveys")}
          >
            Back
          </Button>
        </nav>
      </div>
      {tabValue === 0 && <SurveyTab surveyDetails={surveyDetails} />}
      {tabValue === 1 && (
        <ResponseTab
          responseData={responseData}
          surveyDetails={surveyDetails}
        />
      )}
    </div>
  );
};

export default Response;
