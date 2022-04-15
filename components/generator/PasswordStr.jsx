import {
    Paper,
    Typography
} from "@mui/material";
export default function PasswordStr({
    pass,
    copy
}) {
    return (
        <div
            style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    p: 3,
                    mb: 11,
                    wordWrap: "break-word",
                    maxWidth: "95vw",
                }}
                onClick={copy}
            >
                <Typography
                    align="left"
                    gutterBottom
                    variant="subtitle1"
                    component="h1"
                    color="textPrimary"
                    fontWeight="bold"
                >
                    {pass}
                </Typography>
            </Paper>
        </div>
      
    )
}
