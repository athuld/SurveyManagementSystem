import { useState } from "react";
import "../Response.scss";
import { Tabs, Tab } from "@material-ui/core";
import Summary from "./Summary";
import Report from "./Report";

const ResponseTab = ({ responseData, surveyDetails }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <section>
      <div className="response-tab">
        <span className="response-header">{responseData.length} responses</span>
        <div className="tab-container">
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={tabValue}
            onChange={handleTabChange}
          >
            <Tab label="Summary" />
            <Tab label="Reports" />
          </Tabs>
        </div>
      </div>
      {tabValue === 0 && (
        <Summary responseData={responseData} surveyDetails={surveyDetails} />
      )}
      {tabValue === 1 && <Report />}
    </section>
  );
};

export default ResponseTab;
