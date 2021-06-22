import { Backdrop, CircularProgress } from "@material-ui/core";

const BackdropLoading = () => {
  return (
    <Backdrop open>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", top: ".5rem", left: "3rem" }}>
          Loading....
        </span>
        <CircularProgress />
      </div>
    </Backdrop>
  );
};

export default BackdropLoading;
