import React, { useEffect, useState } from "react";
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

const convertTheme = { default: themes.DEFAULT_THEME, light: themes.LIGHT_THEME, dark: themes.DARK_THEME }

function SettingsDialog({ open, onClose }){
  const { currentTheme } = useThemeContext();
  const [value, setValue] = useState(currentTheme);
  const handleChange = (e) => setValue(e.target.value);


  // onLClose func is used for both for Ok and Cancel
  const handleCancel = () => onClose();
  const handleOk = () => {
    onClose(value);
  }

  const options = ["dark", "light", "default"];
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
    const { currentTheme, setTheme } = useThemeContext();

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleItemClick = () => setOpen(true);

    const onClose = (newValue) => {
      setOpen(false)
      if(newValue){
        const SELECTED_THEME = convertTheme[newValue];
          if(SELECTED_THEME !== currentTheme){
            setTheme(SELECTED_THEME);
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
        </Grid>
      </div>
    )
}

export default Preferences;