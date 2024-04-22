import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from '@mui/material';
import styled from "styled-components";


import '../styles/HomePage.css'
import { Subtitle, Title } from "../styles/SharedStyles";

function HomePage() {
  const Information = styled(Typography)({
    textAlign: 'start',
    paddingRight: '3vw',
    paddingLeft: '16vw',
    direction: 'rtl'
  })

  const titleText = 'סקר'
  const subtitleText = 'מהו הייצוג הגרפי המיטבי למקבלי שירות עם מוגבלות שכלית'
  const infoText = `
  מדריך/ה יקר/ה, בשאלון הבא יוצגו מילים ותמונות שלהן.
  מקבל/ת השירות ת/יתבקש להתאים לכל מילה את התמונה המתאימה. עבור כל מילה, עליך/עלייך לשאול את השאלה המופיעה,
  ללחוץ על "הבא" ומיד להתחיל למדוד את הזמן שלקח למקבל/ת השירות להשיב. בכל שאלה עליך/עלייך לסמן את תשובתו/ה של
  מקבל/ת השירות.
  
  עבור כל שאלה, מופעל שעון שקוצב את הזמן בשניות עד לרגע בו בחרת את התשובה הנכונה.
  
  בתודה על שיתוף הפעולה!
  
  צוות המחקר של קרן שלם.
  `

  return (
    <>
      <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Button variant="outlined"><Link to="/admin">להתחברות</Link></Button>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Title variant='h3'>{titleText}</Title>
        <Subtitle variant='h4'>{subtitleText}</Subtitle>
      </Box>
      <Box sx={{paddingTop: '2vh'}}>
        <Information variant='h6'>{infoText}</Information>
      </Box>
      <Grid container>
        <Grid item xs={2}>
          <Button variant="outlined"><Link to="/details">למילוי הפרטים</Link></Button>
        </Grid>
        <Grid item xs={10} />
      </Grid>
      </>
  )
}

export default HomePage
