import { useAuthContext } from '../context/AuthContext';
import { ReactNode } from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, logout } = useAuthContext();
    const { user } = useUserContext();

    if (!isAuthenticated) {
        if (user.age > 0) {
            return children
        }

        return <>
            <Typography variant='h2' sx={{ marginBottom: '2vh' }}>יש להתחבר דרך עמוד הבית</Typography>
            <Button variant="outlined" onClick={() => logout()}><Link to="/">לדף הבית</Link></Button>
        </>
    }

    return children;
};

export default ProtectedRoute;