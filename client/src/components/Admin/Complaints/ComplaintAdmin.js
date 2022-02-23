import AdminHome from "../Admin-Home/AdminHome";
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
  Chip,
} from "@material-ui/core";
import {
  PeopleAltTwoTone,
  Loop,
  CheckCircleOutlineRounded,
} from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";
import Cookie from "js-cookie";
import axios from "axios";
import ConfirmDelete from "../../AlertModal/ConfirmDelete";
import BackdropLoading from "../../Loading/BackdropLoading";
import Notification from "../../AlertModal/Notification";
import { format, parseISO } from "date-fns";
import "./ComplaintAdmin.scss";
import ResolveCard from "./ResolveCard";
import NoRecords from "../../NoRecords/NoRecords"

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

const ComplaintAdmin = ({
  isOpen,
  setIsOpen,
  notification,
  setNotification,
}) => {
  const classes = useStyles();
  const [complaints, setComplaints] = useState([{}]);
  const [searchData, setSearchData] = useState([]);
  const [deletedId, setDeletedId] = useState({ id: "" });
  const [open, setOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    item: "complaint",
    id: "",
    description: "",
    title: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, complaints.length - page * rowsPerPage);
  const [searched, setSearched] = useState("");
  const [resolveOpen, setResolveOpen] = useState(false);
  const [resolveComplaint, setResolveComplaint] = useState("");
  const [isResolved, setIsResolved] = useState(false);

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  /**
   *  For searching the table of complaints
   */

  const requestSearch = (searchedVal) => {
    const originalRows = [...searchData];
    const filteredRows = originalRows.filter((row) => {
      const complaintName = `${row.complaintBody.subject}`;
      return complaintName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setComplaints(filteredRows);
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
   * Get all the complaints
   */

  const getComplaints = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/complaint/get`,
        {
          headers,
        }
      );
      setComplaints(res.data);
      setSearchData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * useEffect hook to set the complaint details at start
   */
  useEffect(() => {
    getComplaints();
  }, [deletedId, isResolved]); // eslint-disable-line react-hooks/exhaustive-deps

  /************************************************************************* */

  /**
   *   handling the dialogue box of the delete
   */

  const handleOpen = (id, title, description) => {
    setDialogDetails(() => ({
      id: id,
      title: title,
      description: description,
      item: "complaint",
    }));
    setOpen(true);
  };

  /************************************************************************* */

  /**
   *  handle delete of the specified complaint
   */
  const handleDelete = async (_id) => {
    setOpen(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/api/admin/complaint/delete/${_id}`,
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
      message: "Complaint has been deleted",
    });
    setIsOpen(true);
  };
  /************************************************************************* */

  /**
   *  Open up resolve dialogue box
   */
  const handleResolveView = (complaint) => {
    setResolveComplaint(complaint);
    setResolveOpen(true);
  };

  if (searchData.length === 0) {
    return <BackdropLoading />;
  }

  if (searchData.message === "no records") {
    return (
      <div>
        <AdminHome />
        <div className={classes.content}>
          <main className="complaint">
            <div className="header-bar">
              <div className="all-complaint-container">
                <Avatar id="all-complaint-avatar">
                  <PeopleAltTwoTone />
                </Avatar>
                <span>All complaints</span>
              </div>
            </div>
          </main>
        </div>
        <NoRecords message={"No Complaints Found"} />
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
        <main className="complaint">
          <div className="header-bar">
            <div className="all-complaint-container">
              <Avatar id="all-complaint-avatar">
                <PeopleAltTwoTone />
              </Avatar>
              <span>All complaints</span>
            </div>

            <SearchBar
              id="complaint-search-bar"
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
                    Date
                  </TableCell>
                  <TableCell id="table-cell" align="left">
                    Subject
                  </TableCell>
                  <TableCell id="table-cell" align="left">
                    Urgency
                  </TableCell>
                  <TableCell id="table-cell" align="left">
                    Area
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    Status
                  </TableCell>
                  <TableCell id="table-cell" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell align="center">
                        {format(parseISO(complaint.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell align="left">
                        {complaint.complaintBody.subject}
                      </TableCell>
                      <TableCell align="left">
                        {complaint.complaintBody.urgency}
                      </TableCell>
                      <TableCell align="left">
                        {complaint.complaintBody.area}
                      </TableCell>
                      <TableCell align="center">
                        {complaint.complaintRes.status === "Resolved" ? (
                          <Chip
                            icon={<CheckCircleOutlineRounded />}
                            label="Resolved"
                            size="small"
                            id="Resolved-chip"
                          />
                        ) : (
                          <Chip
                            icon={<Loop />}
                            label="Pending"
                            size="small"
                            id="Pending-chip"
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          id="view-btn"
                          variant="contained"
                          color="primary"
                          style={{ fontSize: ".6em" }}
                          onClick={() => handleResolveView(complaint)}
                        >
                          View
                        </Button>{" "}
                        <Button
                          variant="contained"
                          // id={`${complaint._id}-title`}
                          id="delete-btn"
                          style={{ fontSize: ".6em" }}
                          onClick={() =>
                            handleOpen(
                              complaint._id,
                              complaint.complaintBody.subject,
                              `${complaint.complaintBody.area} with ${
                                complaint.complaintBody.urgency
                              } urgency filed on ${format(
                                parseISO(complaint.date),
                                "dd/MM/yyyy"
                              )}`
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
                    count={complaints.length}
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
          <ResolveCard
            resolveComplaint={resolveComplaint}
            isResolved={isResolved}
            setIsResolved={setIsResolved}
            resolveOpen={resolveOpen}
            setResolveOpen={setResolveOpen}
            headers={headers}
          />
        </main>
      </div>
    </div>
  );
};

export default ComplaintAdmin;
