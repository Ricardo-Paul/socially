import React from "react";
import { useApolloClient } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { Link, useTheme } from "@material-ui/core";
import { useStore } from "../store/store";
import { CLEAR_AUTH_USER } from "../store/auth";
import { SIGNIN } from "../routes";

const Logout = ({ history }) => {
  const client = useApolloClient();
  const theme = useTheme();
  const text_color = theme.palette.primary.contrastText;
  const [, dispatch] = useStore();

  const handleLogout = () => {
    // dispatch({type: CLEAR_AUTH_USER});
    localStorage.removeItem("token");
    client.resetStore();
    history.push(SIGNIN);
  };

  return <Link style={{color: text_color, padding: ".5rem"}} onClick={handleLogout}>Logout</Link>;
};

export default withRouter(Logout);
