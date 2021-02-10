import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Hidden } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { themes } from "../../constants/AppTheme";
import { useThemeContext } from "../..";

const useStyles = makeStyles(theme =>({
    preferences: {
      color: theme.palette.primary.contrastText
    },
    theme_settings: {
      backgroundColor: theme.palette.primary.main,
      padding: ".7rem",
      borderRadius: ".5rem",
      display: "flex",
      flexDirection: "column",
      fontSize: "1rem",
      cursor: "pointer"
    },
    span: {
      fontSize: ".9rem",
      color: "#a6a6a7"
    }
}));

const currentTheme = localStorage.getItem("theme");
const convertTheme = { Default: themes.DEFAULT_THEME, Light: themes.LIGHT_THEME, Dark: themes.DARK_THEME }



function SettingsDialog({ open, onClose }){
  const themeValue = currentTheme === "dark"? "Dark": "light";
  const [value, setValue] = useState(themeValue);
  const handleChange = (e) => setValue(e.target.value);

  // onLClose func is used for both for Ok and Cancel
  const handleCancel = () => onClose();
  const handleOk = () => {
    onClose(value);
  }

  const options = ["Dark", "Light", "Default"];
  return(
    <Dialog open={open} >
      <DialogContent>
        <RadioGroup name="theme" value={value} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}> Cancel </Button>
        <Button onClick={handleOk}> Ok </Button>
      </DialogActions>
  </Dialog>
  )
}

const Preferences = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleItemClick = () => setOpen(true);

    const { currentTheme, setTheme } = useThemeContext();
    console.log("CONTEXT ELEMENTS", currentTheme, setTheme)

    const onClose = (newValue) => {
      setOpen(false)
      if(newValue){
        const SELECTED_THEME = convertTheme[newValue];
          if(SELECTED_THEME !== currentTheme){
            setTheme(SELECTED_THEME);
            console.log('THEME VALUE', SELECTED_THEME)
          } else {
            console.log('SAME THEME')
          }
      }
    }

    return(
        <div className={classes.preferences}>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item md="8" lg="7" xs="12">
                <SettingsDialog 
                open={open} 
                onClose={onClose}
                />

                <Box className={classes.theme_settings} onClick={handleItemClick} >
                  Application theme
                  <span className={classes.span} > Select your favorite theme </span>
                </Box>
          </Grid>
          <Hidden smDown>
            <Grid item md="4" lg="4" xs="12">
              B
            </Grid>
          </Hidden>
        </Grid>
      </div>
    )
}

export default Preferences;