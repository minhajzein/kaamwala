import apiSlice from "../../../api/apiSlice";

// imports.........................................

const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        areaManagerProfile: builder.query({
            query: () => ({
                url: '/manager-profile',
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            providesTags: ['Profile']
        }),

        updateAreaManagerProfile: builder.mutation({
            query: (credentials) => ({
                url: '/manager-profile',
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Profile']
        })

    })
})

export const { useAreaManagerProfileQuery, useUpdateAreaManagerProfileMutation } = profileApiSlice