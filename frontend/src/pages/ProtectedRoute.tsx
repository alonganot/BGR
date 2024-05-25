import { useAuthContext } from '../context/AuthContext';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Typography variant='h2'>יש להתחבר דרך עמוד הבית</Typography>;
    }

    return children;
};

export default ProtectedRoute;