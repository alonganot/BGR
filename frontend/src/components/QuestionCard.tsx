import { Button, Card, Grid, Typography } from "@mui/material";
import { TopCenterTitle } from "../styles/SharedStyles";

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
  const validateAnswer = (index: number) => {
    if (index === correctIndex) {
      alert("true");
    } else {
      alert("false");
    }
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
