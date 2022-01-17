import {React, useState} from "react";

import {Container, makeStyles, Modal, TextField} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import ControlsExp from "./controls/ControlsExp";
import FileInput from "./FileInput";

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
    paddingTop: theme.spacing(6),
    top: 75,
    right: 0,
    left: 0,
    bottom: 80,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      hieght: "100vh", //! this gives us full screen size
      width: "100vh", //!full screen size
      bottom: 0,
      top: 0,
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

const EditCharacter = ({character}) => {
  //!the character should always be distructured while passing it as props unless it doesn't work
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [id, setID] = useState(character.id);
  const [name, setName] = useState(character.name);
  const [shortDescription, setShortDescription] = useState(
    character.shortDescription
  );
  const [description, setDescription] = useState(character.description);
  const [image, setImage] = useState(character.image);

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
    setID(character.id);
    const charData = {
      id,
      name,
      shortDescription,
      description,
      image,
    };

    fetch(`${process.env.REACT_APP_BECODE_URL}/${character.id}`, {
      method: "PUT",

      headers: {
        // "Accept": "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(charData),
    });

    //!Setting back the values into initial state
    setName("");
    setShortDescription("");
    setDescription("");
    setImage("");

    console.log(charData);
    setOpen(false);
  };
  //!I couldn't use the useEffect hook here because the listCharacters function is declared in the app and couldn't import it here
  //!I can't automatically update everytime i update a character or added a new one
  return (
    <>
      <ControlsExp.ButtonCust
        text="Edit"
        // disabled
        onClick={() => setOpen(true)}
      />
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
                // defaultValue={character}
              />
            </div>
            {/* //! check out the detailes and functionality */}
            <FileInput
              label="Upload File"
              value={image}
              onChange={(e) => imageToBase64(e.target.value)}
            />

            <ControlsExp.ButtonCust
              text="Submit"
              type="submit"
              onClick={() => setOpenAlert(true)}
            />

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
          Changes Saved!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditCharacter;
