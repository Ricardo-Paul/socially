import React from "react";
import { GET_USERS } from "../../graphql/user";
import PeopleCard from "./PeopleCard";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";

const peopleStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  gridListTile: {
    width: "180px",
    padding: 20,
  },
}));

const People = () => {
  const [{ auth }] = useStore();
  const classes = peopleStyles();

  const { data, loading, networkStatus } = useQuery(GET_USERS, {
    variables: {
      userId: auth.user.id,
      skip: 0,
      limit: 10, //TODO: create a limit constant
    },
    notifyOnNetworkStatusChange: true,
  });

  const content = () => {
    if (loading && networkStatus === 1) {
      return <h5> loading ... </h5>;
    }

    const { users, count } = data.getUsers;
    if (!users.length > 0) {
      return <h4> No users yet... </h4>;
    }

    return (
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList}>
          <GridListTile cols={2} style={{ height: "auto" }}>
            <ListSubheader> PEOPLE </ListSubheader>
          </GridListTile>

          {users.map((user, index) => (
            <GridListTile
              key={index}
              className={classes.gridListTile}
              style={{ width: "230px", height: "330px" }}
            >
              <PeopleCard key={index} user={user} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  return <>{content()}</>;
};

export default People;
