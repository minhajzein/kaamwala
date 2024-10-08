import apiSlice from "../../../api/apiSlice";

// imoprts................................................................

const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllEmployeesUnderAreaManager: builder.query({
            query: () => ({
                url: `/areamanager/employee`,
                validateStatus: (response) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Employees']
        }),
        addEmployee: builder.mutation({
            query: (credentials) => ({
                url: '/areamanager/employee',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Employees']
        }),
        editEmployee: builder.mutation({
            query: (data) => ({
                url: `/areamanager/employee/${data.id}`,
                method: 'PUT',
                body: { ...data.credentials }
            }),
            invalidatesTags: ['Employees']
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/areamanager/employee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employees']
        }),
        getSingleEmployeeUnderAreaManager: builder.query({
            query: (id) => ({
                url: `/areamanager/employee/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Employee']
        }),
        addExperience: builder.mutation({
            query: (data) => ({
                url: `/areamanager/employee-experience/${data.id}`,
                method: 'POST',
                body: { ...data.credentials }
            }),
            invalidatesTags: ['Employee']
        }),

        editEmployeeExperience: builder.mutation({
            query: (data) => ({
                url: `/employee-experience/${data.id}`,
                method: 'PUT',
                body: { ...data.credentials }
            }),
            invalidatesTags: ['Employee']
        }),
        deleteExperience: builder.mutation({
            query: (id) => ({
                url: `/employee-experience/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Employee']
        })
    })
})

export const {
    useGetAllEmployeesUnderAreaManagerQuery,
    useGetSingleEmployeeUnderAreaManagerQuery,
    useAddEmployeeMutation,
    useEditEmployeeMutation,
    useAddExperienceMutation,
    useDeleteEmployeeMutation,
    useDeleteExperienceMutation,
    useEditEmployeeExperienceMutation
} = employeeApiSlice