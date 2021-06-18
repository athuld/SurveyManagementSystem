import { Fragment } from "react";
import "./Survey.scss";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import {
  RadioButtonChecked,
  CheckBox,
  ArrowDropDownCircle,
  RadioButtonUnchecked,
  AddCircleOutline,
  Close,
  Delete,
} from "@material-ui/icons";

const choiceItems = [
  {
    type: "radio",
    icon: <RadioButtonChecked />,
    text: "Multiple choice",
  },
  {
    type: "checkbox",
    icon: <CheckBox />,
    text: "Checkboxes",
  },
  {
    type: "dropdown",
    icon: <ArrowDropDownCircle />,
    text: "Dropdown",
  },
];

const QuestionCard = ({ question, questions, idx, setQuestions }) => {
  const handleOptionChange = (index, e) => {
    const values = [...questions];
    values[idx].options[index].option = e.target.value;
    setQuestions(values);
  };

  const handleAddOption = () => {
    const values = [...questions];
    values[idx].options.push({ option: "" });
    setQuestions(values);
  };

  const handleDeleteOption = (index) => {
    const values = [...questions];
    values[idx].options.splice(index, 1);
    setQuestions(values);
  };

  const handleQuestionChange = (e) => {
    const values = [...questions];
    values[idx][e.target.name] = e.target.value;
    setQuestions(values);
  };

  const handleRequiredChange = (e) => {
    const values = [...questions];
    values[idx][e.target.name] = e.target.checked;
    setQuestions(values);
  };

  const handleDeleteCard = () => {
    const values = [...questions];
    values.splice(idx, 1);
    setQuestions(values);
  };

  return (
    <div className="survey-block">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <TextField
            id="question"
            name="question"
            variant="filled"
            placeholder="Question"
            fullWidth
            value={question.question}
            required
            multiline
            onChange={handleQuestionChange}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth margin="dense" variant="outlined">
            <Select
              id="type"
              name="type"
              defaultValue="radio"
              onChange={handleQuestionChange}
            >
              {choiceItems.map((choice, index) => {
                const { type, icon, text } = choice;
                return (
                  <MenuItem value={type} key={index}>
                    <div style={{ display: "flex" }}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText secondary={text} disableTypography />
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        {questions[idx].options.map((option, index) => (
          <Fragment key={`${option}~${index}`}>
            <Grid item xs={12} sm={11}>
              <div style={{ display: "flex" }}>
                <RadioButtonUnchecked id="icon-option" />
                <TextField
                  fullWidth
                  name="option"
                  variant="standard"
                  required
                  placeholder={`Option ${index + 1}`}
                  value={option.option}
                  onChange={(event) => handleOptionChange(index, event)}
                />
                {question.options.length > 1 && (
                  <IconButton onClick={() => handleDeleteOption(index)}>
                    <Close />
                  </IconButton>
                )}
              </div>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      <IconButton onClick={handleAddOption} id="add-btn">
        <AddCircleOutline />
      </IconButton>

      <Grid container>
        <Grid item xs={12} sm={12}>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} sm={8}></Grid>
        <Grid item xs={12} sm={3}>
          <div style={{ display: "flex" }}>
            <IconButton onClick={handleDeleteCard}>
              <Delete />
            </IconButton>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={question.required}
                  name="required"
                  onChange={handleRequiredChange}
                />
              }
              label="Required"
              labelPlacement="start"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionCard;
