import React from "react";
import { GET_USER_NOTIFICATIONS } from "../../graphql/notification";
import { useQuery } from "@apollo/client";
import { useStore } from "../../store";
import Notification from "../../components/App/Notification";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import LoadingIndicator from "../../components/LoadingIndicator";
import HelperMessages from "../../components/HelperMessages";
import { helperText } from "../../constants/HelperText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  notifications: {
    // backgroundColor: theme.palette.primary.main,
    padding: ".5rem",
    width: 350
  },
}))

const Notifications = () => {
  const [{ auth }] = useStore();
  const classes = useStyles();

  // TODO: rep skip and limit with constant VARS
  // USE FetchMore
  const { data, loading, networkStatus } = useQuery(GET_USER_NOTIFICATIONS, {
    variables: {
      userId: auth.user.id,
      skip: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const renderContent = () => {
    if (loading && networkStatus === 1) return <LoadingIndicator />
    if (loading && networkStatus === 3) return <LoadingIndicator /> //loading more

    if (!loading && networkStatus != 1) {
      const notifications = data.getUserNotifications.notifications;
      if (!notifications.length) return <HelperMessages text={helperText.NO_NOTIFICATIONS} />

      return notifications.map((n) => (
        <Notification key={n.id} loading={loading} notification={n} />
      ));
    }
  };

  return (
    <Grid container>
      <Grid item md="8" lg="7" xs="12">
        <Box className={classes.notifications} >
          {renderContent()}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Notifications;
