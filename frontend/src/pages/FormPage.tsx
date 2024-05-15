import { Button, Grid, Pagination } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { TopCenterTitle } from "../styles/SharedStyles";
import QuestionCard from "../components/QuestionCard";
import { api } from "../../data/api";
import { useQuery } from "react-query";

function FormPage() {
  const [page, setPage] = useState(1);
  const changePage = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const { data, isLoading } = useQuery('getAllQuestions', () => api().questions().getAll());

  return (
    <>
      <Grid container>
        <Grid item xs={2} />
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
          <Pagination
            page={page}
            onChange={changePage}
            count={data?.length}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default FormPage;
