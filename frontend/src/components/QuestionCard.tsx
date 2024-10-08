import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { TopCenterTitle } from "../styles/SharedStyles";
import { useUserContext } from "../context/UserContext";
import { Fragment, useState } from "react";
import { usePreloadedImages } from "../context/PreLoadImagesContext";
import { Question } from "../types/Question";
import { DONT_KNOW_INDEX } from "../constants";

function QuestionCard({
  question,
  enableNextQuestion
}: {
  question: Question;
  enableNextQuestion: () => void
}) {
  const {_id, title, options, correctIndex, number } = question

  const [loaded, setLoaded] = useState<boolean>(false)
  const { loadedImages } = usePreloadedImages()

  const showImage = () => {
    setLoaded(true);
  }
  const { addAnswer, user } = useUserContext();

  const [startingTime] = useState<Date>(new Date())
  const calcSecondsPassed: (answerTime: Date) => number = (answerTime: Date) => {
    const msDifference = answerTime.getTime() - startingTime.getTime();

    return msDifference / 1000;
  }

  const validateAnswer = (index: number) => {
    enableNextQuestion()
    addAnswer({
      userId: user.id, questionId: _id, selectedAnswer: index,
      type: index === DONT_KNOW_INDEX ? options[correctIndex].type : options[index].type, 
      wasCorrect: index === correctIndex, secondsTaken: calcSecondsPassed(new Date())
    });
  };


  return (
    <>
      <TopCenterTitle height={2} variant="h4">
        ? באיזה תמונה רואים {title}
      </TopCenterTitle>
      <Button variant="contained" color="warning"
        sx={{position: "fixed", top: "83%", left: "6%", zIndex: "2"}} onClick={() => { 
          validateAnswer(DONT_KNOW_INDEX)}}>אינני יודע/ת</Button>
      <Grid container rowSpacing={"5vh"} position={'fixed'} top={'10%'} left={'0%'}>
        {options.map((option, index) => (
          <Fragment key={index}>
            {index % 2 === 0 && <Grid item xs={2} />}
            {index === 2 && <Grid item xs={2} />}
            <Grid container justifyContent={"center"} item xs={4}>
              <Card>
                <Button
                  sx={{ width: option.type === 'image' ? '500px' : '400px' }}
                  onClick={() => {
                    validateAnswer(index);
                  }}
                >
                  <>
                    <img src="/loading.gif" style={{ display: loaded ? "none" : "", width: '300px', height: '250px' }} />
                    <img src={loadedImages.find(url => url === option.url)}
                      onLoad={showImage} style={{ width: option.type === 'image' ? '500px' : '400px', height: '270px', display: loaded ? "" : "none" }} />
                  </>
                </Button>
              </Card>
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={2} />
      </Grid>
      <Box display={'flex'} justifyContent={'center'} height={'102%'} alignItems={'self-end'}>
        <Typography>שאלה {number}</Typography>
      </Box>
    </>
  );
}

export default QuestionCard;
