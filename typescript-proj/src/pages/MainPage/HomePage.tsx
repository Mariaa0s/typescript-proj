import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import UserCard from '../../components/UserCard/UserCard.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import Filters from '../../components/Filters/Filters.tsx';
import styles from './HomePage.module.css'

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}


const HomePage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get(`https://reqres.in/api/users?page=${page}&per_page=6`)
            .then(response => {
                setUsers(response.data.data);
            });
    }, [page]);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.first_name.toLowerCase().includes(search.toLowerCase()) ||
                user.last_name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());

            const matchesFilter = filter === 'all' ||
                (filter === 'even' && user.id % 2 === 0) ||
                (filter === 'odd' && user.id % 2 !== 0);

            return matchesSearch && matchesFilter;
        });
    }, [users, search, filter]);

    return <div className={styles.main}>
        <SearchBar onSearch={setSearch}/>
        <hr className={styles.separatorLine} />
        <Filters onFilter={setFilter}/> <br/>
        <section className={styles.profileGallerySection}>
            <div className={styles.layoutColumn}>
                <div className={styles.contentColumn}>
                    <div className={styles.itemGrid}>
                        {filteredUsers.map(user => (
                            <UserCard key={user.id} user={user}/>
                        ))}
                    </div>
                    <Pagination page={page} setPage={setPage}/>
                </div>
            </div>
        </section>
    </div>;
};

export default HomePage;
