import { Button, Grid, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { TopCenterTitle } from "../styles/SharedStyles";
import { Question } from "../types/Question";
import QuestionCard from "../components/QuestionCard";
import { ChangeEvent, useState } from "react";

function FormPage() {
  const [page, setPage] = useState(1);
  const changePage = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const questions: Question[] = [
    {
      title: "בנק",
      options: [
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
      ],
      correctIndex: 2,
    },
    {
      title: "מרפאה",
      options: [
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
        "https://www.kshalem.org.il/wp-content/uploads/2024/04/2%D7%91%D7%A0%D7%A7.jpg",
      ],
      correctIndex: 0,
    },
  ];
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
          <QuestionCard
            key={page}
            questionNum={page}
            title={questions[page - 1].title}
            options={questions[page - 1].options}
            correctIndex={questions[page - 1].correctIndex}
          />
          <Pagination
            page={page}
            onChange={changePage}
            count={questions.length}
          />
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
