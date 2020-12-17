import React from "react";
import { useApolloClient } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { Button, MenuItem } from "@material-ui/core";
import { useStore } from "../store/store";
import { CLEAR_AUTH_USER } from "../store/auth";
import { SIGNIN } from "../routes";


const Logout = ({ history }) => {
    const client = useApolloClient();
    const [, dispatch] = useStore();

    const handleLogout = () => {
        // dispatch({type: CLEAR_AUTH_USER});
        localStorage.removeItem("token");
        client.resetStore();
        history.push(SIGNIN);
    }


    return(
        <MenuItem onClick={handleLogout}>
            Logout
        </MenuItem>
    )
}

export default withRouter(Logout)