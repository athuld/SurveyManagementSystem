import { Route, Switch, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./components/Home/Home";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import AlertModal from "./components/AlertModal/Alert";
import UserHome from "./components/User-Home/UserHome";
import AdminHome from "./components/Admin/Admin-Home/AdminHome";
import SurveyHome from "./components/Admin/Survey/SurveyHome";
import NewSurvey from "./components/Admin/Survey/NewSurvey";
import SurveyTab from "./components/User-Survey/SurveyTab";
import SurveyRespond from "./components/User-Survey/SurveyRespond";

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
          <Route path="/user" component={UserHome} exact />
          <Route path="/user/surveys" exact>
            <SurveyTab isOpen={isOpen} setIsOpen={setIsOpen} />
          </Route>
          <Route path="/user/surveys/respond/:surveyId" exact>
            <SurveyRespond setIsOpen={setIsOpen} />
          </Route>
          <Route path="/admin" component={AdminHome} exact />
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
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
