import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3862ab',
        },
        secondary: {
            main: '#38ac96',
        }
    },
    typography: {
        "fontFamily": "'Nunito Sans', sans-serif"
    },
})

export default theme