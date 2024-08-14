import apiSlice from "../../../api/apiSlice";

// imports................................................................

const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllEmployess: builder.query({
            query: () => ({
                url: '/employee',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Employees']
        }),
        getSingleEmployee: builder.query({
            query: (id) => ({
                url: `/employee/${id}`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const { useGetAllEmployessQuery, useGetSingleEmployeeQuery } = employeeApiSlice

