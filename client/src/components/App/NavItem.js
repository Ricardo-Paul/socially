import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Button, ListItem } from "@material-ui/core";

const NavItem = ({ icon: Icon, title, href }) => {

    return(
        <ListItem>
            <Button
            component={RouterLink}
            to={href}
            >
                {Icon && <Icon /> }
                <span>
                    {title}
                </span>
            </Button>
        </ListItem>
    )
}

export default NavItem;