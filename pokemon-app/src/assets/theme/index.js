import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fb4848",
      main: "#FB1B1B",
      dark: "#af1212",
    },
    secondary: {
      light: "#3b537f",
      main: "#0A285F",
      dark: "#071c42",
    },
  },
  spacing: 10,
});

export default theme;
