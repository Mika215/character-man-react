import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
// import AddChar from "./AddChar";
import AddCharacter from "./AddCharacter";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: " #009688", //"#64b5f6",
    
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom:"1.5px"
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block", //media query for MUI  if the screen is biger than small(600px) it will display block if not it remains none.
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  addNew: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  searchInput: {
    opacity: "1",
    padding: "0px 18px 0px 0px",
    marginRight:"10%",
    fontSize: "0.9rem",
    borderRadius: "25px",
    width: "50%",
   
    "&:hover": {
      backgroundColor: "#fff",
      transition: "0.6s ease-in-out",
      width:"50%",
    },
    //add margin between the search lenes and the text
    "& .MuiSvgIcon-root": {
      marginRight: "10px",
    },
    "& .MuiInputBase-input": {
      padding: "10px 10px 10px 0px",
      
      
    },
  },
}));

const NavBar = ({value,handleChange}) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <Typography variant="h6" className={classes.logoLg}>
            Character Manager
          </Typography>
        </Link>
        <Link to="/">
          <Typography variant="h6" className={classes.logoSm}>
            CharMan
          </Typography>
        </Link>

        {/* //!check out the github link here for search bar functionality
        https://github.com/CodAffection/React-Material-UI-Table-Paging-Sorting-and-Filtering./tree/master/src/pages/Employees */}
        <div className={classes.searchInput}>
          <InputBase
            placeholder="Search Characters..."
            value={value}
            onChange={(e)=>handleChange(e.target.value)}
            startAdornment={<SearchIcon fontSize="medium" />}
          />
        </div>
        <div>
          <div>
            <AddCharacter />
            <Typography variant="h6" className={classes.addNew}>
              Add New
            </Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
