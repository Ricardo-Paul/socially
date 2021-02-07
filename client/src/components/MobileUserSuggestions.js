import React from "react";
import Box from "@material-ui/core/Box";
import { Button, IconButton, makeStyles, Paper } from "@material-ui/core";
import { useApolloClient } from "@apollo/client";
import { SUGGEST_PEOPLE } from "../graphql/user";
import { useStore } from "../store";
import LoadingIndicator from "./LoadingIndicator";
import defaultAvatar from "../ressources/defaultAvatar.jpg";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Follow from "./Follow";

const useStyles = makeStyles(theme => ({
  "@global":{
    "*::-webkit-scrollbar":{
      width: 0,
      height: 0,
    }
  },
  container: {
    maxWidth: "100%",
    height: 220,
    overflowX: "auto",
    padding: ".5rem",
    position: "relative"
  },
  user_item: {
    width: 120,
    height: 200,
    marginRight: ".5rem",
    borderRadius: ".5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#333333",
    boxShadow: "1px 1px 11px 0px black"
  },
  image_container:{
    width: 70,
    height: 70,
    marginTop: "1rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%"
  },
  card_bottom: {
    position: "absolute",
    bottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  name: {
    fontWeight: 400,
    marginBottom: ".5rem",
    color: theme.palette.primary.contrastText
  }
}))

const MobileUserSuggestions = () => {
  const client = useApolloClient();
  const [{ auth }] = useStore();
  const [people, setPeople] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

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
    return <Box display="flex" justifyContent="center"> <LoadingIndicator /> </Box>
  }
  const image =  "https://res.cloudinary.com/socially/image/upload/v1611174110/postimages/3lm22bzkvgmz8fs3x1vm.jpg"
  console.log('PEOPLE', people)
// a width of 700px if there's more than 3 items
  return (
    <div className={classes.container}>
          <div style={{ width: "700px", display: "flex" }}>
            {people.map(p => {
              return(
                <Box className={classes.user_item}> 
                  <Box className={classes.image_container}>
                    <img src={p.image || defaultAvatar} className={classes.image} />
                  </Box>
                  <Box className={classes.card_bottom}>
                    <Box className={classes.name}> {p.fullName} </Box>
                    <Follow user={p} icon={AddCircleIcon} style={{ textTransform: "lowercase" }} />
                  </Box>
                </Box>  
              )
            })}
          </div>
    </div>
  );
};

export default MobileUserSuggestions;