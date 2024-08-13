import { createSlice } from "@reduxjs/toolkit";

// imports................................................................................................

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        sendLogout: (state) => {
            state.token = null
        }
    }
})

export const { setCredentials, sendLogout } = authSlice.actions

export default authSlice.reducer