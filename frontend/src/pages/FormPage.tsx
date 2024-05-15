import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TopCenterTitle } from "../styles/SharedStyles";
import QuestionCard from "../components/QuestionCard";
import { api } from "../../data/api";
import { useQuery } from "react-query";
import { useUserContext } from "../context/UserContext";

function FormPage() {
  const navigate = useNavigate();
  const {answers} = useUserContext()

  const [page, setPage] = useState(1);
  const nextPage = () => {
    setPage(page + 1);
  };

  const finishForm = () => {
    console.log(answers)
    alert("תודה רבה על המענה!")
    navigate("/")
  };

  const { data, isLoading } = useQuery('getAllQuestions', () => api().questions().getAll());

  return (
    <>
      <Grid container>
        <Grid item xs={2} sx={{ alignSelf: 'end' }}>
          {(data && page < data.length) && <Button variant="contained" onClick={nextPage}>לשאלה הבאה</Button> }
          {(data && page === data.length) && <Button variant="contained" color="success" onClick={finishForm}>לסיום הסקר</Button> }
        </Grid>
        <Grid item xs={8}>
          <TopCenterTitle height={10} variant="h5">
            אני מראה לך ארבע תמונות
          </TopCenterTitle>
          <TopCenterTitle height={15} variant="h5">
            בבקשה תגיד.י לי באיזו תמונה רואים
          </TopCenterTitle>
          {
            isLoading && <TopCenterTitle height={20} variant="h5">
              השאלה נטענת....
            </TopCenterTitle>
          }
          {data &&
            <QuestionCard
              key={page}
              questionNum={data[page - 1].number}
              title={data[page - 1].title}
              options={data[page - 1].options}
              correctIndex={data[page - 1].correctIndex}
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
