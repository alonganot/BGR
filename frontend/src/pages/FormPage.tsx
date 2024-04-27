import { Button, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import { Title, TopCenterTitle } from "../styles/SharedStyles"

function FormPage() {
  return (
    <>
    <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <TopCenterTitle height={10} variant="h5">אני מראה לך ארבע תמונות</TopCenterTitle>
          <TopCenterTitle height={15} variant="h5">בבקשה תגיד.י לי באיזו תמונה רואים</TopCenterTitle>

        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined"><Link to="/">חזרה לדף הבית</Link></Button>
        </Grid>
    </Grid>
    </>
  )
}

export default FormPage
