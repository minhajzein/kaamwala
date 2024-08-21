import apiSlice from "../../../api/apiSlice";

// imports................................................................

const managerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllAreaManagers: builder.query({
            query: () => ({
                url: '/area-manager',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Area-Managers']
        }),

        getSingleAreaManager: builder.query({
            query: (id) => ({
                url: `/area-manager/${id}`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        }),
        addAreaManager: builder.mutation({
            query: (credentials) => ({
                url: 'area-manager',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Area-Managers']
        }),
        editAreaManager: builder.mutation({
            query: (data) => ({
                url: `/area-manager/${data.id}`,
                method: 'PUT',
                body: { ...data.credentials }
            }),
            invalidatesTags: ['Area-Managers']
        })
    })
})

export const {
    useGetAllAreaManagersQuery,
    useAddAreaManagerMutation,
    useEditAreaManagerMutation,
    useGetSingleAreaManagerQuery
} = managerApiSlice