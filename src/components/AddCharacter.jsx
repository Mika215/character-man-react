import {React, useState} from "react";

import {Container, Fab, makeStyles, Modal, TextField} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import ControlsExp from "./controls/ControlsExp";
import FileInput from "./FileInput";
import {Link,} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    padding: "10px",
    top: 1,
    right: 70,
    [theme.breakpoints.down("sm")]: {
      right: 2,
    },
    color: "#fff",
    backgroundColor: "#444f4f",
    "&:hover": {
      backgroundColor: "#bb8888",
      color: "fff",
    },
  },

  modContainer: {
    width: 800,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: "10px",
    paddingTop: theme.spacing(4),
    top: 80,
    right: 0,
    left: 0,
    bottom: 55,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      hieght: "100vh", //! this gives us full screen size
      width: "100vh", //!full screen size
      bottom: 0,
      top: 0,
    },
  },
  form: {
    padding: theme.spacing(3),
  },
  item: {
    marginBottom: theme.spacing(2),
  },
}));
const AddCharacter = (props) => {
 
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const formCancel = () => {
    setOpen(false);
    console.log("form cancelled!");
  };

  let currentBase64;
  let base64Split;
  const imageToBase64 = (e) => {
    const file = e;
    const reader = new FileReader();
    reader.onloadend = () => {
      currentBase64 = reader.result;
      base64Split = currentBase64.split(",")[1]; //picking only the base 64 without the haders but this seems to be unnessesary it works well with out split
      setImage(base64Split);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const charData = {
      name,
      shortDescription,
      description,
      image,
    };
    setIsPending(true);
    fetch(process.env.REACT_APP_BECODE_URL, {
      method: "POST",
      body: JSON.stringify(charData),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });

    setIsPending(false);
    //!Setting back the values into initial state
    setName("");
    setShortDescription("");
    setDescription("");
    setImage("");

    setOpen(false)
    console.log(charData);
  };
  return (
    <>
      <Tooltip title="Add New" aria-label="add" onClick={() => setOpen(true)}>
        <Fab className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container className={classes.modContainer}>
          <form
            classes={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Name"
                size="small"
                style={{width: "100%"}}
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="oulined-multiline-static"
                multiline
                label="Short Description"
                rows={3}
                onChange={(e) => setShortDescription(e.target.value)}
                style={{width: "100%"}}
                variant="outlined"
                value={shortDescription}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="oulined-multiline-static"
                multiline
                label="Long Description"
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
                style={{width: "100%"}}
                variant="outlined"
                value={description}
              />
            </div>
            {/* //! check out the detailes and functionality */}
            <FileInput
              label="Upload File"
              value={image}
              onChange={(e) => imageToBase64(e.target.value)}
            />
            {!isPending && (
              // <Link to="/"> 
              <ControlsExp.ButtonCust
                text="Submit"
                type="submit"
                onClick={() => setOpenAlert(true)}
              />
  
            )}
            {isPending && (
              <ControlsExp.ButtonCust
                text="Submitting..."
                type="submit"
                disabled
                onClick={() => setOpenAlert(true)}
              />
            )}
            <ControlsExp.ButtonCust
              text="Cancel"
              color="secondary"
              onClick={() => formCancel()}
            />
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
      >
        <Alert onClose={handleClose} severity="success">
          Charcter Saved!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCharacter;
