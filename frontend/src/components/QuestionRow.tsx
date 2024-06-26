import { Button, Icon, TableCell, TableRow, Input } from '@mui/material'
import { ChangeEvent, useState } from 'react';
import { api } from '../../data/api';
import { Question } from '../types/Question';
import EditQuestionOptions from './EditQuestionOptions';
import DeleteQuestionModal from './DeleteQuestionModal';

function QuestionRow({ question, amountOfQuestions }: { question: Question, amountOfQuestions: number }) {
    const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);
    const [edittedTitle, setEdittedTitle] = useState<string>(question.title)

    const changeIsTitleEditable = () => {
        if (isTitleEditable && edittedTitle !== question.title) {
            try {
                api().questions().changeTitleById(question._id, edittedTitle)
                alert('השם השתנה בהצלחה')
            } catch (error) {
                console.log(error)
                alert('קרתה שגיאה! השם לא השתנה')
            }
        }

        setIsTitleEditable(!isTitleEditable);
    }

    const changeEdittedTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setEdittedTitle(event.target.value)
    }

    const swapQuestionNums = (direction: string) => {
        try {
            api().questions().swapQuestionNumbers(question.number, direction === 'up' ? question.number - 1 : question.number + 1)
            alert('השאלות התחלפו בהצלחה')

        } catch (error) {
            console.log(error)
            alert("קרתה שגיאה! השאלות לא התחלפו")
        }
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="right">
                <Button disabled={question.number === 1} onClick={() => swapQuestionNums('up')}>
                    <Icon>north</Icon>
                </Button>
                <Button disabled={question.number === amountOfQuestions} onClick={() => swapQuestionNums('down')}>
                    <Icon>south</Icon>
                </Button>
            </TableCell>
            <TableCell align="right">{question.number}</TableCell>
            <TableCell align="right">{question.options[0].type === 'image' ? 'תמונה' : 'אייקון'}</TableCell>
            <TableCell align="right" sx={{ maxWidth: '6.8vw' }}>
                <Button onClick={changeIsTitleEditable}>
                    {isTitleEditable ? <Icon color='success'>check</Icon> : <Icon>edit</Icon>}
                </Button>
                {isTitleEditable ? <Input type="text" value={edittedTitle} onChange={changeEdittedTitle} /> : question.title}
            </TableCell>
            <TableCell align="right">
                <EditQuestionOptions question={question} />
            </TableCell>
            <TableCell align="right">
                <DeleteQuestionModal question={question} />
            </TableCell>
        </TableRow>
    )
}

export default QuestionRow
