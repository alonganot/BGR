import { Button, Icon, TableCell, TableRow, Input } from '@mui/material'
import { ChangeEvent, useState } from 'react';
import { Question } from '../types/Question';
import EditQuestionOptions from './EditQuestionOptions';

function QuestionRow({ question }: { question: Question }) {
    const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);
    const [edittedTitle, setEdittedTitle] = useState<string>(question.title)

    const changeIsTitleEditable = () => {
        if (isTitleEditable && edittedTitle !== question.title){
            console.log(question.title + ' should be changed to ' + edittedTitle);
        }

        setIsTitleEditable(!isTitleEditable);
    }

    const changeEdittedTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setEdittedTitle(event.target.value)
    }

    return (
        <TableRow
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
            <TableCell align="right">{question.number}</TableCell>
            <TableCell align="right" sx={{maxWidth: '6.8vw'}}>
                <Button onClick={changeIsTitleEditable}>
                    {isTitleEditable ? <Icon color='success'>check</Icon> : <Icon>edit</Icon>}
                </Button>
                {isTitleEditable ? <Input type="text" value={edittedTitle} onChange={changeEdittedTitle} /> : question.title}
            </TableCell>
            <TableCell align="right">
                <EditQuestionOptions question={question} />
            </TableCell>
            <TableCell align="right">
                <Button color="error">
                    <Icon>delete</Icon>
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default QuestionRow
