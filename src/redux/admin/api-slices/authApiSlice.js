import apiSlice from "../../../api/apiSlice";

// imports................................................................................................

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                body: { ...credentials },
                method: 'POST',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            invalidatesTags: ['User']
        })
    })
})


export const { useLoginMutation } = authApiSlice