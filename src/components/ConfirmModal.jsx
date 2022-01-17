import { Container, Modal,makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import {React,useState} from "react";
import {Link} from "react-router-dom";
import ControlsExp from "./controls/ControlsExp";



const useStyles = makeStyles((theme) => ({

  modContainer: {
    width: 500,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: "10px",
    paddingTop: theme.spacing(4),
    top: 150,
    right: 0,
    left: 0,
   
    // margin: "auto",
    [theme.breakpoints.down("sm")]: {
      hieght: "100vh", //! this gives us full screen size
      width: "100vh", //!full screen size
      bottom: 0,
      top: 0,
    },
  },
  containerDiv: {
    padding: theme.spacing(6),
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"space-between",
  },
  item: {
    marginBottom: theme.spacing(4),
  },
 closeX: {
    color:"red",
    border:"none",
    fontSize:"1.2rem",
    position:"absolute",
    top:20,
    right:20,
    "&:hover":{
     color:"black",
  
    },
   

  },
  title:{
    paddingBottom:"5%",
    display:"flex",
    justifyContent:"center",
    alignContent:"space-between",
    
  },
  body:{
    paddingBottom:"15%",
    display:"flex",
    justifyContent:"center",
    alignContent:"space-between",
    
  },
  footer:{
    // paddingBottom:"5%",
    display:"flex",
    justifyContent:"center",
    alignContent:"space-between",
    
  }
}));






const ConfirmModal = (props) => {
  const [open, setOpen] = useState(true);
  const {character, continuer, canceller} = props;
  const classes=useStyles()
  return (
    <Modal open={open}>
<Container className={classes.modContainer}>
    {/* <div className="modalBackground"> */}
      <div className={classes.containerDiv}>
        <button className={classes.closeX} onClick={()=>setOpen(false)} >X</button>
        <div  className={classes.title}>
          <h3>Are you sure you want to continue?</h3>
        </div>
        <div  className={classes.body}>
          <p>Character will be permanetly deleted</p>
        </div>
        <div  className={classes.footer} >
          <Link to="/">
            <ControlsExp.ButtonCust
              text="Continue"
              color="primary"
              size="small"
              onClick={() => continuer(character.id)}
            />
          </Link>
          <ControlsExp.ButtonCust
            text="Cancel"
            color="secondary"
            size="small"
            onClick={() => canceller()}
          />
        </div>
      </div>
    {/* </div> */}
    </Container>
</Modal>
  );
   

};

export default ConfirmModal;




