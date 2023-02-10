import { Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
        palette: {
            primary: {
                light: '#42a5f5',
                main: '#1976d2',
            },
            secondary: {
                light: '#42f57c',
                main: '#2e7d32',
            }
        },
        typography: {
            "fontFamily": "'Nunito Sans', sans-serif"
        },
    })