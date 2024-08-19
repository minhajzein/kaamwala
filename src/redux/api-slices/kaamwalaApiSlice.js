import apiSlice from '../../api/apiSlice'

// imports...................................................

const kaamwalaApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllEmployees: builder.query({
            query: () => ({
                url: '/web-employees',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const { useGetAllEmployeesQuery } = kaamwalaApiSlice