import {
    FormControl, FormLabel, TextField
} from '@mui/material'
import { ChangeEvent } from 'react';
import { Title } from '../styles/SharedStyles';
import { useUserContext } from '../context/UserContext';

function FrameInfoForm() {
    const { user, setUser } = useUserContext();

    const changeFrameName = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, frame: { ...user.frame, name: event.target.value as string }});
    };

    const changeFrameOrganization = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, frame: { ...user.frame, organization: event.target.value as string }});
    };

    const changeFrameCity = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, frame: { ...user.frame, city: event.target.value as string }});
    };

    return (
        <>
            <Title variant='h4'>{'מעט פרטים על המסגרת '}</Title>
            <FormControl sx={{ direction: 'rtl', paddingTop: '2vh' }}>
                <TextField
                    id="frame-name-select"
                    label="שם המסגרת"
                    required
                    value={user.frame.name}
                    onChange={changeFrameName}
                    error={user.frame.name.length === 0}
                    helperText={user.frame.name.length === 0 ? `שדה זה הוא חובה`: ''}
                />
                <TextField
                    id="frame-organization-select"
                    label="שם הארגון המפעיל"
                    required
                    value={user.frame.organization}
                    onChange={changeFrameOrganization}
                    error={user.frame.organization.length === 0}
                    helperText={user.frame.organization.length === 0 ? `שדה זה הוא חובה`: ''}
                />
                <TextField
                    id="frame-city-select"
                    label="שם הרשות/עירייה"
                    required
                    value={user.frame.city}
                    onChange={changeFrameCity}
                    error={user.frame.city.length === 0}
                    helperText={user.frame.city.length === 0 ? `שדה זה הוא חובה`: ''}
                />
            </FormControl>
        </>
    )
}

export default FrameInfoForm
