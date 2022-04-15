import {
    Button,
    Grid,
} from '@mui/material'
export default function ActionButtons({
    actionBtns,
}) {
    return (
        <Grid
            container
            justifyContent="space-around"
            alignItems="center"

        >
            {
                actionBtns?.map((itm, idx) => (
                    <Button
                        key={idx}
                        onClick={itm?.action}
                        color={itm?.color}
                        size="large"
                        variant="contained"
                        disabled={itm?.disabled}
                        sx={{
                            my: 4,
                            textTransform: 'none',
                            fontWeight: "bold"
                        }}
                    >
                        {itm?.icon}
                    </Button>
                ))
            }
        </Grid>
    )
}
