import React from "react";
import Chart from "react-google-charts";
import "../Response.scss";

const Summary = ({ responseData, surveyDetails }) => {
  return (
    <div className="main-footer">
      {surveyDetails.questions.map((question, idx) => {
        const chartData = [["Option", "count"]];
        let responseOfQuestion,
          specificResponse,
          allResponse = [];

        // Taking the responseData and map and filter all the responses of the specific questionId

        // eslint-disable-next-line
        responseData.map((response) => {
          responseOfQuestion = response.responses.filter((resp) => {
            return resp.questionId === question._id;
          });
          allResponse.push(responseOfQuestion);
        });

        // Take the filtered response data of the specific question and filter the specific responses of the question
        // This will give us an array of the specfic response only and taking the length of the array will give us
        // the number of responses for that particular reponse for the question

        for (let i = 0; i < question.options.length; i++) {
          specificResponse = allResponse.filter((allResp) => {
            return allResp[0].response === question.options[i].option;
          });
          chartData.push([question.options[i].option, specificResponse.length]);
        }

        return (
          <div className="response-tab" key={idx}>
            <div className="summary-question-block">
              <span className="summary-question">{question.question}</span>
              <span className="summary-question-response">
                {allResponse.length} responses
              </span>
            </div>
            <Chart
              width={"50vw"}
              height={"20vw"}
              chartType="PieChart"
              loader={<div>Loading..</div>}
              data={chartData}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Summary;
