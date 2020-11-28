import React from "react";
import { Overlay } from "./Layout";
import Confirm from "./Confirm";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const overlayStyles = makeStyles({
  overlay: {
    position: "fixed",
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});

const Modal = ({ open, children, onClose, type, ...props }) => {
  const classes = overlayStyles();
  if (!open) return null;

  return (
    <>
      <div className={classes.overlay}>
        {type === "confirm" ? <Confirm {...props} /> : children}
      </div>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.oneOf(["", "confirm"]),
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
