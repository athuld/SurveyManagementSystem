import { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import axios from "axios";

const NewComplaint = ({ headers, setIsOpen, setTabValue, setMainHeading }) => {
  const [complaint, setComplaint] = useState({ complaintBody: {} });

  const handleChange = (e) => {
    setComplaint((prev) => ({
      ...prev,
      complaintBody: {
        ...prev.complaintBody,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/user/complaint/new`,
        { data: complaint },
        { headers }
      );
      console.log(res.data);
      setIsOpen(true);
      setTabValue(1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setMainHeading("Complaints Hub");
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="new-comp-container">
      <h2>New Complaint</h2>
      <form action="" onChange={handleChange} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="subject"
          label="Subject"
          variant="outlined"
        />
        <Grid container spacing={3} id="select-container">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="Urgency">Urgency</InputLabel>
              <Select
                id="Urgency"
                defaultValue=""
                name="urgency"
                labelId="Urgency"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Severe">Severe</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="complaint-area">Area of complaint</InputLabel>
              <Select
                labelId="complaint-area"
                name="area"
                fullWidth
                defaultValue=""
                onChange={handleChange}
              >
                <MenuItem value="Public Service">Public Service</MenuItem>
                <MenuItem value="COVID">COVID</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <TextField
          variant="standard"
          multiline
          fullWidth
          label="Describe your issue"
          name="issue"
        />
        <Button fullWidth type="submit" id="comp-button">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewComplaint;
