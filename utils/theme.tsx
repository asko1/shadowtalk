import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#f2f2f2",
      default: "#e0e0e0",
    },
    primary: {
      main: "#5063f5",
      dark: "#3862ab",
    },
    secondary: {
      main: "#00cc00",
      dark: "#2eab57",
    },
  },
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
  },
});

export default theme;
