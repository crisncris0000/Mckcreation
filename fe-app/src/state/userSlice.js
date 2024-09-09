import { createSlice } from "@reduxjs/toolkit";

const user = {
    id: null,
    email: '',
    role: '',
    expiredAt: ''
}

const initialState = {
    value: user
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;                
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer