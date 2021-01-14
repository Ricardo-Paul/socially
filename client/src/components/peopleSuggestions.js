import React from "react";
import {
  Divider,
  Box,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { SUGGEST_PEOPLE } from "../graphql/user";
import { useApolloClient } from "@apollo/client";
import { useStore } from "../store";
import defaultAvatar from "../ressources/defaultAvatar.jpg";
import { Link, generatePath } from "react-router-dom";
import * as Routes from "../routes"

const peopleStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    border: "0.1px #afafaf",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  name: {
    fontSize: "16px",
    fontFamily: "roboto",
    fontWeight: 500,
  },
}));

const PeopleSuggestions = () => {
  const client = useApolloClient();
  const [{ auth }] = useStore();
  const [people, setPeople] = React.useState([]);

  const classes = peopleStyles();

  React.useEffect(() => {
    const getSuggestedPeople = async () => {
      try {
        const { data } = await client.query({
          query: SUGGEST_PEOPLE,
          variables: {
            userId: auth.user.id,
          },
        });
        setPeople(data.suggestPeople.users);
      } catch (err) {
        console.log(err);
      }
    };

    getSuggestedPeople();
  }, [auth]);

  if (!people.length > 0) {
    return null;
  }

  return (
    <Box border={1} style={{ width: "80%", borderColor: "#afafaf" }}>
      <h4 style={{ paddingLeft: 10 }}> USER SUGGESTIONS </h4>
      <Divider />
      <List style={{ padding: 0 }}>
        {people.map((p) => (
          <ListItem disableGutters className={classes.item} component={Link} to={
            generatePath(Routes.PROFILE, {
              username: p.username
            })
          } >
            <img
              src={p.image || defaultAvatar}
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
                objectFit: "cover",
              }}
            />
            <Box display="flex" flexDirection="column">
              <Typography className={classes.name}> {p.fullName} </Typography>
              <Typography variant="body2"> @{p.username} </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PeopleSuggestions;
