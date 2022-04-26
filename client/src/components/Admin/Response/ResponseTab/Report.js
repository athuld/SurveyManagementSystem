import { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import "../Response.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import Summary from "./Summary";
import NoRecords from "../../../NoRecords/NoRecords";
import ReportExport from "./ReportExport";

const Report = ({ surveyDetails }) => {
  const { surveyId } = useParams();

  const [responseData, setResponseData] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [filterData, setFilterData] = useState({
    district: "All",
    gender: "All",
    age: "All",
  });

  const districtValues = [
    "All",
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  const handleFilterChange = (e) => {
    setFilterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/survey/response/admin/fetch/`,
        {
          params: {
            surveyId: surveyId,
            district: filterData.district,
            gender: filterData.gender,
            age: filterData.age,
          },
        }
      );
      setShowResult(true);
      setResponseData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" fullWidth margin="dense" required>
              <InputLabel id="district">District</InputLabel>
              <Select
                labelId="select-district"
                id="district"
                name="district"
                label="District"
                defaultValue="All"
                onChange={handleFilterChange}
              >
                {districtValues.map((district, i) => {
                  return (
                    <MenuItem value={district} key={i}>
                      {district}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" fullWidth margin="dense" required>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="select-gender"
                id="gender"
                name="gender"
                label="Gender"
                defaultValue="All"
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" fullWidth margin="dense" required>
              <InputLabel id="age">Age</InputLabel>
              <Select
                labelId="select-age"
                id="age"
                name="age"
                label="Age"
                defaultValue="All"
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="below 18">below 18</MenuItem>
                <MenuItem value="above 18">18-30</MenuItem>
                <MenuItem value="above 30">31-50</MenuItem>
                <MenuItem value="above 50">51 above</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div className="generate-cont">
              <button className="generate-btn" onClick={handleGenerate}>
                Generate
              </button>
            </div>
          </Grid>
          {!showResult ? null : responseData.length === 0 ? null : (
            <Grid item xs={12} sm={1}>
              <ReportExport
                responseData={responseData}
                surveyDetails={surveyDetails}
              />
            </Grid>
          )}
        </Grid>
      </div>
      {!showResult ? null : responseData.length === 0 ? (
        <NoRecords message={"No Responses Found"} />
      ) : (
        <Summary responseData={responseData} surveyDetails={surveyDetails} />
      )}
    </div>
  );
};

export default Report;
