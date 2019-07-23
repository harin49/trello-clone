import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Subtitles, Description, Comment } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

import "../styles/cardModal.scss";

const useStyles = {
  paper: {
    width: "500px",
    minHeight: "500px",
    position: "absolute",
    backgroundColor: "#fafafa",
    borderRadius: "3px",
    padding: "10px",
    outline: "none",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -50%)"
  },
  textField: {
    margin: "0",
    width: "90%",
    marginLeft: "10px"
  },
  input: {
    width: "100%",
    height: "35px",
    padding: "5px"
  },
  outline: {
    "&:hover $notchedOutline": {
      borderColor: "#FAFAFA"
    }
  },
  notchedOutline: {
    borderColor: "#FAFAFA"
  }
};

class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardTitle: this.props.card ? this.props.card.cardTitle : "",
      cardDescription: this.props.card ? this.props.card.cardDescription : "",
      currentComment: "",
      commentList: this.props.card ? this.props.card.comment : []
    };
  }

  handleTitleTextFieldChange = e => {
    this.setState({
      cardTitle: e.target.value
    });
  };

  handleDescriptionTextFieldChange = e => {
    this.setState({
      cardDescription: e.target.value
    });
  };

  handleCommentTextFieldChange = e => {
    this.setState({
      currentComment: e.target.value
    });
  };

  addComment = cardId => {
    const { currentComment } = this.state;
    const commentObj = {
      cardId,
      comment: currentComment
    };

    this.setState({
      commentList: [...this.state.commentList, commentObj]
    });
  };

  rand = () => {
    return Math.round(Math.random() * 20);
  };

  clearState = () => {
    this.setState({
      cardTitle: "",
      cardDescription: "",
      currentComment: "",
      commentList: []
    });
  };

  handleModalClose = async () => {
    await this.props.handleCardModalClose();
    this.clearState();
  };
  handleSave = async cardId => {
    const { cardTitle, cardDescription, commentList } = this.state;
    const listId = this.props.listId;
    const cardObj = {
      cardId,
      cardTitle,
      listId,
      cardDescription,
      comment: commentList
    };

    await this.props.addCards([...this.props.allCards, cardObj]);
    await this.props.handleCardModalClose();
    this.clearState();
  };

  render() {
    const { classes, open } = this.props;
    const { cardTitle, cardDescription, currentComment, commentList } = this.state;
    const cardId = `${cardTitle.replace(/\s/g, "")}-${this.rand()}`;
    return (
      <Modal open={open} onClose={this.handleModalClose}>
        <div className={classes.paper}>
          <div className="card-modal-title">
            <Subtitles />
            <TextField
              id="outlined-cardTitle"
              className={classes.textField}
              name={cardTitle}
              value={cardTitle}
              placeholder="Enter Title"
              margin="normal"
              variant="outlined"
              InputProps={{
                classes: {
                  root: classes.outline,
                  notchedOutline: classes.notchedOutline,
                  input: classes.input
                }
              }}
              onChange={e => this.handleTitleTextFieldChange(e)}
            />
          </div>
          <div className="card-modal-description">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Description />
              <Typography style={{ width: "50%", height: "35px", marginLeft: "10px" }}>
                Description
              </Typography>
            </div>
            <TextField
              id="outlined-cardDescription"
              className={classes.textField}
              name={cardDescription}
              value={cardDescription}
              placeholder="Add a more detailed description..."
              margin="normal"
              variant="outlined"
              InputProps={{
                classes: {
                  root: classes.outline,
                  input: classes.input
                }
              }}
              multiline={true}
              onChange={e => this.handleDescriptionTextFieldChange(e)}
            />
          </div>
          <div className="card-modal-comments">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Comment />
              <Typography style={{ width: "50%", height: "35px", marginLeft: "10px" }}>
                Comments
              </Typography>
            </div>
            <TextField
              id="outlined-cardComments"
              className={classes.textField}
              name={currentComment}
              placeholder="Add a more detailed description..."
              margin="normal"
              variant="outlined"
              InputProps={{
                classes: {
                  root: classes.outline,
                  input: classes.input
                }
              }}
              multiline={true}
              onChange={e => this.handleCommentTextFieldChange(e)}
            />
            <Button
              style={{
                height: "20px",
                width: "70px",
                fontSize: "7px",
                padding: "5px",
                marginTop: "5px",
                marginLeft: "5px"
              }}
              variant="contained"
              color="primary"
              onClick={() => this.addComment(cardId)}
            >
              Add comment
            </Button>
            {commentList &&
              commentList.map((commentItem, index) => {
                return (
                  <Typography
                    key={index}
                    style={{ width: "50%", height: "35px", marginLeft: "10px" }}
                  >
                    {commentItem.comment}
                  </Typography>
                );
              })}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={this.handleModalClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSave(cardId)} color="primary">
              Save
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withStyles(useStyles)(CardModal);
