import { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import "./Survey.scss";
import { Button, TextField } from "@material-ui/core";
import { Save, Cancel, Add } from "@material-ui/icons";
import QuestionCard from "./QuestionCard";
import axios from "axios";
import Cookie from "js-cookie";

const NewSurvey = () => {
  document.body.style.backgroundColor = "#D8F4F9";
  document.title = "New Survey";

  const history = useHistory();

  const [header, setHeader] = useState({});
  const [questions, setQuestions] = useState([
    { question: "", type: "radio", options: [{ option: "" }], required: true },
  ]);

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  const handleHeaderChange = (e) => {
    setHeader((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddQuestion = () => {
    const values = [...questions];
    values.push({
      question: "",
      type: "radio",
      options: [{ option: "" }],
      required: true,
    });
    setQuestions(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionsData = { questions: questions };
    const data = { ...header, ...questionsData };
    try {
      const response = await axios.post(
        "http://localhost:5001/api/admin/survey/add",
        { data: data },
        { headers }
      );
      history.push("/admin/surveys");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="new-survey">
      <form onSubmit={handleSubmit}>
        <div className="survey-nav">
          <nav className="nav-items">
            <h3>New Survey</h3>
            <div>
              <Button
                variant="contained"
                startIcon={<Cancel />}
                id="cancel-btn"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                startIcon={<Save />}
                id="save-btn"
              >
                Save
              </Button>
            </div>
          </nav>
        </div>

        <div className="survey-block" onChange={handleHeaderChange}>
          <TextField
            id="title"
            fullWidth
            name="title"
            variant="standard"
            margin="normal"
            defaultValue="Untitled Survey"
            required
          />
          <TextField
            id="description"
            name="description"
            fullWidth
            variant="standard"
            margin="normal"
            multiline
            required
            placeholder="Survey description"
          />
        </div>
        {questions.map((question, idx) => {
          return (
            <Fragment key={`${question}~${idx}`}>
              <QuestionCard
                question={question}
                questions={questions}
                idx={idx}
                setQuestions={setQuestions}
              />
            </Fragment>
          );
        })}
      </form>
      <div className="add-btn">
        <Button startIcon={<Add />} color="default" onClick={handleAddQuestion}>
          Add a question
        </Button>
      </div>
    </main>
  );
};

export default NewSurvey;
