import React from "react";
import {
  Card,
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

const peopleStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    border: "1px solid #e6e6e6",
    cursor: "pointer",
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
  const avatar = "https://material-ui.com/static/images/avatar/2.jpg";

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
    <Card style={{ width: "80%" }}>
      <h4 style={{ paddingLeft: 10 }}> USER SUGGESTIONS </h4>
      <Divider />
      <List style={{ padding: 0 }}>
        {people.map((p) => (
          <ListItem disableGutters className={classes.item}>
            <img
              src={avatar}
              style={{ width: 80, height: 80, marginRight: 10 }}
            />
            <Box display="flex" flexDirection="column">
              <Typography className={classes.name}> {p.fullName} </Typography>
              <Typography variant="body2"> @{p.username} </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default PeopleSuggestions;
