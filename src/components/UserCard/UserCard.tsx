import React from 'react';
import { useNavigate } from 'react-router-dom';
import {User} from "../../pages/MainPage/HomePage.tsx";
import styles from './UserCard.module.css'

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.gridItem} onClick={() => navigate(`/user/${user.id}`)}>
            <img
                className={styles.avatarImage}
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
            />
            <h4 className={styles.itemHeader}>
                {user.first_name} {user.last_name} <br/>
                {user.email}
            </h4>
        </div>
)
    ;
};

export default UserCard;
