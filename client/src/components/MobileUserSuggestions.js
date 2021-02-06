import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { useApolloClient } from "@apollo/client";
import { SUGGEST_PEOPLE } from "../graphql/user";
import { useStore } from "../store";
import LoadingIndicator from "./LoadingIndicator";


const useStyles = makeStyles(theme => ({
  container: {
    color: "white"
  }
}))

const MobileUserSuggestions = () => {
  const client = useApolloClient();
  const [{ auth }] = useStore();
  const [loading, setLoading] = React.useState(null);
  const [people, setPeople] = React.useState(null);

  React.useEffect(() => {
    const getSuggestedPeople = async () => {
      try {
        setLoading(true)
        const {data, loading} = await client.query({
          query: SUGGEST_PEOPLE,
          variables: {
            userId: auth.user.id,
          },
        });
        setPeople(data.suggestPeople.users);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };

    getSuggestedPeople();
  }, [auth]);


  const classes = useStyles();
    if(loading){
      return(
        <Box> <LoadingIndicator /> </Box>
      )
    }
    return (
        <Box className={classes.container}>
            Mobile User Suggestions
        </Box>
    )
}

export default MobileUserSuggestions;