import React from 'react';

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
    return (
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default Pagination;
