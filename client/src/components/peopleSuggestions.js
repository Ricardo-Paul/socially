import React from "react";
import { Card, Divider, CardContent } from "@material-ui/core";
import { SUGGEST_PEOPLE } from "../graphql/user";
import { useApolloClient } from "@apollo/client";
import { useStore } from "../store";

const PeopleSuggestions = () => {
  const client = useApolloClient();
  const [{ auth }] = useStore();

  React.useEffect(() => {
    const getSuggestedPeople = async () => {
      try {
        const result = await client.query({
          query: SUGGEST_PEOPLE,
          variables: {
            userId: auth.user.id,
          },
        });
        console.log("SUGGEST", result);
      } catch (err) {
        console.log(err);
      }
    };

    getSuggestedPeople();
  }, [auth]);

  return (
    <Card>
      <h4 style={{ paddingLeft: 10 }}> Suggestions </h4>
      <Divider />
      <CardContent>Users here</CardContent>
    </Card>
  );
};

export default PeopleSuggestions;
