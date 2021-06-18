import AdminHome from "../Admin-Home/AdminHome";
import "./Survey.scss";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const SurveyHome = () => {
  document.body.style.backgroundColor = "#fafafa";
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <AdminHome />
      <div className={classes.content}>
        <main className="survey">
          <button
            className="new-btn"
            onClick={() => history.push("/admin/surveys/new")}
          >
            New Survey
          </button>
          <div className="survey-list">
            <h1>Hello there my frind this is a test </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SurveyHome;
