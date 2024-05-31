import React from 'react';

interface FiltersProps {
    onFilter: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
    const handleFilter = (filter: string) => () => {
        onFilter(filter);
    };

    return (
        <div>
            <button onClick={handleFilter('all')}>All IDs</button>
            <button onClick={handleFilter('even')}>Even IDs</button>
            <button onClick={handleFilter('odd')}>Odd IDs</button>
        </div>
    );
};

export default Filters;
