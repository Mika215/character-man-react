import React from "react";
import {makeStyles, Grid} from "@material-ui/core";
import Character from "./Character";
import {base64Header} from "../utils";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "70px", //why this require too much margin ?
  },
}));

export const Chracters = (props) => {
  const {characters, delHandler,detailHandler} = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.grid}>
      {characters.map((character) => (
        <Grid key={character.id} item xs={12} sm={6} md={4}>
          <Character
            character={character}
            imgURL={`${base64Header},${character.image}`}
            delHandler={delHandler}
            charName={character.name}
            shortDesc={character.shortDescription}
            detailHandler={detailHandler}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default Chracters;
