import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./User-Complaint.scss";
import { Tab, Tabs  } from "@material-ui/core";
import NewComplaint from "./NewComplaint";
import PendingComplaints from "./PendingComplaints";
import ResolvedComplaints from "./ResolvedComplaints";
import Cookie from "js-cookie";

const UserComplaint = () => {
  const [tabValue, setTabValue] = useState(0);

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <main>
      <NavBar user={true} />
      <div className="complaint-container">
        <h1>Complaints Hub</h1>
        <div className="complaint-main">
          <div>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              orientation="vertical"
              value={tabValue}
              onChange={handleChange}
            >
              <Tab label="New Complaint"/>
              <Tab label="Pending Complaints" />
              <Tab label="Resolved Complaints" />
            </Tabs>
          </div>
          {tabValue === 0 && <NewComplaint headers={headers} />}
          {tabValue === 1 && <PendingComplaints headers={headers} />}
          {tabValue === 2 && <ResolvedComplaints headers={headers} />}
        </div>
      </div>
      <div className="circle-3"></div>
      <div className="circle-4"></div>
    </main>
  );
};

export default UserComplaint;