import { Button, Grid } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import SelfInfoForm from "../components/SelfInfoForm"
import FrameInfoForm from "../components/FrameInfoForm"
import { useUserContext } from "../context/UserContext";
import { api } from "../../data/api";

function DetailsPage() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const createUser = async () => {
    await api().users().create(user)
    navigate("/form")
  }

  const isFormFilled = (): boolean => {
    return user.age > 0 && user.gender !== '' && user.canRead !== ''
          && user.frame.name !== '' && user.frame.organization !== '' && user.frame.city !== ''
  }

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
      <Button variant="contained" color="success"
        disabled={!isFormFilled()} onClick={createUser}>לתחילת הסקר</Button>
    </>
  )
}

export default DetailsPage
