import { useState } from "react";
import { Button, Chip } from "@material-ui/core";
import {
  Loop,
  CheckCircleOutlineRounded,
  EditOutlined,
} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import "./ComplaintAdmin.scss";
import React from "react";

const ResolveCard = ({
  resolveComplaint,
  isResolved,
  setIsResolved,
  setResolveOpen,
  resolveOpen,
  headers,
}) => {
  const [resolData, setResolData] = useState({
    complaintRes: { status: "Resolved" },
  });

  const [showEdit, setShowEdit] = useState(true);

  const handleChange = (e) => {
    setResolData((prev) => ({
      complaintRes: {
        ...prev.complaintRes,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let complaintId = resolveComplaint._id;
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/complaint/update/${complaintId}`,
        { data: resolData },
        { headers }
      );
      isResolved ? setIsResolved(false) : setIsResolved(true);
      setResolveOpen(false);
      setShowEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setResolveOpen(false);
    setShowEdit(true);
  };

  const handleEdit = () => {
    setShowEdit(false);
  };

  if (Object.keys(resolveComplaint).length === 0) {
    return (
      <div className="initial-select">
        <span>Fetching complaint info</span>
      </div>
    );
  }

  return (
    <div id="resolve-dialog">
      <Dialog
        open={resolveOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className="complaint-title">Complaint Info</span>
        </DialogTitle>
        <form
          method="post"
          action=""
          onChange={handleChange}
          onSubmit={handleSubmit}
        >
          <DialogContent className="complaint-body">
            <DialogContentText>
              <div className="complaint-info">
                <div className="complaint-sub">
                  <span className="header-info">Subject</span>
                  <div className="cmp-info cmp-clr">
                    {resolveComplaint.complaintBody.subject}
                  </div>
                </div>
                <div className="tri-section">
                  <div className="urgency-sec">
                    <span className="header-info">Urgency</span>
                    <div className="cmp-info cmp-clr center-text">
                      {resolveComplaint.complaintBody.urgency}
                    </div>
                  </div>
                  <div className="area-sec">
                    <span className="header-info">Area</span>
                    <div className="cmp-info cmp-clr center-text">
                      {resolveComplaint.complaintBody.area}
                    </div>
                  </div>
                  <div className="status-sec">
                    <span className="header-info">Status</span>

                    <div className="cmp-info center-text">
                      {resolveComplaint.complaintRes.status === "Resolved" ? (
                        <Chip
                          icon={<CheckCircleOutlineRounded />}
                          label="Resolved"
                          size="default"
                          id="Resolved-chip"
                        />
                      ) : (
                        <Chip
                          icon={<Loop />}
                          label="Pending"
                          size="default"
                          id="Pending-chip"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="issue-sec">
                  <span className="header-info">Issue</span>
                  <div className="cmp-info cmp-clr extra">
                    {resolveComplaint.complaintBody.issue}
                  </div>
                </div>
                {resolveComplaint.complaintRes.status === "Resolved" ? (
                  <div className="resol-sec">
                    <span className="header-info">Resolution</span>
                    <div className="cmp-info resol-clr extra">
                      {resolveComplaint.complaintRes.resolution}
                    </div>
                  </div>
                ) : null}
              </div>
            </DialogContentText>
            {resolveComplaint.complaintRes.status === "Resolved" &&
            showEdit ? null : (
              <TextField
                autoFocus
                margin="dense"
                id="resolution"
                name="resolution"
                label="Resolution"
                fullWidth
                multiline
                required
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            {resolveComplaint.complaintRes.status === "Resolved" && showEdit ? (
              <Button
                color="primary"
                variant="contained"
                onClick={handleEdit}
                size="small"
                startIcon={<EditOutlined />}
              >
                Edit
              </Button>
            ) : (
              <button type="submit" className="resolve-submit">
                SEND
              </button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ResolveCard;
