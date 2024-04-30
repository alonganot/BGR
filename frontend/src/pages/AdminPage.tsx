import { Button, Grid, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom"
import { questions } from "./FormPage"

function AdminPage() {
  const ROWS_PER_TABLE_PAGE = 5;
  const [tablePage, setTablePage] = useState(0);

  const visibleRows = () => {
    const start = tablePage * ROWS_PER_TABLE_PAGE;
    const end = (tablePage * ROWS_PER_TABLE_PAGE) + ROWS_PER_TABLE_PAGE;

    return questions.slice(start, end);
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setTablePage(newPage);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Button variant="outlined"><Link to="/">חזרה לדף הבית</Link></Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
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
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">
                  <Button>
                    <Icon>north</Icon>
                  </Button>
                  <Button>
                    <Icon>south</Icon>
                  </Button>
                </TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">
                  <Button>
                    <Icon>edit</Icon>
                  </Button>
                  {row.title}
                </TableCell>
                <TableCell align="right">
                  <Button>
                    <Icon>list</Icon>
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button color="error">
                    <Icon>delete</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[ROWS_PER_TABLE_PAGE]}
        component="div"
        count={questions.length}
        rowsPerPage={ROWS_PER_TABLE_PAGE}
        page={tablePage}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default AdminPage
