import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, Paper } from "@material-ui/core";
import { useApolloClient } from "@apollo/client";
import { SUGGEST_PEOPLE } from "../graphql/user";
import { useStore } from "../store";
import LoadingIndicator from "./LoadingIndicator";
import defaultAvatar from "../ressources/defaultAvatar.jpg";

const useStyles = makeStyles(theme => ({
  "@global":{
    "*::-webkit-scrollbar":{
      width: 0,
      height: 0,
    }
  },
  container: {
    width: "100%",
    overflowX: "auto"
  },
  image_container: {
    width: 300,
    height: 200,
    backgroundColor: "#424040",
    border: "1px solid black"
  },
  image: {
    width: "100%",
    height: "100%"
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
    return <h3> LOADING ... </h3>
  }

  console.log('PEOPLE', people)

  return (
    <div className={classes.container}>
          <div style={{ width: "2000px", display: "flex" }}>
            <div className={classes.image_container} style={{width: "500px"}}> 
                {/* <img src={p.image || defaultAvatar} className={classes.image} /> */}
              </div>
              <div className={classes.image_container} style={{width: "500px"}}> 
                {/* <img src={p.image || defaultAvatar} className={classes.image} /> */}
              </div>
              <div className={classes.image_container} style={{width: "500px"}}> 
                {/* <img src={p.image || defaultAvatar} className={classes.image} /> */}
              </div>
              <div className={classes.image_container} style={{width: "500px"}}> 
                {/* <img src={p.image || defaultAvatar} className={classes.image} /> */}
              </div>
          </div>
    </div>
  );
};

export default MobileUserSuggestions;