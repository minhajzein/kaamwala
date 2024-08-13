import apiSlice from "../../../api/apiSlice";

// imports................................................................

const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDashboardData: builder.query({
            query: () => ({
                url: '/dashboard',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            providesTags: ['Dashboard']
        })
    })
})

export const { useGetDashboardDataQuery } = dashboardApiSlice