import { createTheme } from "@mui/material/styles"
import { grey } from "@mui/material/colors"
export const theme = createTheme({
    palette: {
        primary: {
            main: "#F05454",
        },
        secondary: {
            main: "#DDDDDD",
        },
        text: {
            primary: grey[200],
            secondary: grey[100],
            disabled: grey[50],
        },
        background: {
            paper: "#30475E",
            default: "#222831"
        }
    },
    shape: {
        borderRadius: 15,
    },
});