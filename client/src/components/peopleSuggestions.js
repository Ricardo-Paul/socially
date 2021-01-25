import React from "react";
import { Divider,
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
import * as Routes from "../routes";
import useTheme from "@material-ui/core/styles/useTheme";

const peopleStyles = makeStyles((theme) => ({
  people_box: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    padding: 10
  },
  people_header: {
    fontSize: "1rem"
  },
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
    color: theme.palette.primary.contrastText
  },
}));

const PeopleSuggestions = () => {
  const client = useApolloClient();
  const [{ auth }] = useStore();
  const [people, setPeople] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const classes = peopleStyles();

  React.useEffect(() => {
    const getSuggestedPeople = async () => {
      try {
        const {data} = await client.query({
          query: SUGGEST_PEOPLE,
          variables: {
            userId: auth.user.id,
          },
        });
        setPeople(data.suggestPeople.users);
        setLoading(loading);
      } catch (err) {
        console.log(err);
      }
    };

    getSuggestedPeople();
  }, [auth]);


  if (!people.length > 0) return null;
  if(loading){
    return <h3> LOADING ... </h3>
  }

  return (
    <Box className={classes.people_box}>
      <Box className={classes.people_header}>
        Suggestions for you
      </Box>
      <Divider />
      <List style={{ padding: 0 }}>
        {people.map((p) => (
          <ListItem
            disableGutters
            className={classes.item}
            component={Link}
            to={generatePath(Routes.PROFILE, {
              username: p.username,
            })}
          >
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
              <Typography className={classes.name}>
                <Box> { p.fullName } </Box>
              </Typography>
              <Typography variant="body2">
                <Box color={theme.palette.primary.contrastText} > @{p.username} </Box>  
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PeopleSuggestions;
