import { Route, Switch, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./components/Home/Home";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import AlertModal from "./components/AlertModal/Alert";
import UserHome from "./components/User-Home/UserHome";

function App() {
  const location = useLocation();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

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
          <Route path="/user" component={UserHome} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
