import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import styles from "../UserPage/UserPage.module.css";
import {setUser, UserState} from "../../store/userSlice/userSlice.ts";

type InputConfig = {
    placeholder: string,
    type: string,
    field: keyof UserState,
    label: string
}

const ProfilePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isChange, setIsChange] = useState(false)
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        dispatch(setUser({...user, [e.target.name] : e.target.value}))
    }
    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsChange(!isChange);
    };
    
    const inputs : InputConfig[] = [
        {
            placeholder:'Name',
            field: "name",
            label: 'Имя',
            type: 'text',
        },
        {
            placeholder:'Surname',
            field: "last_name",
            label: 'Фамилия',
            type: 'text',
        },
        {
            placeholder:'email',
            field: "email",
            label: 'E-mail',
            type: 'email',
        },
        {
            placeholder:'Avatar URL',
            field: "avatar",
            label: 'Ссылка на фото',
            type: 'url',
        },
    ]
    return <>
        <form className={styles.profileSection} >
            <div className={styles.flexColumn}>
                <h2 className={styles.mediumTitle}>Профиль {user.last_name} {user.name}</h2>

                <div className={styles.contentBox}>
                    <div className={styles.flexColumnContent}>
                        <div className={styles.flexRowContent}>
                            <div className={styles.flexColumnDetails}>
                                {inputs.map((inp) => <>
                                    <label className={styles.subtitleLastName} htmlFor={inp.field}>{inp.label}</label>
                                    <input
                                        className={styles.rectLastName}
                                        onChange={handleChange}
                                        type={inp.type}
                                        name={inp.field}
                                        placeholder={inp.placeholder}
                                        value={user[inp.field]}
                                        disabled={!isChange}/>
                                </>)}
                            </div>

                            <div className={styles.flexColumnActions}>
                                {isChange ? <button onClick={handleEdit} className={styles.editButton}>Сохранить</button> :
                                    <button onClick={handleEdit} className={styles.editButton}>Изменить</button>}
                                <img
                                    className={styles.profileImage}
                                    src={user.avatar}
                                    alt={`${user.name}'s avatar`}
                                />
                            </div>
                        </div>

                        <button onClick={() => navigate('/')} className={styles.backButton}>Back</button>
                    </div>
                </div>
            </div>
        </form>
    </>
};

export default ProfilePage;
