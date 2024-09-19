import apiSlice from "../../../api/apiSlice";

// imports................................................................

const adApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewad: builder.mutation({
            query: (credentials) => ({
                url: '/restaurant/ads',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Single-Restaurant', 'Ads']
        }),
        deleteAd: builder.mutation({
            query: (id) => ({
                url: `/restaurant/ads/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Single-Restaurant', 'Ads']
        })
    })
})

export const {
    useAddNewadMutation,
    useDeleteAdMutation
} = adApiSlice