import apiSlice from "../../../api/apiSlice";

// imports.........................................

const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        areaManagerProfile: builder.query({
            query: () => ({
                url: '/areamanager-profile',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            providesTags: ['Profile']
        })
    })
})

export const { useAreaManagerProfileQuery } = profileApiSlice