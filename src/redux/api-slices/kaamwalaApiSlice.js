import apiSlice from '../../api/apiSlice'

// imports...................................................

const kaamwalaApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllEmployeesInWeb: builder.query({
            query: () => ({
                url: '/web-employees',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        }),
        getAllAds: builder.query({
            query: () => ({
                url: '/restaurant/ads',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        }),
        getOneAd: builder.query({
            query: (id) => ({
                url: `/restaurant/ads/${id}`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        }),
        getAdsLocationWise: builder.query({
            query: (location) => ({
                url: `/restaurant/ads/location/${location}`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const {
    useGetAllEmployeesInWebQuery,
    useGetAllAdsQuery,
    useGetOneAdQuery,
    useGetAdsLocationWiseQuery
} = kaamwalaApiSlice