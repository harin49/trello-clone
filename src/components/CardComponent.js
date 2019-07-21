import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    width: 275,
    borderRadius: "5px",
    margin: "5px",
    marginRight: "0px"
  },
  title: {
    fontSize: 14
  },
  cardButtonBase: {
    display: "block",
    textAlign: "initial",
    width: "100%"
  }
});

export const CardComponent = props => {
  const classes = useStyles();
  console.log(props);
  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardButtonBase} onClick={() => console.log("hi")}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.card.cardDescription}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};
