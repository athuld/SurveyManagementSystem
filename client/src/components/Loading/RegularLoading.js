import { CircularProgress } from "@material-ui/core";

const RegularLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1em",
      }}
    >
      <CircularProgress size={25} />
      <span style={{ marginLeft: "1rem" }}>Loading....</span>
    </div>
  );
};

export default RegularLoading;
