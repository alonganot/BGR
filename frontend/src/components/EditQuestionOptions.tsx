import { Box, Button, Grid, Icon, Input, Modal, Typography } from '@mui/material'
import { Question } from '../types/Question'
import { Option } from '../types/Option'

import { ChangeEvent, useState } from 'react';
import { modalStyle } from '../styles/SharedStyles';

function EditQuestionOptions({ question }: { question: Question }) {
    const [isOpen, setIsOpen] = useState(false);

    const changeIsOpen = (): void => setIsOpen(!isOpen);


    const [isOptionsEditable, setisOptionsEditable] = useState<boolean[]>(new Array(question.options.length).fill(false));
    const [edittedOptions, setEdittedOptions] = useState<Option[]>(question.options)

    const changeIsOptionEditable = (index: number) => {
        if (isOptionsEditable[index] && edittedOptions[index].url !== question.options[index].url) {
            console.log(question.options[index].url + ' should be changed to ' + edittedOptions[index].url);
        }

        setisOptionsEditable([...isOptionsEditable.slice(0, index), !isOptionsEditable[index], ...isOptionsEditable.slice(index + 1)]);
    }

    const changeEdittedOptions = (event: ChangeEvent<HTMLInputElement>, index: number) => {
+        setEdittedOptions([...edittedOptions.slice(0, index),
        { ...edittedOptions[index], url: event.target.value }, ...edittedOptions.slice(index + 1)])
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
                <Box sx={modalStyle}>
                    <Typography dir='rtl' variant="h4" component="h2">
                        {question.title}
                    </Typography>
                    <Grid container spacing={2}>
                        {question.options.map((option, index) => (
                            <Grid item xs={6} key={index}>
                                {isOptionsEditable[index] ?
                                    <Input type="text" value={edittedOptions[index].url}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => { changeEdittedOptions(event, index) }}
                                    /> : <img width={'40%'} src={option.url} />}
                                <Button onClick={() => { changeIsOptionEditable(index) }}>
                                    {isOptionsEditable[index] ? <Icon color='success'>check</Icon> : <Icon>edit</Icon>}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default EditQuestionOptions
