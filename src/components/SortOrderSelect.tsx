import  { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';

const StyledDropDown = styled(FormControl)(({ theme }) => ({
    display: 'flex',
    minWidth: theme.spacing(12),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
}));

interface SortOrderSelectProps {
    direction: number;
    toggleSort: () => void;
}

const SortOrderSelect: FC<SortOrderSelectProps> = ({direction, toggleSort}) => {
   
    return (
        <StyledDropDown variant="outlined">
            <InputLabel id="order-label">Order</InputLabel>
            <Select value={direction} onChange={toggleSort} label="Order" labelId="order-label">
                <MenuItem value={1}>A-Z</MenuItem>
                <MenuItem value={-1}>Z-A</MenuItem>
            </Select>
        </StyledDropDown>
    );
};

export default SortOrderSelect;