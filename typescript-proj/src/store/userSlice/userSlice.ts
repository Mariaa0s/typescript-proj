import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    token: string | null;
    name: string;
    last_name: string;
    email: string;
    avatar: string;
}

const initialState: UserState = {
    token: null,
    name: '',
    last_name: '',
    email: '',
    avatar: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
