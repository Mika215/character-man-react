import React from "react";
// import { useParams } from "react-router";
import {Link} from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
    paddingBottom: "20%",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "20%",
    },
    height: 400,
    width: 320,
    borderRadius: "15px",
  },
  media: {
    // padding: "5%",
    // margin: "8% 0% 0% 0%",
    height: 280,
    [theme.breakpoints.down("sm")]: {
      height: 280,
    },
  },
}));

const Character = (props) => {
  const {
    character,
    imgURL,
    title,
    charName,
    shortDesc,
    longDesc,
  } = props;

  const classes = useStyles();
  return (
    <div>
      <Card key={character.id} className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imgURL} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h4">
              {charName}
            </Typography>
            <Typography variant="body1">{shortDesc}</Typography>
            <Typography variant="body2">{longDesc}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/single/${character.id}`}>
            <Button
              size="small"
              color="primary"
            >
              More Details
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default Character;
