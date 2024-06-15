import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { ChangeEvent, useState } from "react";
import { modalStyle } from "../styles/SharedStyles";
import { api } from "../../data/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function LoginModal() {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const changeIsOpen = (): void => setIsOpen(!isOpen);

    const [password, setPassword] = useState<string>('');

    const changeCurrPassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value as string);
    };

    const [errorMessage, setErrorMessage] = useState<string>('');


    const verifyPassword = async (): Promise<void> => {
        const res = await api().users().verify(password)

        if (res.statusCode === 200) {
            login()
            navigate('/admin')
        } else if (res.statusCode === 401) {
            setErrorMessage('סיסמה שגויה, נסו שנית')
        } else {
            setErrorMessage('אופס! קרתה תקלה בהתחברות')
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            verifyPassword();
        }
    };

    return (
        <>
            <Button variant="outlined" onClick={changeIsOpen}>לעמוד הניהול</Button>
            <Modal
                open={isOpen}
                onClose={changeIsOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle(350)} textAlign={'center'}>
                    <Typography dir='rtl' variant="h5" align='center' sx={{ marginBottom: '2vh' }}>
                        ברוכים הבאים
                    </Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Button variant="outlined" color="success" sx={{ marginRight: '1vw' }} onClick={verifyPassword}>
                            כניסה</Button>
                        <TextField
                            id="password-input"
                            type="password"
                            label="סיסמה"
                            required
                            value={password}
                            onChange={changeCurrPassword}
                            onKeyDown={handleKeyPress}
                        />
                    </Box>
                    {errorMessage.length > 0 &&
                        <Typography variant="h6" color={'error'}> {errorMessage} </Typography>
                    }
                </Box>
            </Modal>
        </>
    )
}

export default LoginModal
