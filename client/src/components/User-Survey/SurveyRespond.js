import "./Respond.scss";
import { useEffect, useState, Fragment } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import NavBar from "../NavBar/NavBar";
import RegularLoading from "../Loading/RegularLoading";
import Helmet from "react-helmet";

const SurveyRespond = ({ setIsOpen }) => {
  const { surveyId } = useParams();
  const location = useLocation();
  const userId = location.state.userId;
  const [surveyDetails, setSurveyDetails] = useState({});
  const [response, setResponse] = useState([]);
  const history = useHistory();

  const getSurveyDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/survey/${surveyId}`
      );
      setSurveyDetails(res.data);
      const values = [...response];
      for (var i = 0; i < res.data.questions.length; i++) {
        values.push({ questionId: "", response: "" });
      }
      setResponse(values);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSurveyDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (idx, e) => {
    const values = [...response];
    values[idx].questionId = e.target.name;
    values[idx].response = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = { surveyId, userId, responses: response };
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/survey/response`,
        {
          data: responseData,
        }
      );
      await axios.post(
        `${process.env.REACT_APP_URL}/api/survey/response/user/update_count/${userId}`
      );
      setIsOpen(true);
      history.push("/user/surveys");
    } catch (err) {
      console.error(err);
    }
  };

  if (
    Object.keys(surveyDetails).length === 0 &&
    surveyDetails.constructor === Object
  ) {
    return (
      <main>
        <NavBar user={true} />
        <RegularLoading />
      </main>
    );
  }

  return (
    <main>
      <Helmet bodyAttributes={{ style: "background-color : #d8f4f9" }} />
      <NavBar user={true} />
      <form onSubmit={handleSubmit}>
        <div className="response-block header">
          <span className="survey-title">{surveyDetails.title}</span>
          <span className="survey-description">
            {surveyDetails.description}
          </span>
        </div>

        {surveyDetails.questions.map((question, idx) => (
          <Fragment key={`${question}~${idx}`}>
            <div className="response-block">
              <span className={`survey-question-${question.required}`}>
                {question.question}
              </span>
              <FormControl component="fieldset">
                <RadioGroup
                  name={question._id}
                  onChange={(e) => handleChange(idx, e)}
                >
                  {question.options.map((option, index) => (
                    <Fragment key={`${question}~${index}`}>
                      <FormControlLabel
                        value={option.option}
                        control={
                          <Radio color="primary" required={question.required} />
                        }
                        label={option.option}
                        id="survey-option"
                      />
                    </Fragment>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </Fragment>
        ))}
        <div className="survey-submit">
          <Button
            type="submit"
            color="primary"
            id="survey-submit-btn"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};

export default SurveyRespond;
