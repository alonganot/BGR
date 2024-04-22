import {
    FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup,
    Select, SelectChangeEvent, TextField
} from '@mui/material'
import { ChangeEvent, useState } from 'react';
import { Title } from '../styles/SharedStyles';
import { GenderEnum } from '../types/User';

function SelfInfoForm() {
    const [gender, setGender] = useState('');
    const [canRead, setCanRead] = useState('');
    const [age, setAge] = useState(18);
    const MIN_AGE = 5

    const changeGender = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    const changeCanRead = (event: SelectChangeEvent) => {
        setCanRead(event.target.value as string);
    };

    const changeAge = (event: ChangeEvent<HTMLInputElement>) => {
        setAge(+event.target.value as number);
    };

    return (
        <>
            <Title variant='h4'>{'מעט פרטים על מקבל השירות'}</Title>
            <Title variant='h4'>{gender}</Title>
            <FormControl sx={{ direction: 'rtl', paddingTop: '2vh' }}>
                <TextField
                    id="age-select"
                    label="גיל"
                    type="number"
                    required
                    value={age}
                    onChange={changeAge}
                    error={age < MIN_AGE}
                    helperText={age< MIN_AGE ? `לא ניתן לבצע את הסקר מתחת לגיל ${MIN_AGE}`: ''}
                />
                <FormLabel id="gender-label">מין</FormLabel>
                <RadioGroup
                    aria-labelledby="gender-label"
                    name="gender-select"    
                    row
                    value={gender}
                    onChange={changeGender}
                >
                    {Object.values(GenderEnum).map((value, index) => (
                        <FormControlLabel key={index} value={GenderEnum[value]} control={<Radio />} label={value} />
                    )) 
                    }
                </RadioGroup>
                <FormLabel id="can-read-label">האם יודע/ת לקרוא</FormLabel>
                <Select
                    labelId="can-read-label"
                    id="can-read-select"
                    required
                    value={canRead}
                    label="האם יודע/ת לקרוא"
                    onChange={changeCanRead}
                >
                    <MenuItem value={'yes'}>כן</MenuItem>
                    <MenuItem value={'no'}>לא</MenuItem>
                    <MenuItem value={'some'}>מעט</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default SelfInfoForm
