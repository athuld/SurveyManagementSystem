import React, { useState } from "react";
import "./UserHome.scss";
import {
  makeStyles,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import grandpa from "./assets/grandpa.png";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const FamilyCard = ({
  id,
  firstName,
  lastName,
  age,
  headers,
  setMemberNum,
}) => {
  const [open, setOpen] = useState(false); // for opening and closing the dialog
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * DELETE REQUEST
   */
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/user/members/delete/${id}`,
        { headers }
      );
      setMemberNum(response.data.members.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    /**
     * Grid containing the Member card
     * Each grid divide into sub grids of two equal size
     */
    <Grid item xs={12} sm={3}>
      <Paper elevation={2} className={classes.paper} id="family-paper">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Avatar
              alt="Member Avatar"
              src={grandpa}
              className={classes.small}
              id="family-avatar"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>
              <IconButton id="icon-btn" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {"Are you sure you want to delete this member?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    By clicking on 'DELETE' you will delete this member
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleDelete}
                    id="delete-btn"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>
        <div className="family-info">
          <p className="name">
            {firstName} {lastName}
          </p>
          <p className="general">{age} years old</p>
        </div>
      </Paper>
    </Grid>
  );
};

export default FamilyCard;
