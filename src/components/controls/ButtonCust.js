import React from "react";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

const ButtonCust = (props) => {
  const {text, size, color, variant, onClick, ...other} = props;
  const classes = useStyles();
  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other} //this enables as to pass non mentioned props later on for example"Type ={submit,button..}"
      classes={{root: classes.root, label: classes.label}}
    >
      {text}
    </Button>
  );
};

export default ButtonCust;
