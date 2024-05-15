import {
    FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup,
    Select, SelectChangeEvent, TextField
} from '@mui/material'
import { ChangeEvent } from 'react';
import { Title } from '../styles/SharedStyles';
import { CAN_READ_OPTIONS, GENDER_OPTIONS } from '../constants';
import { useUserContext } from '../context/UserContext';

function SelfInfoForm() {
    const { user, setUser } = useUserContext();
    const MIN_AGE = 0

    const changeGender = (event: SelectChangeEvent) => {
        setUser({...user, gender: event.target.value as string});
    };

    const changeCanRead = (event: SelectChangeEvent) => {
        setUser({...user, canRead: event.target.value as string});
    };

    const changeAge = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, age: +event.target.value as number});
    };

    return (
        <>
            <Title variant='h4'>{'מעט פרטים על מקבל השירות'}</Title>
            <FormControl sx={{ direction: 'rtl', paddingTop: '2vh' }}>
                <TextField
                    id="age-select"
                    label="גיל"
                    type="number"
                    required
                    value={user.age}
                    onChange={changeAge}
                    error={user.age <= MIN_AGE}
                    helperText={user.age <= MIN_AGE ? 'גיל לא תקין': ''}
                />
                <FormLabel id="gender-label">מין</FormLabel>
                <RadioGroup
                    aria-labelledby="gender-label"
                    name="gender-select"    
                    row
                    value={user.gender}
                    onChange={changeGender}
                >
                    {GENDER_OPTIONS.map((option, index) => (
                        <FormControlLabel key={index} value={option.name} control={<Radio />} label={option.displayName} />
                    )) 
                    }
                </RadioGroup>
                <FormLabel id="can-read-label">האם יודע/ת לקרוא</FormLabel>
                <Select
                    labelId="can-read-label"
                    id="can-read-select"
                    required
                    value={user.canRead}
                    label="האם יודע/ת לקרוא"
                    onChange={changeCanRead}
                >
                    {CAN_READ_OPTIONS.map((option, index) => (
                        <MenuItem key={index} value={option.name}>{option.displayName}</MenuItem>
                    )) 
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default SelfInfoForm
