import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import { Box, Grid, useTheme } from "@material-ui/core";


const About = () => {
  const theme = useTheme();
  return (
    <Grid item md="8" lg="7" xs="12">
    <Box color={theme.palette.primary.contrastText} textAlign="center" marginTop="20%" >
      <h3> Socially v1.0.0 </h3>
    {/* <p style={{textAlign: "center"}} > The project at this point is considered a Minimum Viable Product. I look forward to spending more time on it to improve it and implement new features. <br />
      While you are here, this is an open source project, if you need to make it better I will welcome your contributions. </p> */}
      developed by: Ricardo Paul <br/>

    <a target="_blank" href="https://github.com/Ricardo-Paul/socially" > <GitHubIcon /> </a>
  </Box>
</Grid>
)
};

export default About;
