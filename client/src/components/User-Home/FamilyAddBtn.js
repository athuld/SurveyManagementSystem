import { useState } from "react";
import "./UserHome.scss";
import axios from "axios";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Grid,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import AddButton from "@material-ui/icons/AddBoxOutlined";

const useStyles = makeStyles((theme) => ({
  large: {
    "& svg": {
      fontSize: 40,
      margin: theme.spacing(2),
    },
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
}));

const FamilyAddBtn = ({ headers, setMemberNum }) => {
  const [open, setOpen] = useState(false);
  const [member, setMember] = useState({});

  const classes = useStyles();

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(member);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/members/add/",
        { data: member },
        { headers }
      );
      setMemberNum(response.data.members.length);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid item xs={12} sm={3}>
      <IconButton
        classes={{ label: classes.iconButtonLabel }}
        className={classes.large}
        disableRipple
        id="add-btn"
        onClick={handleOpenClick}
      >
        <AddButton />
        <div>Add a family member</div>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <DialogTitle id="form-dialog-title">New Member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in all the details of the family member
            </DialogContentText>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  margin="dense"
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  margin="dense"
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense" required>
                  <InputLabel id="relationship">Relationship</InputLabel>
                  <Select
                    labelId="select-relationship"
                    id="relationship"
                    name="relationship"
                    label="Relationship"
                    defaultValue=""
                    onChange={handleChange}
                  >
                    <MenuItem value="father">Father</MenuItem>
                    <MenuItem value="mother">Mother</MenuItem>
                    <MenuItem value="brother">Brother</MenuItem>
                    <MenuItem value="grandmother">Grandmother</MenuItem>
                    <MenuItem value="grandfather">Grandfather</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="Date Of Birth"
                  type="date"
                  margin="normal"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                  name="dob"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="Submit" variant="contained" id="new-member-btn">
              Add Member
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};
export default FamilyAddBtn;
