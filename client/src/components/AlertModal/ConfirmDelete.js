import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { Delete } from "@material-ui/icons";

const ConfirmDelete = (props) => {
  const { dialogDetails, setOpen, open, handleDelete } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {`Are you sure you want to delete this ${dialogDetails.item}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span style={{ fontWeight: "500", fontSize: "1.5em" }}>
              {dialogDetails.title}{" "}
            </span>
            <span
              style={{
                fontSize: ".8em",
                marginBottom: "1em",
              }}
            >
              {dialogDetails.description}
            </span>
            <span>{`By clicking on 'DELETE' you will delete this ${dialogDetails.item}`}</span>
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Close
        </Button>
        <Button
          variant="contained"
          onClick={() => handleDelete(dialogDetails.id)}
          id="delete-btn"
          style={{ marginBottom: ".8em", marginRight: "1.3em" }}
          startIcon={<Delete />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
