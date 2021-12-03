// import {useState} from 'react'
import { Modal, Backdrop, Fade, Chip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCircleOutlineRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6, 5),
  },
}));

const ResolveViewCard = ({ isOpen, setIsOpen, viewData }) => {
  const classes = useStyles();

  const handleClose = () => {
    setIsOpen(false);
  };

  if (Object.keys(viewData).length === 0) {
    return null;
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <span className="resolve-view-header">Complaint Information</span>
            <div className="complaint-info">
              <div className="complaint-sub">
                <span className="header-info">Subject</span>
                <div className="cmp-info cmp-clr">
                  {viewData.complaintBody.subject}
                </div>
              </div>
              <div className="tri-section">
                <div className="urgency-sec">
                  <span className="header-info">Urgency</span>
                  <div className="cmp-info cmp-clr center-text">
                    {viewData.complaintBody.urgency}
                  </div>
                </div>
                <div className="area-sec">
                  <span className="header-info">Area</span>
                  <div className="cmp-info cmp-clr center-text">
                    {viewData.complaintBody.area}
                  </div>
                </div>
                <div className="status-sec">
                  <span className="header-info">Status</span>

                  <div className="cmp-info center-text">
                    <Chip
                      icon={<CheckCircleOutlineRounded />}
                      label="Resolved"
                      size="default"
                      id="Resolved-chip"
                    />
                  </div>
                </div>
              </div>
              <div className="issue-sec">
                <span className="header-info">Issue</span>
                <div className="cmp-info cmp-clr extra">
                  {viewData.complaintBody.issue}
                </div>
              </div>
              <div className="resol-sec">
                <span className="header-info">Resolution</span>
                <div className="cmp-info resol-clr extra">
                  {viewData.complaintRes.resolution}
                </div>
              </div>
              <div className="ok-btn">
                <Button variant="contained" id="view-btn" onClick={handleClose}>
                  Ok
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ResolveViewCard;
