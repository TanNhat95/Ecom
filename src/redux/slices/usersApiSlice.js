import { apiSlice } from './apiSlice'
const USERS_URL = 'http://localhost:8080/api/user'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        registerFnc: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterFncMutation } = usersApiSlice