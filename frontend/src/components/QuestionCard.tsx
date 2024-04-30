import { Button, Card, Grid } from "@mui/material";
import { TopCenterTitle } from "../styles/SharedStyles";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";

function QuestionCard({
  questionNum,
  title,
  options,
  correctIndex,
}: {
  questionNum: number;
  title: string;
  options: string[];
  correctIndex: number;
}) {
  const { addAnswer, user } = useUserContext();

  const [startingTime] = useState<Date>(new Date())
  const calcSecondsPassed: (answerTime: Date) => number = (answerTime: Date) => {
    const msDifference = answerTime.getTime() - startingTime.getTime();

    return msDifference / 1000;
  }

  const validateAnswer = (index: number) => {
    addAnswer({ userId: user.id, questionTitle: title, selectedAnswer: index, wasCorrect: index === correctIndex,
    secondsTaken: calcSecondsPassed(new Date()) });
  };


  return (
    <>
      <TopCenterTitle height={20} variant="h4">
        {title}
      </TopCenterTitle>
      <Grid container rowSpacing={"10vh"}>
        {options.map((option, index) => (
          <Grid key={index} container justifyContent={"center"} item xs={6}>
            <Card key={index}>
              <Button
                size="small"
                onClick={() => {
                  validateAnswer(index);
                }}
              >
                <img src={option} />
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>שאלה {questionNum}</div>
    </>
  );
}

export default QuestionCard;
