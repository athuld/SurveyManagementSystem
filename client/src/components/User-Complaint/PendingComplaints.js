import { useEffect, useState } from "react";
import axios from "axios";
import { Chip, Grid } from "@material-ui/core";
import { Loop } from "@material-ui/icons";
import RegularLoading from "../Loading/RegularLoading";
import { format, parseISO } from "date-fns";

const PendingComplaints = ({ headers }) => {
  const [pendingData, setPendingData] = useState([]);

  const getPendingData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/user/complaint/get/Pending",
        { headers }
      );
      setPendingData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPendingData();
  }, []);

  if (pendingData.length === 0) {
    return (
    <div className="pending-container">
      <span className="pending-head">Pending Complaints</span>
      <RegularLoading />
    </div>
    )
  }

  return (
    <div className="pending-container">
      <span className="pending-head">Pending Complaints</span>
      {pendingData.map((data, idx) => (
        <Grid
          container
          className="pending-card"
          alignItems="center"
          spacing={1.5}
          key={idx}
        >
          <Grid item xs={12} sm={3} className="center-text">
            <div className="content-info">
              <span className="bold-text">Date : </span>
            </div>
            <span>{format(parseISO(data.date), "dd/MM/yyyy")}</span>
          </Grid>
          <Grid item xs={12} sm={5}>
            <div className="content-info">
              <span className="bold-text">Subject</span>
              <span>{data.complaintBody.subject}</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={2} className="center-text">
            <div className="content-info">
              <span className="bold-text">Area: </span>
            </div>
            <span>{data.complaintBody.area}</span>
          </Grid>
          <Grid item xs={12} sm={2} className="center-text">
            <Chip
              icon={<Loop />}
              label="Pending"
              size="small"
              color="primary"
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default PendingComplaints;
