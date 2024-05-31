import React from 'react';
import styles from "./SearchBar.module.css";
import searchImg from '../../assets/search.png'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearUser} from "../../store/userSlice/userSlice.ts";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const dispatch = useDispatch()
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };
    const navigate = useNavigate()

    const handleClickProfile = () => {
        navigate(`/profile`)
    }

    return <section className={styles.userProfileSection}>
        <div className={styles.flexRow}>
            <div className={styles.contentBox}>
                <div className={styles.flexRow1}>
                    <img
                        className={styles.searchImage}
                        src={searchImg}
                        alt="alt text"
                    />
                    <input className={styles.searchTitle} type="text" placeholder="Поиск" onChange={handleSearch}/>
                </div>
            </div>

            <button className={styles.profileTitle} onClick={handleClickProfile}>Профиль</button>
            <button className={styles.logoutTitle} onClick={() => {
                dispatch(clearUser())
                localStorage.removeItem('user')
                navigate('/register')
            }}>Выйти</button>
        </div>
    </section>
};

export default SearchBar;
