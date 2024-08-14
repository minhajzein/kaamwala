import apiSlice from "../../../api/apiSlice";

// imports................................................................

const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCategories: builder.query({
            query: () => ({
                url: '/job-category',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            providesTags: ['Job-Category']
        }),
        addJobCategory: builder.mutation({
            query: (credentials) => ({
                url: 'job-category',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Job-Category']
        }),
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `/job-category/${id}`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            })
        }),
        editJobCategory: builder.mutation({
            query: (id, credentials) => ({
                url: `/job-category/${id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Job-Category']
        })
    })
})

export const {
    useGetAllCategoriesQuery,
    useAddJobCategoryMutation,
    useEditJobCategoryMutation,
    useGetSingleCategoryQuery
} = categoryApiSlice