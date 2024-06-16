import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TopCenterTitle } from "../styles/SharedStyles";
import QuestionCard from "../components/QuestionCard";
import { api } from "../../data/api";
import { useQuery } from "react-query";
import { useUserContext } from "../context/UserContext";
import { usePreloadedImages } from "../context/PreLoadImagesContext";

function FormPage() {
  const navigate = useNavigate();
  const { user, answers, clearUser } = useUserContext()

  const [page, setPage] = useState(1);
  const nextPage = () => {
    setAnswerPicked(false)
    setPage(page + 1);
  };

  const finishForm = async () => {
    try {
      const userId = await api().users().create(user);
      if (userId === 'error') {
        throw new Error('הבקשה להוסיף את המשתמש נכשלה')
      }
      
      const answersWithUserId = answers.map(answer => {
        answer.userId = userId
        return answer
      })

      console.log(answersWithUserId);
      
      await api().answers().addAnswers(answersWithUserId)
      alert("תודה רבה על המענה!")
    } catch (error) {
      console.log(error);
      alert("קרתה שגיאה בהוספת התשובה לשאלה")
      //TODO: לתת אופציה להוריד כקובץ את המענה הלוקאלי כדי שיוכלו לשלוח ונוסיף ידנית
    } finally {
      navigate("/")
      clearUser()
    }
  };

  const { data, isLoading } = useQuery('getAllQuestions', () => api().questions().getAll());

  const { loadedImages } = usePreloadedImages();

  const [answerPicked, setAnswerPicked] = useState<boolean>(false)

  const enableNextQuestion = (): void => {
    setAnswerPicked(true);
  }

  return (
    <>
      <Grid container height={'70%'}>
        <Grid item xs={2} sx={{ alignSelf: 'end', zIndex: '4' }}>
          {(data && page < data.length) && <Button variant="contained" onClick={nextPage} disabled={!answerPicked}>לשאלה הבאה</Button>}
          {(data && page === data.length) && <Button variant="contained" color="success" onClick={finishForm} disabled={!answerPicked}>לסיום הסקר</Button>}
        </Grid>
        <Grid item xs={8}>
          {
            (isLoading || loadedImages.length === 0) && <TopCenterTitle height={10} variant="h5">
              השאלה נטענת....
            </TopCenterTitle>
          }
          {data && loadedImages.length > 0 &&
            <QuestionCard
              key={page}
              question={data[page - 1]}
              enableNextQuestion={enableNextQuestion}
            />
          }
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined">
            <Link to="/">חזרה לדף הבית</Link>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default FormPage;
