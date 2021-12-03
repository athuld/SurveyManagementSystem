import { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./User-Complaint.scss";
import { Tab, Tabs } from "@material-ui/core";
import NewComplaint from "./NewComplaint";
import PendingComplaints from "./PendingComplaints";
import ResolvedComplaints from "./ResolvedComplaints";
import Cookie from "js-cookie";
import Notification from "../AlertModal/Notification";

const UserComplaint = ({ isOpen, setIsOpen }) => {
  const [tabValue, setTabValue] = useState(0);
  const [mainHeading, setMainHeading] = useState("");

  const headers = {
    autherisation: `Bearer ${Cookie.get("accessToken")}`,
  };

  useEffect(() => {
    document.title = "Complaints";
    setMainHeading("Complaints Hub");
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <main>
      <NavBar user={true} />
      <div className="complaint-container">
        <Notification
          isOpen={isOpen}
          severity="success"
          setIsOpen={setIsOpen}
          message="Complaint Submitted Successfully!"
        />
        <h1>{mainHeading}</h1>
        <div className="complaint-main">
          <div>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              orientation="vertical"
              value={tabValue}
              onChange={handleChange}
            >
              <Tab label="New Complaint" />
              <Tab label="Pending Complaints" />
              <Tab label="Resolved Complaints" />
            </Tabs>
          </div>
          {tabValue === 0 && (
            <NewComplaint
              headers={headers}
              setIsOpen={setIsOpen}
              setTabValue={setTabValue}
              setMainHeading={setMainHeading}
            />
          )}
          {tabValue === 1 && (
            <PendingComplaints
              headers={headers}
              setMainHeading={setMainHeading}
            />
          )}
          {tabValue === 2 && (
            <ResolvedComplaints
              headers={headers}
              setMainHeading={setMainHeading}
            />
          )}
        </div>
      </div>
      <div className="circle-3"></div>
      <div className="circle-4"></div>
    </main>
  );
};

export default UserComplaint;
