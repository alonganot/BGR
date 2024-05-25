import { useAuthContext } from '../context/AuthContext';
import { ReactNode } from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, logout } = useAuthContext();

    if (!isAuthenticated) {
        return <>
        <Typography variant='h2' sx={{marginBottom: '2vh'}}>יש להתחבר דרך עמוד הבית</Typography>
        <Button variant="outlined" onClick={()=> logout()}><Link to="/">חזרה לדף הבית</Link></Button>
        </>
    }

    return children;
};

export default ProtectedRoute;