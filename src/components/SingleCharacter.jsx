import {React,useState} from "react";
import {Link, useParams} from "react-router-dom";
import {base64Header} from "../utils";
import ConfirmModal from "./ConfirmModal";
import ControlsExp from "./controls/ControlsExp";
import EditCharacter from "./EditCharacter";



const SingleCharacter = ({delHandler, characters,}) => {

const[openConfirm,setOpenConfirm]=useState(false)

const continueDel=()=>{
  delHandler(character.id)
  // console.log(character.id)
}
const cancelDel=()=>{
  console.log(`Deletting cancelled`)
  setOpenConfirm(false)
}
  const params = useParams();
  const charId = params.characterID;
  const character = characters.find((element) => element.id === charId);

  return (
    <div className="single-container">
      <div className="img-container">
        <img
          src={`${base64Header},${character.image}`}
          alt=""
        />
      </div>
      <h1 className="name">
  
        {character.name}
      </h1>
      <p className="short-desc">
       
        {character.shortDescription}
      </p>
      <p className="detailes">
        {character.description}
      </p>

      <div className="custom-btn">
        <EditCharacter character={character}/>
      
        <ControlsExp.ButtonCust
          onClick={() => setOpenConfirm(true)}
          // onClick={() => delHandler(character.id)}
          text="delete"
          color="secondary"
          size="medium"
        />
       
        {openConfirm && 
        <ConfirmModal character={character.id} continuer={continueDel} canceller={cancelDel}/>
          
          }
      </div>
    </div>
  );
};

export default SingleCharacter;
