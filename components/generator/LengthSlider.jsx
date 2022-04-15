import {
    Grid,
    Slider
} from "@mui/material";
export default function LengthSlider({
    len,
    changeLen,
    color
}) {
    return (
        <Grid
            container
            justifyContent="center"
        >
            <Slider
                value={len}
                step={1}
                onChange={changeLen}
                size="medium"
                color={color}
                valueLabelDisplay="on"
                min={1}
                max={100}
                sx={{
                    width: 300
                }}
            />
        </Grid>
    )
}
