import apiSlice from "../../../api/apiSlice";

// imports................................................................

const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllEmployees: builder.query({
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
                validateStatus: (response, result) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const { useGetAllEmployeesQuery, useGetSingleEmployeeQuery } = employeeApiSlice

