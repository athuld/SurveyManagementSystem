import { Snackbar, Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./Alert.scss";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const Notification = ({ isOpen, severity, setIsOpen, message }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      id="snackbar"
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        variant="filled"
        elevation={6}
        severity={severity}
        onClick={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
