import { useState, useEffect, Fragment } from "react";
import { Grid } from "@material-ui/core";
import NavBar from "../NavBar/NavBar";
import { Create } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import "./Survey.scss";
import surveyImg from "./survey.png";
import axios from "axios";
import Cookie from "js-cookie";
import Notification from "../AlertModal/Notification";
import RegularLoading from "../Loading/RegularLoading";
import NoRecords from "../NoRecords/NoRecords";
import UserDialog from "./UserDialog";

const SurveyTab = ({ isOpen, setIsOpen }) => {
  document.title = "Surveys";

  const [surveys, setSurveys] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState({});

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  const handleDialogOpen = (survey) => {
    setSelectedSurvey(survey);
    setDialogOpen(true);
  };

  const getSurveys = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/survey/fetch`,
        { headers }
      );
      setSurveys(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSurveys();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (surveys.length === 0) {
    return (
      <div>
        <NavBar user={true} />
        <h2 className="survey-page">Available Surveys</h2>
        <RegularLoading />
      </div>
    );
  }

  if (surveys.message === "no records") {
    return (
      <div>
        <NavBar user={true} />
        <NoRecords message={"No Surveys Listed"} />
      </div>
    );
  }

  return (
    <div>
      <NavBar user={true} />
      <Notification
        isOpen={isOpen}
        severity="success"
        setIsOpen={setIsOpen}
        message="Response submitted successfully!"
      />
      <h2 className="survey-page">Available Surveys</h2>
      {surveys.map((survey, idx) => (
        <Fragment key={`${survey}~${idx}`}>
          <div className="survey-card">
            <Grid container alignContent="space-around" alignItems="center">
              <Grid item xs={12} sm={2}>
                <div className="center-content">
                  <img
                    src={surveyImg}
                    className="survey-img"
                    alt="Survey Board"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={7}>
                <div className="info">
                  <span className="title">{survey.title}</span>
                  <span className="description">{survey.description}</span>
                </div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className="center-content">
                  <Button
                    variant="contained"
                    id="respond-btn"
                    onClick={() => handleDialogOpen(survey)}
                    startIcon={<Create />}
                  >
                    Respond
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      ))}
      <UserDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedSurvey={selectedSurvey}
      />
    </div>
  );
};

export default SurveyTab;
