import { Route, Switch, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./components/Home/Home";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import AlertModal from "./components/AlertModal/Alert";
import UserHome from "./components/User-Home/UserHome";
import SurveyHome from "./components/Admin/Survey/SurveyHome";
import NewSurvey from "./components/Admin/Survey/NewSurvey";
import SurveyTab from "./components/User-Survey/SurveyTab";
import SurveyRespond from "./components/User-Survey/SurveyRespond";
import Users from "./components/Admin/Users/Users";
import Response from "./components/Admin/Response/Response";
import UserComplaint from "./components/User-Complaint/User-Complaint";
import ComplaintAdmin from "./components/Admin/Complaints/ComplaintAdmin";
import Dashboard from "./components/Admin/Admin-Home/Dashboard"

function App() {
  const location = useLocation();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState({
    severity: "",
    message: "",
  });

  return (
    <div>
      <AlertModal
        showAlertModal={showAlertModal}
        setshowAlertModal={setShowAlertModal}
        isLoggedIn={isLoggedIn}
        isRegistered={isRegistered}
      />
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          setShowAlertModal(false);
          setIsLoggedIn(null);
          setIsRegistered(false);
        }}
      >
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Home} />
          <Route path="/login">
            <Login
              setShowAlertModal={setShowAlertModal}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>
          <Route path="/signup">
            <Register
              setShowAlertModal={setShowAlertModal}
              setIsRegistered={setIsRegistered}
            />
          </Route>
          <Route path="/user" exact>
            <UserHome
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              notification={notification}
              setNotification={setNotification}
            />
          </Route>
          <Route path="/user/surveys" exact>
            <SurveyTab isOpen={isOpen} setIsOpen={setIsOpen} />
          </Route>
          <Route path="/user/surveys/respond/:surveyId" exact>
            <SurveyRespond setIsOpen={setIsOpen} />
          </Route>
          <Route path="/user/complaints" exact>
            <UserComplaint isOpen={isOpen} setIsOpen={setIsOpen} />
          </Route>
          <Route path="/admin" component={Dashboard} exact />
          <Route path="/admin/users" exact>
            <Users
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              notification={notification}
              setNotification={setNotification}
            />
          </Route>
          <Route path="/admin/surveys" exact>
            <SurveyHome
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              notification={notification}
              setNotification={setNotification}
            />
          </Route>
          <Route path="/admin/surveys/new">
            <NewSurvey
              setIsOpen={setIsOpen}
              setNotification={setNotification}
            />
          </Route>
          <Route path="/admin/surveys/response/:surveyId">
            <Response
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              notification={notification}
              setNotification={setNotification}
            />
          </Route>
          <Route path="/admin/complaints">
            <ComplaintAdmin
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              notification={notification}
              setNotification={setNotification}
            />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
