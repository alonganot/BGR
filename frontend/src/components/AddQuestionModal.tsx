import { Box, Button, Grid, Icon, Input, Modal, Switch, Typography } from '@mui/material'
import { Question } from '../types/Question'
import { ChangeEvent, useState } from 'react';
import { modalStyle } from '../styles/SharedStyles';
import { api } from '../../data/api';

function AddQuestionModal({ questionTitles, questionNum }: { questionTitles: string[], questionNum: number }) {
    const emptyQuestion = {
        _id: '', title: '', number: questionNum,
        options: [{ url: '', type: 'icon' }, { url: '', type: 'icon' },
        { url: '', type: 'icon' }, { url: '', type: 'icon' }], correctIndex: 1
    }

    const [question, setQuestion] = useState<Question>(emptyQuestion)
    const [isOpen, setIsOpen] = useState(false);

    const changeIsOpen = (): void => setIsOpen(!isOpen);


    const [isOptionsEditable, setisOptionsEditable] = useState<boolean[]>(new Array(question.options.length).fill(true));

    const changeIsOptionEditable = (index: number) => {
        setisOptionsEditable([...isOptionsEditable.slice(0, index), !isOptionsEditable[index], ...isOptionsEditable.slice(index + 1)]);
    }

    const changeCorrectIndex = (index: number) => {
        setQuestion({ ...question, correctIndex: index })
    }

    const changeQuestionTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion({ ...question, title: event.target.value })
    }

    const changeEdittedOptions = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setQuestion({
            ...question, options: [...question.options.slice(0, index),
            { ...question.options[index], url: event.target.value }, ...question.options.slice(index + 1)]
        })
    }

    const changeOptionType = (index: number, oldType: string) => {
        const newType = oldType === 'image' ? 'icon' : 'image';
        setQuestion({
            ...question, options: [...question.options.slice(0, index),
            { ...question.options[index], type: newType }, ...question.options.slice(index + 1)]
        })
    }

    const isQuestionReady = () => {
        return question.title.length > 0 && question.options.filter(option => option.url.length === 0).length === 0
            && !questionTitles.includes(question.title)
    }

    const addQuestion = async () => {
        console.log(question)
        await api().questions().add(question)
        alert('השאלה התווספה בהצלחה')
        setIsOpen(false)
        setisOptionsEditable(new Array(question.options.length).fill(true))
        setQuestion(emptyQuestion)
    }

    return (
        <>
            <Button onClick={changeIsOpen}>
                <Icon>add</Icon>
            </Button>
            <Modal
                open={isOpen}
                onClose={changeIsOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle(700)} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Box display={'flex'}>
                    <Typography variant='h6'>{question.options[0].type === 'image' ? 'תמונה ' : 'אייקון ' }-</Typography>
                        <Input dir='rtl' type="text" value={question.title} onChange={changeQuestionTitle} placeholder='שם השאלה' sx={{ marginBottom: '2vh' }} />
                        <Typography variant='h6'>.{questionNum}</Typography>
                    </Box>
                    {questionTitles.includes(question.title) && <Typography color={'error'}>השם תפוס</Typography>}
                    <Grid container spacing={2}>
                        {question.options.map((option, index) => (
                            <Grid item xs={6} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Button variant='contained'
                                    color={index === question.correctIndex ? 'success' : 'primary'} sx={{ marginBottom: '1vh' }}
                                    onClick={() => changeCorrectIndex(index)}>
                                    {/* TODO: CREATE A REQUEST FOR THIS */}
                                    {index === question.correctIndex ?
                                        'תשובה נכונה' : 'סמן כנכונה'}
                                </Button>
                                <Box display={'flex'} justifyContent={'center'}>
                                    {isOptionsEditable[index] ?
                                        <Input type="text" value={question.options[index].url} placeholder='קישור לתמונה'
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => { changeEdittedOptions(event, index) }}
                                        /> : <img width={'40%'} src={option.url} />}
                                    <Button onClick={() => { changeIsOptionEditable(index) }}>
                                        {isOptionsEditable[index] ? <Icon color='success'>check</Icon> : <Icon>edit</Icon>}
                                    </Button>
                                </Box>
                                <Box display={'flex'}>
                                    <Typography variant='h6'>אייקון</Typography>
                                    <Switch checked={option.type === 'image'}
                                        onChange={() => { changeOptionType(index, option.type) }}></Switch>
                                    <Typography variant='h6'>תמונה</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Button onClick={addQuestion} color='success' variant='contained' sx={{ width: '2vw' }}
                        disabled={!isQuestionReady()}>
                        שמירה
                    </Button>
                </Box>
            </Modal >
        </>
    )
}

export default AddQuestionModal
