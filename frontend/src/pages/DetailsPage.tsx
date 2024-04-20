import { Button, Grid, Icon } from "@mui/material"
import { Link } from "react-router-dom"

function DetailsPage() {
  return (
    <>
    <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Button variant="outlined"><Link to="/">חזרה לדף הבית</Link></Button>
        </Grid>
      </Grid>
     <div>DetailsPage</div>
     <Icon>star</Icon>
    </>
  )
}

export default DetailsPage
