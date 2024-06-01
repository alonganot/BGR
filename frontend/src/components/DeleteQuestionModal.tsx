import { Box, Button, CircularProgress, Icon, Modal, Typography } from '@mui/material'
import { useState } from 'react';
import { modalStyle } from '../styles/SharedStyles';
import { api } from '../../data/api';
import { Question } from '../types/Question';

function DeleteQuestionModal({ question }: { question: Question }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const changeIsOpen = (): void => setIsOpen(!isOpen);

    const deleteQuestion = async () => {
        setLoading(true);
        try {
            await api().questions().deleteOne(question);
            alert('השאלה נמחקה בהצלחה!')
        } catch (error) {
            console.error("Failed to delete question", error);
            alert('קרתה שגיאה, השאלה לא נמחקה')
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    }

    return (
        <>
            <Button color="error" onClick={changeIsOpen}>
                <Icon>delete</Icon>
            </Button>
            <Modal
                open={isOpen}
                onClose={changeIsOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle(300)} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Typography>?בטוחים שתרצו למחוק את <b>{question.title}</b></Typography>
                    <Box display={'flex'}>
                        <Button color='error' onClick={deleteQuestion}>כן</Button>
                        <Button onClick={changeIsOpen}>לא, תחזירו אותי אחורה</Button>
                    </Box>
                    {loading && <CircularProgress />}

                </Box>
            </Modal >
        </>
    )
}

export default DeleteQuestionModal
