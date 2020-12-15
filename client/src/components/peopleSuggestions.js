import { Card, Divider,CardContent } from "@material-ui/core";
import React from "react";


const PeopleSuggestions = () => {
    return(
        <Card>
        <h4 style={{paddingLeft: 10}}> Suggestions </h4>
        <Divider />
        <CardContent>
            Users here
        </CardContent>
      </Card>
    );
}

export default PeopleSuggestions;