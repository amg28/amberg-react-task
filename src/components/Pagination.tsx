import { FC } from 'react';
import { Box, Button } from '@mui/material';

interface PaginationProps {
    loadPrev: () => void;
    loadNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

const Pagination: FC<PaginationProps> = ({ loadPrev, loadNext, hasPrev, hasNext }) => {
    return (
        <Box display="flex" justifyContent="space-evenly" mt={2}>
            <Button variant="contained" onClick={loadPrev} disabled={!hasPrev}>
                Previous
            </Button>
            <Button variant="contained" onClick={loadNext} disabled={!hasNext}>
                Next
            </Button>
        </Box>
    );
};

export default Pagination;