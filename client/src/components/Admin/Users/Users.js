import React from "react";
import AdminHome from "../Admin-Home/AdminHome";
import "../Survey/Survey.scss";
import { makeStyles } from "@material-ui/core/styles";
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
  Avatar,
} from "@material-ui/core";
import { PeopleAltTwoTone } from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";
import Cookie from "js-cookie";
import axios from "axios";
import ConfirmDelete from "../../AlertModal/ConfirmDelete";
import BackdropLoading from "../../Loading/BackdropLoading";
import Notification from "../../AlertModal/Notification";
import NoRecords from "../../NoRecords/NoRecords";

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

const Users = ({ isOpen, setIsOpen, notification, setNotification }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([{}]);
  const [searchData, setSearchData] = useState([]);
  const [deletedId, setDeletedId] = useState({ id: "" });
  const [open, setOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    item: "user",
    id: "",
    description: "",
    title: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
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
      const fullName = `${row.firstName} ${row.lastName}`;
      return fullName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setUsers(filteredRows);
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

  /************************************************************************ */

  /**
   * Get all the users
   */

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/user/fetch`,
        {
          headers,
        }
      );
      setUsers(res.data);
      setSearchData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * useEffect hook to set the survey details at start
   */
  useEffect(() => {
    getUsers();
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
        `${process.env.REACT_APP_URL}/api/user/${_id}`,
        {
          headers,
        }
      );
      setDeletedId({
        id: res.data.id,
      });
    } catch (err) {
      console.log(err);
    }
    setNotification({
      severity: "error",
      message: "User has been deleted",
    });
    setIsOpen(true);
  };
  /************************************************************************** */

  if (searchData.length === 0) {
    return <BackdropLoading />;
  }

  if (users.message === "no records") {
    return (
      <div>
        <AdminHome />
        <div className={classes.content}>
          <main className="survey">
            <div className="header-bar">
              <div className="all-user-container">
                <Avatar id="all-user-avatar">
                  <PeopleAltTwoTone />
                </Avatar>
                <span>All Users</span>
              </div>
            </div>
          </main>
        </div>
        <NoRecords message={"No Users Found"} />
      </div>
    );
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
            <div className="all-user-container">
              <Avatar id="all-user-avatar">
                <PeopleAltTwoTone />
              </Avatar>
              <span>All Users</span>
            </div>

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
                    User
                  </TableCell>
                  <TableCell id="table-cell" align="left">
                    Gender
                  </TableCell>
                  <TableCell id="table-cell" align="left">
                    Email
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    Age
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    No: of members
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, idx) => (
                    <TableRow key={user._id}>
                      <TableCell align="center" component="th" scope="row">
                        {idx + 1}
                      </TableCell>
                      <TableCell align="left">
                        {`${user.firstName} ${user.lastName}`}
                      </TableCell>
                      <TableCell align="left">{user.gender}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="center">{user.age}</TableCell>
                      <TableCell align="center">
                        {user.members.length}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          id="delete-btn"
                          style={{ fontSize: ".2em" }}
                          onClick={() =>
                            handleOpen(
                              user._id,
                              `${user.firstName} ${user.lastName}`,
                              user.email
                            )
                          }
                        >
                          Delete
                        </Button>{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 44 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[4, 5, 6, 8]}
                    count={users.length}
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

export default Users;
