import { colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

export default {
  palette: {
    type: 'dark',
    background: {
      dark: '#060606',
      default: colors.common.blueGrey,
      paper: colors.common.blueGrey
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
}