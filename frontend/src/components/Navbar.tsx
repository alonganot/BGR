import { Grid } from '@mui/material'
import '../styles/Navbar.css'


function Navbar() {
    return (
        <>
            <Grid container>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                    <img src="kshalemlogo.png" alt="" />
                </Grid>
            </Grid>
        </>
    )
}

export default Navbar
