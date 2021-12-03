import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import RegularLoading from "../Loading/RegularLoading";
import { format, parseISO } from "date-fns";
import ResolveViewCard from "./ResolveViewCard";

function ResolvedComplaints({ headers, setMainHeading }) {
  const [resolvedData, setResolvedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [viewData, setViewData] = useState("");
  const getresolvedData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/user/complaint/get/Resolved`,
        { headers }
      );
      console.log(res.data);
      setResolvedData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveView = (data) => {
    setViewData(data);
    setIsOpen(true);
  };

  useEffect(() => {
    setMainHeading("Resolved Complaints");
    getresolvedData();
  }, []);

  if (resolvedData.length === 0) {
    return (
      <div className="pending-container">
        <Grid
          container
          alignItems="center"
          className="pending-card-head clr-resolve"
        >
          <Grid item xs={12} sm={3} className="center-text">
            <div className="content-info">
              <span className="bold-text">Date</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={5}>
            <div className="content-info">
              <span className="bold-text">Subject</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={2} className="center-text">
            <div className="content-info">
              <span className="bold-text">Area</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={2} className="center-text">
            <span className="bold-text">Info</span>
          </Grid>
        </Grid>
        <RegularLoading />
      </div>
    );
  }

  return (
    <div className="pending-container">
      <Grid
        container
        alignItems="center"
        className="pending-card-head clr-resolve"
      >
        <Grid item xs={12} sm={3} className="center-text">
          <div className="content-info">
            <span className="bold-text">Date</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className="content-info">
            <span className="bold-text">Subject</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={2} className="center-text">
          <div className="content-info">
            <span className="bold-text">Area</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={2} className="center-text">
          <span className="bold-text">Info</span>
        </Grid>
      </Grid>
      {resolvedData.map((data, idx) => (
        <Grid
          container
          className="pending-card"
          alignItems="center"
          spacing={1.5}
          key={idx}
        >
          <Grid item xs={12} sm={3} className="center-text">
            <div className="content-info"></div>
            <span>{format(parseISO(data.date), "dd/MM/yyyy")}</span>
          </Grid>
          <Grid item xs={12} sm={5}>
            <div className="content-info">
              <span>{data.complaintBody.subject}</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={2} className="center-text">
            <div className="content-info"></div>
            <span>{data.complaintBody.area}</span>
          </Grid>
          <Grid item xs={12} sm={2} className="center-text">
            <Button
              id="view-btn"
              variant="contained"
              color="primary"
              style={{ fontSize: ".2em" }}
              onClick={() => handleResolveView(data)}
            >
              View
            </Button>{" "}
          </Grid>
        </Grid>
      ))}
      <ResolveViewCard
        isOpen={isOpen}
        viewData={viewData}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default ResolvedComplaints;
