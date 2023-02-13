import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#2e7d32',
            }
        },
        typography: {
            "fontFamily": "'Nunito Sans', sans-serif"
        },
    })