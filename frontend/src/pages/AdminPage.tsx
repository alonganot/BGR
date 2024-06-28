import {
  Box,
  Button, Grid, Icon, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination, TableRow,
  Tooltip
} from "@mui/material"
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { utils, writeFile } from 'xlsx';
import { api } from "../../data/api";
import { Title } from "../styles/SharedStyles";
import QuestionRow from "../components/QuestionRow";
import { useAuthContext } from "../context/AuthContext";
import AddQuestionModal from "../components/AddQuestionModal";
import { CAN_READ_OPTIONS, GENDER_OPTIONS, SELECTED_ANSWER_OPTIONS } from "../constants";

function AdminPage() {
  const { logout } = useAuthContext();

  const ROWS_PER_TABLE_PAGE = 20;
  const [tablePage, setTablePage] = useState<number>(0);
  const { data, isLoading } = useQuery('getAllQuestions', () => api().questions().getAll());

  const visibleRows = () => {
    const start = tablePage * ROWS_PER_TABLE_PAGE;
    const end = (tablePage * ROWS_PER_TABLE_PAGE) + ROWS_PER_TABLE_PAGE;
    return data!.slice(start, end).sort((a, b) => a.number - b.number);
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setTablePage(newPage);
  }

  const downloadExcel = async () => {
    try {
      const dataFromServer = await api().answers().getAll();
      console.log(dataFromServer);

      const data = dataFromServer.map((data: any) => {
        const { user, answers } = data

        const userInfo = {
          createdAt: answers[0].createdAt,
          userId: user._id,
          age: user.age,
          gender: GENDER_OPTIONS.find(gender => gender.name === user.gender)!.displayName,
          canRead: CAN_READ_OPTIONS.find(canRead => canRead.name === user.canRead)!.displayName,
          frameName: user.frame.name,
          frameOrganization: user.frame.organization,
          frameCity: user.frame.city
        };

        const allAnswers = answers.map((answer: any, index: any) => ({
          [`questionNumber_${index+1}`]: answer.question.number,
          [`questionTitle_${index+1}`]: answer.question.title,
          [`type_${index+1}`]: answer.type === 'image' ? 'תמונה': 'אייקון',
          [`selectedAnswer_${index+1}`]: SELECTED_ANSWER_OPTIONS.find(selectedAnswer => selectedAnswer.name === answer.selectedAnswer)?.displayName,
          [`wasCorrect_${index+1}`]: answer.wasCorrect === true ? 'כן' : 'לא',
          [`secondsTaken_${index+1}`]: answer.secondsTaken,
      }));

        return Object.assign(userInfo, ...allAnswers);
      });

      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Data');
      writeFile(workbook, 'תשובות לסקר ייצוג גרפי מיטבי.xlsx');

    } catch (error) {
      console.log(error);
      alert('קרתה שגיאה בניסיון הורדת הקובץ')
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Box display={"flex"}>
            {data &&
              <Box display={"flex"}>
                <Tooltip title="הורדת התשובות לאקסל" placement="top">
                  <Button onClick={() => downloadExcel()}>
                    <Icon>download</Icon>
                  </Button>
                </Tooltip>
                <AddQuestionModal questionNum={data.length + 1} />
              </Box>
            }
            <Button variant="outlined" onClick={() => logout()}><Link to="/">לדף הבית</Link></Button>
          </Box>
        </Grid>
      </Grid>
      {isLoading &&
        <Title>טוען את הנתונים</Title>}
      {data &&
        <><TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, direction: "rtl" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">שינוי סדר שאלות</TableCell>
                <TableCell align="right">מספר שאלה</TableCell>
                <TableCell align="right">סוג שאלה</TableCell>
                <TableCell align="right">שם שאלה</TableCell>
                <TableCell align="right">אפשרויות</TableCell>
                <TableCell align="right">מחיקת השאלה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows().map((row, index) => (
                <QuestionRow key={index} question={row} amountOfQuestions={data.length} />
              ))}
            </TableBody>
          </Table>
        </TableContainer><TablePagination
            rowsPerPageOptions={[ROWS_PER_TABLE_PAGE]}
            component="div"
            count={data!.length}
            rowsPerPage={ROWS_PER_TABLE_PAGE}
            page={tablePage}
            onPageChange={handleChangePage} /></>
      }
    </>
  )
}

export default AdminPage
