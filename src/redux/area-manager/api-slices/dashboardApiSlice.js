import apiSlice from "../../../api/apiSlice";

// imports................................................................

const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getManagerDashboardData: builder.query({
            query: () => ({
                url: '/manager-dashboard',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            providesTags: ['Dashboard']
        })
    })
})

export const { useGetManagerDashboardDataQuery } = dashboardApiSlice