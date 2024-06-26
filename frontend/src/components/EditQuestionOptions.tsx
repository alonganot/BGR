import { Box, Button, Grid, Icon, Input, Modal, Switch, Typography } from '@mui/material'
import { Question } from '../types/Question'
import { Option } from '../types/Option'

import { ChangeEvent, useState } from 'react';
import { modalStyle } from '../styles/SharedStyles';
import { api } from '../../data/api';

function EditQuestionOptions({ question }: { question: Question }) {
    const [isOpen, setIsOpen] = useState(false);

    const changeIsOpen = (): void => setIsOpen(!isOpen);


    const [isOptionsEditable, setisOptionsEditable] = useState<boolean[]>(new Array(question.options.length).fill(false));
    const [edittedOptions, setEdittedOptions] = useState<Option[]>(question.options);

    const changeIsOptionEditable = async (index: number) => {
        if (isOptionsEditable[index] && edittedOptions[index].url !== question.options[index].url) {
            try {
                await api().questions().changeQuestionOptionURL(question._id, index, edittedOptions[index].url)
                question.options[index].url = edittedOptions[index].url
            } catch (error) {
                console.log(error);
            }
        }

        setisOptionsEditable([...isOptionsEditable.slice(0, index), !isOptionsEditable[index], ...isOptionsEditable.slice(index + 1)]);
    }

    const changeEdittedOptions = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setEdittedOptions([...edittedOptions.slice(0, index),
        { ...edittedOptions[index], url: event.target.value }, ...edittedOptions.slice(index + 1)])
    }

    const changeOptionType = (index: number, oldType: string) => {
        const newType = oldType === 'image' ? 'icon' : 'image';
        try {
            api().questions().changeQuestionOptionType(question._id, index, newType)
            alert('סוג האפשרות עודכן בהצלחה')
        } catch (error) {
            console.log(error);
            alert('קרתה שגיאה! סוג השאלה לא התעדכן')     
        }
    }

    const changeCorrectIndex = (index: number) => {
        if (question.correctIndex !== index) {
            try {
                api().questions().changeCorrectIndex(question._id, index)
                alert("התשובה הנכונה עודכנה בהצלחה")
            } catch (error) {
                console.log(error);
                alert("קרתה שגיאה! התשובה הנכונה לא התעדכנה")
            }
        }
    }

    return (
        <>
            <Button onClick={changeIsOpen}>
                <Icon>list</Icon>
            </Button>
            <Modal
                open={isOpen}
                onClose={changeIsOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle(700)}>
                    <Typography dir='rtl' variant="h4" component="h2" align='center' marginBottom={'2vh'}>
                        {question.number}
                        . {question.title}
                        -{question.options[0].type === 'image' ? ' תמונה' : ' אייקון'}
                    </Typography>
                    <Grid container spacing={2}>
                        {question.options.map((option, index) => (
                            <Grid item xs={6} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Button variant='contained'
                                    color={index === question.correctIndex ? 'success' : 'primary'} sx={{ marginBottom: '1vh' }}
                                    onClick={() => changeCorrectIndex(index)}>
                                    {index === question.correctIndex ?
                                        'תשובה נכונה' : 'סמן כנכונה'}
                                </Button>
                                <Box display={'flex'} justifyContent={'center'}>
                                    {isOptionsEditable[index] ?
                                        <Input type="text" value={edittedOptions[index].url}
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
                </Box>
            </Modal>
        </>
    )
}

export default EditQuestionOptions
