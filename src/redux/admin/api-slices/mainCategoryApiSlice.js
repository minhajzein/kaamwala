import apiSlice from "../../../api/apiSlice";

// imports................................................................

const mainCategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllMainCategories: builder.query({
            query: () => ({
                url: '/main-job-category',
                validateStatus: (response) => {
                    return response.status === 200
                },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Main-Categories']
        }),
        addMainCategory: builder.mutation({
            query: (credentials) => ({
                url: '/main-job-category',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Main-Categories']
        }),
        editMainCategory: builder.mutation({
            query: (data) => ({
                url: `/main-job-category/${data.id}`,
                method: 'PUT',
                body: { ...data.credentials }
            }),
            invalidatesTags: ['Main-Categories']
        })
    })
})


export const {
    useGetAllMainCategoriesQuery,
    useAddMainCategoryMutation,
    useEditMainCategoryMutation
} = mainCategoryApiSlice