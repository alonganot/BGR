import {
  Button, Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination, TableRow
} from "@mui/material"
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom"
import { api } from "../../data/api";
import { Title } from "../styles/SharedStyles";
import QuestionRow from "../components/QuestionRow";
import { useAuthContext } from "../context/AuthContext";
import AddQuestionModal from "../components/AddQuestionModal";

function AdminPage() {
  const { logout } = useAuthContext();

  const ROWS_PER_TABLE_PAGE = 20;
  const [tablePage, setTablePage] = useState<number>(0);
  const { data, isLoading } = useQuery('getAllQuestions', () => api().questions().getAll());

  const visibleRows = () => {
    const start = tablePage * ROWS_PER_TABLE_PAGE;
    const end = (tablePage * ROWS_PER_TABLE_PAGE) + ROWS_PER_TABLE_PAGE;
    return data!.slice(start, end);
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setTablePage(newPage);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          {data && <AddQuestionModal questionTitles={data.map(question => question.title)} questionNum={data.length + 1} />}
          <Button variant="outlined" onClick={()=> logout()}><Link to="/">חזרה לדף הבית</Link></Button>
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
                <TableCell align="right">שם שאלה</TableCell>
                <TableCell align="right">אפשרויות</TableCell>
                <TableCell align="right">מחיקת השאלה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows().map((row, index) => (
                <QuestionRow key={index} question={row} />
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
