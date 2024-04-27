import { Button, Grid, Icon } from "@mui/material"
import { Link } from "react-router-dom"

function FormPage() {
  return (
    <>
    <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Button variant="outlined"><Link to="/">חזרה לדף הבית</Link></Button>
        </Grid>
      </Grid>
     <div>Hello form!</div>
     <Icon>star</Icon>
    </>
  )
}

export default FormPage
