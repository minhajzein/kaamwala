import apiSlice from "../../../api/apiSlice";

// imports................................................................. 

const restaurantApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllRestaurants: builder.query({
            query: () => ({
                url: '/restaurants',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Restaurants']
        }),
        addRestaurant: builder.mutation({
            query: (credentials) => ({
                url: '/restaurants',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Restaurants']
        }),
        getSingleRestaurant: builder.query({
            query: (id) => ({
                url: `/restaurants/${id}`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        }),
        editRestaurant: builder.mutation({
            query: (data) => ({
                url: `/restaurants/${data.id}`,
                method: 'PUT',
                body: { ...data.credentials }
            }),
            invalidatesTags: ['Restaurants']
        })
    })
})

export const {
    useGetAllRestaurantsQuery,
    useAddRestaurantMutation,
    useEditRestaurantMutation,
    useGetSingleRestaurantQuery
} = restaurantApiSlice