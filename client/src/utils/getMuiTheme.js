import { createMuiTheme } from '@material-ui/core';
import { palette } from './theme';

/**
 * 
 * @param {string} SELECTED_COLOR_SCHEME LIGH or DARK color scheme
 */
export const getMuiTheme = SELECTED_COLOR_SCHEME => createMuiTheme({
    palette: palette[SELECTED_COLOR_SCHEME]
});

