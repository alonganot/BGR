import { Button, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import SelfInfoForm from "../components/SelfInfoForm"
import FrameInfoForm from "../components/FrameInfoForm"

function DetailsPage() {
  return (
    <>
      <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Button variant="outlined"><Link to="/">חזרה לדף הבית</Link></Button>
        </Grid>
      </Grid>
      <Grid container justifyContent={'space-evenly'}>
        <Grid item>
          <FrameInfoForm />
        </Grid>
        <Grid item>
          <SelfInfoForm />
        </Grid>
      </Grid>
    </>
  )
}

export default DetailsPage
