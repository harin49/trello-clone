import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/styles";
import CardModal from './CardModal';

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
    <div>
      <Card className={classes.card}>
      <ButtonBase className={classes.cardButtonBase} onClick={()=>
        props.handleCardModalOpen(props.card.cardId)}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.card.cardDescription}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
    {
      props.open && <CardModal
      open={props.open}
      handleCardModalClose={props.handleCardModalClose}
      addCards={props.addCards}
      allCards={props.allCards}
      listId={props.card.listId}
      card={props.chosenCard ? props.chosenCard[0]:props.card}
    />
    }
    </div>
  );
};
