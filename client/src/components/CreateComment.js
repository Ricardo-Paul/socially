import React from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { colors, shadows, theme } from "../utils/theme";

const commenStyles = makeStyles({
  textField: {
    // marginLeft: 10,
    marginRight: 5,

    paddingTop: 10,
    paddingLeft: 15,
    // transition: "0.6 ease-out",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
    },
  },
  form: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
});

const CreateComment = ({ focus }) => {
  const classes = commenStyles();
  const textareaEl = React.useRef(null);
  const buttonEl = React.useRef(null);

  const [comment, setComment] = React.useState("");

  const handleChange = (e) => setComment(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(comment);
    setComment("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      buttonEl.current.click();
      setComment("");
    }
  };

  // focus is a boolean.. we'll focus on the
  // text area when comment is open
  React.useEffect(() => {
    focus && textareaEl.current.focus();
  }, [focus]);

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField 
          inputRef={textareaEl}
          multiline
          fullWidth
          className={classes.textField}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={comment}
          placeholder="comment..."
        />
        <Button
          size="small"
          variant="contained"
          className={classes.button}
          color="primary"
          type="submit"
          ref={buttonEl}
        >
          Comment
        </Button>
      </form>
    </>
  );
};

export default CreateComment;

CreateComment.propTypes = {
  focus: PropTypes.bool.isRequired,
};
