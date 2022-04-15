import { createTheme } from "@mui/material/styles"
import { grey, blue, pink } from "@mui/material/colors"
export const theme = createTheme({
    palette: {
        primary: {
            main: blue[600],
            light: blue[300],
            dark: blue[900],
            contrastText: grey[100],
        },
        secondary: {
            main: pink[600],
            light: pink[300],
            dark: pink[900],
            contrastText: grey[100],
        },
        text: {
            primary: grey[300],
            secondary: grey[100],
            disabled: grey[50],
        },
        background: {
            paper: grey[100],
            default: grey[800]
        }
    },
    shape: {
        borderRadius: 15,
    },
});