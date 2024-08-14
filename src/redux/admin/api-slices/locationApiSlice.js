import apiSlice from "../../../api/apiSlice";

// imports................................................................

const locationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllLocations: builder.query({
            query: () => ({
                url: '/locations',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Locations']
        }),
        addLocation: builder.mutation({
            query: (credentials) => ({
                url: '/locations',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Locations']
        }),
        editLocation: builder.mutation({
            query: (id, credentials) => ({
                url: `/locations/${id}`,
                method: 'PUT',
                body: {
                    ...credentials
                },
            }),
            invalidatesTags: ['Locations']
        }),
        getSingleLocation: builder.query({
            query: (id) => ({
                url: `/locations/${id}`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {
    useAddLocationMutation,
    useGetAllLocationsQuery,
    useEditLocationMutation,
    useGetSingleLocationQuery
} = locationApiSlice