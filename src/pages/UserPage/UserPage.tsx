import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './UserPage.module.css'

type User = {
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
}

type InputConfig = {
    placeholder: string,
    type: string,
    field: keyof User,
    label: string
}

const UserPage: React.FC = () => {
    const [isChange, setIsChange] = useState(false)
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
    });
    const inputs : InputConfig[] = [
        {
            placeholder:'Name',
            field: "first_name",
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

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`)
            .then(response => {
                setUser(response.data.data);
            });
    }, [id]);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axios.patch(`https://reqres.in/api/users/${id}`, {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar,
            });
            setIsChange(!isChange);
        } catch (error) {
            console.error(error);
        }
    }
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setUser({...user, [e.target.name] : e.target.value})
    }
    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsChange(!isChange);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return <>
        <form className={styles.profileSection} onSubmit={e => handleSubmit(e)}>
            <div className={styles.flexColumn}>
                <h2 className={styles.mediumTitle}>Профиль {user.last_name} {user.first_name}</h2>

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
                                        value={user[inp.field]} disabled={!isChange}/>
                                </>)}
                            </div>

                            <div className={styles.flexColumnActions}>
                                {isChange ? <button type='submit' onClick={handleEdit} className={styles.editButton}>Сохранить</button> :
                                    <button onClick={handleEdit} className={styles.editButton}>Изменить</button>}
                                <img
                                    className={styles.profileImage}
                                    src={user.avatar}
                                    alt={`${user.first_name}'s avatar`}
                                />
                            </div>
                        </div>

                        <button onClick={() => navigate(-1)} className={styles.backButton}>Back</button>
                    </div>
                </div>
            </div>
        </form>
    </>
};

export default UserPage;
