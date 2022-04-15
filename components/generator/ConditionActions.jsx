import { Checkbox, FormControlLabel, Grid } from "@mui/material";
export default function ConditionActions({
    conditions
}) {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "20px 0px"
                }}
            >
                {conditions.map((itm, idx) => (
                    <FormControlLabel
                        key={idx}
                        control={
                            <Checkbox
                                checked={itm.value}
                                onChange={itm.onChange}
                            />
                        }
                        label={itm.title}
                    />
                ))}
            </div>
        </Grid>
    )
}
