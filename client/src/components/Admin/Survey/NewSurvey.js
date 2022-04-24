import { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import "./Survey.scss";
import {
  Button,
  TextField,
  Select,
  FormControl,
  Grid,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Save, Cancel, Add } from "@material-ui/icons";
import QuestionCard from "./QuestionCard";
import axios from "axios";
import Cookie from "js-cookie";

const NewSurvey = ({ setIsOpen, setNotification }) => {
  document.body.style.backgroundColor = "#D8F4F9";
  document.title = "New Survey";

  const history = useHistory();

  const [header, setHeader] = useState({});
  const [questions, setQuestions] = useState([
    { question: "", type: "radio", options: [{ option: "" }], required: true },
  ]);
  const [filterData, setFilterData] = useState({
    district: "All",
    gender: "All",
    age: "All",
  });

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
    const data = { ...header, ...filterData, ...questionsData };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/survey/add`,
        { data: data },
        { headers }
      );
      console.log(response.data.message);
      setNotification({
        severity: "success",
        message: "Survey has been created successfully!",
      });
      setIsOpen(true);
      history.push("/admin/surveys");
    } catch (error) {
      console.error(error);
    }
  };

  const districtValues = [
    "All",
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  const handleFilterChange = (e) => {
    setFilterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="new-survey">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="survey-nav">
          <nav className="nav-items">
            <h3>New Survey</h3>
            <div>
              <Button
                variant="contained"
                onClick={() => history.push("/admin/surveys")}
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

        <div className="filter-nav">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <FormControl variant="filled" fullWidth margin="dense" required>
                <InputLabel id="district">District</InputLabel>
                <Select
                  labelId="select-district"
                  id="district"
                  name="district"
                  label="District"
                  defaultValue="All"
                  onChange={handleFilterChange}
                >
                  {districtValues.map((district, i) => {
                    return (
                      <MenuItem value={district} key={i}>
                        {district}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="filled" fullWidth margin="dense" required>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="select-gender"
                  id="gender"
                  name="gender"
                  label="Gender"
                  defaultValue="All"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="filled" fullWidth margin="dense" required>
                <InputLabel id="age">Age</InputLabel>
                <Select
                  labelId="select-age"
                  id="age"
                  name="age"
                  label="Age"
                  defaultValue="All"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="below 18">below 18</MenuItem>
                  <MenuItem value="above 18">18-30</MenuItem>
                  <MenuItem value="above 30">31-50</MenuItem>
                  <MenuItem value="above 50">51 above</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
