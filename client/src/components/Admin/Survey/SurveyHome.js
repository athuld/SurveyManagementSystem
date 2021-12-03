import AdminHome from "../Admin-Home/AdminHome";
import "./Survey.scss";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import Cookie from "js-cookie";
import axios from "axios";
import ConfirmDelete from "../../AlertModal/ConfirmDelete";
import BackdropLoading from "../../Loading/BackdropLoading";
import Notification from "../../AlertModal/Notification";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: "75vw",
  },
}));

const SurveyHome = ({ isOpen, setIsOpen, notification, setNotification }) => {
  document.body.style.backgroundColor = "#fafafa";
  const history = useHistory();

  const classes = useStyles();
  const [surveys, setSurveys] = useState([{}]);
  const [searchData, setSearchData] = useState([]);
  const [deletedId, setDeletedId] = useState({ id: "" });
  const [open, setOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    item: "survey",
    id: "",
    description: "",
    title: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, surveys.length - page * rowsPerPage);
  const [searched, setSearched] = useState("");

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  /**
   *  For searching the table of surveys
   */

  const requestSearch = (searchedVal) => {
    const originalRows = [...searchData];
    const filteredRows = originalRows.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setSurveys(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  /****************************************************************** */

  /**
   *  handling pagination
   */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  /*************************************************************** */

  /**
   * Getting all the surveys and responses
   */

  const getSurveys = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/survey/fetch`,
        { headers }
      );
      const values = [...res.data];
      for (let i = 0; i < values.length; i++) {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/admin/survey/responseCount/${values[i]._id}`,
          { headers }
        );
        values[i].responses = res.data;
      }

      setSurveys(values);
      setSearchData(values);
    } catch (error) {
      console.error(error);
    }
  };

  /************************************************************************ */

  /**
   * useEffect hook to set the survey details at start
   */
  useEffect(() => {
    getSurveys();
  }, [deletedId]); // eslint-disable-line react-hooks/exhaustive-deps

  /************************************************************************* */

  /**
   *   handling the dialogue box of the delete
   */

  const handleOpen = (id, title, description) => {
    setDialogDetails((prev) => ({
      ...prev,
      id: id,
      title: title,
      description: description,
    }));
    setOpen(true);
  };

  /************************************************************************* */

  /**
   *  handle delete of the specified survey
   */
  const handleDelete = async (_id) => {
    setOpen(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/api/admin/survey/${_id}`,
        { headers }
      );
      console.log(res);
      setDeletedId({
        id: res.data.id,
      });
    } catch (err) {
      console.log(err);
    }
    setNotification({
      severity: "error",
      message: "Survey has been deleted",
    });
    setIsOpen(true);
  };
  /************************************************************************** */

  if (searchData.length === 0) {
    return <BackdropLoading />;
  }

  return (
    <div>
      <AdminHome />
      <div className={classes.content}>
        <Notification
          isOpen={isOpen}
          severity={notification.severity}
          setIsOpen={setIsOpen}
          message={notification.message}
        />
        <main className="survey">
          <div className="header-bar">
            <button
              className="new-btn"
              onClick={() => history.push("/admin/surveys/new")}
            >
              New Survey
            </button>
            <SearchBar
              id="survey-search-bar"
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
          </div>
          <TableContainer component={Paper} id="table-container">
            <Table
              className={classes.table}
              size="small"
              aria-label="simple table"
            >
              <TableHead id="table-head">
                <TableRow>
                  <TableCell id="table-cell" align="center">
                    Sl.no
                  </TableCell>
                  <TableCell id="table-cell" align="left">
                    Title
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    Created Date
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    Responses
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surveys
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((survey, idx) => (
                    <TableRow key={survey._id}>
                      <TableCell align="center" component="th" scope="row">
                        {idx + 1}
                      </TableCell>
                      <TableCell align="left">
                        <span
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <h3>{survey.title} </h3>
                          <span style={{ fontSize: ".8em" }}>
                            {survey.description}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell align="center">{survey.createdAt}</TableCell>
                      <TableCell align="center">{survey.responses}</TableCell>
                      <TableCell align="center">
                        <Button
                        id="view-btn"
                          style={{ fontSize: ".2em" }}
                          onClick={() =>
                            history.push(
                              `/admin/surveys/response/${survey._id}`
                            )
                          }
                        >
                          Show
                        </Button>{" "}
                        <Button
                            id="delete-btn"
                          style={{ fontSize: ".2em" }}
                          onClick={() =>
                            handleOpen(
                              survey._id,
                              survey.title,
                              survey.description
                            )
                          }
                        >
                          Delete
                        </Button>{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 52 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[4, 5, 6]}
                    count={surveys.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <ConfirmDelete
            dialogDetails={dialogDetails}
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
};

export default SurveyHome;
