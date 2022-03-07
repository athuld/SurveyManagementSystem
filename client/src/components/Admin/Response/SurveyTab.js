import { Fragment } from "react";
import { RadioButtonUnchecked } from "@material-ui/icons";
import "./Response.scss";

const SurveyTab = ({ surveyDetails }) => {
  return (
    <main className="main-footer">
      <div className="survey-tab-block header">
        <span className="survey-title">{surveyDetails.title}</span>
        <span className="survey-description">{surveyDetails.description}</span>
      </div>

      {surveyDetails.questions?.map((question, idx) => (
        <Fragment key={`${question}~${idx}`}>
          <div className="survey-tab-block">
            <span className={`survey-question-${question.required}`}>
              {question.question}
            </span>
            {question.options.map((option, index) => (
              <div className="option-block" key={index}>
                <RadioButtonUnchecked />
                <span className="option">{option.option}</span>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </main>
  );
};

export default SurveyTab;
