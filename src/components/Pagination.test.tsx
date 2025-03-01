import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
    it('renders Previous and Next buttons', () => {
        render(<Pagination loadPrev={() => {}} loadNext={() => {}} hasPrev={true} hasNext={true} />);
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('calls loadPrev when Previous button is clicked', () => {
        const loadPrev = vi.fn();
        render(<Pagination loadPrev={loadPrev} loadNext={() => {}} hasPrev={true} hasNext={true} />);
        fireEvent.click(screen.getByText('Previous'));
        expect(loadPrev).toHaveBeenCalled();
    });

    it('calls loadNext when Next button is clicked', () => {
        const loadNext = vi.fn();
        render(<Pagination loadPrev={() => {}} loadNext={loadNext} hasPrev={true} hasNext={true} />);
        fireEvent.click(screen.getByText('Next'));
        expect(loadNext).toHaveBeenCalled();
    });

    it('disables Previous button when hasPrev is false', () => {
        render(<Pagination loadPrev={() => {}} loadNext={() => {}} hasPrev={false} hasNext={true} />);
        expect(screen.getByText('Previous')).toBeDisabled();
    });

    it('disables Next button when hasNext is false', () => {
        render(<Pagination loadPrev={() => {}} loadNext={() => {}} hasPrev={true} hasNext={false} />);
        expect(screen.getByText('Next')).toBeDisabled();
    });
});