import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './RegisterPage.module.css'

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('Eve');
    const [last_name, setLast_name] = useState('Holt')
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('pistol');
    const [avatar, setAvatar] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv06bVLGqNwBDIXmauVSCT4ZelptDnRazmQ&s');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://reqres.in/api/register', {
                first_name: name,
                last_name: last_name,
                email: email,
                password: password,
            });
            const token = response.data.token;
            localStorage.setItem('user', JSON.stringify({ name, email, avatar, token }));
            dispatch(setUser({ name, last_name, email, avatar, token }));
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.registrationSection}>
            <form onSubmit={e => handleRegister(e)} className={styles.box}>
                <div className={styles.flexCol}>
                    <h1 className={styles.titleBox_box}>
                        Register
                    </h1>
                    <span className={styles.titleBox_span}/>
                    <div className={styles.flexRow}>
                        <div className={styles.flexCol1}>
                            <input className={styles.flexCol2}
                                   type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name"
                                   required/>
                            <input className={styles.flexCol2}
                                   type="text" value={last_name} onChange={e => setLast_name(e.target.value)}
                                   placeholder="Last name" required/>
                            <input className={styles.flexCol2}
                                   type="text" value={avatar} onChange={e => setAvatar(e.target.value)}
                                   placeholder="Avatar URL"
                                   required/>
                        </div>
                        <div className={styles.flexCol3}>
                            <input className={styles.flexCol2}
                                   type="email" value={email} onChange={e => setEmail(e.target.value)}
                                   placeholder="Email"
                                   required/>
                            <input className={styles.flexCol2}
                                   type="password" value={password} onChange={e => setPassword(e.target.value)}
                                   placeholder="Password" required/>
                        </div>
                    </div>
                    <button className={styles.registerButton} type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
