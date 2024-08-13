import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from '../config/baseUrl'

// imports................................................................................................

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "same-origin",
    timeout: 15000,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Accept', 'application/json');
        headers.set('Cache-Control', 'no-cache');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        const token = JSON.parse(localStorage.getItem('kaamwala-token'))
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})


const apiSlice = createApi({
    reducerPath: 'apiService',
    baseQuery: baseQuery,
    tagTypes: ['Dashboard', 'User', 'Locations', 'Job-Category', 'Area-Managers'],
    endpoints: builder => ({})
})


export default apiSlice

