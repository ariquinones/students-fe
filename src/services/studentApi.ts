import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Student {
  id: number;
  name: string;
  grade: number;
}

export interface CreateStudentRequest {
  name: string;
  grade: number;
}

// Define our API service
export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => 'students',
      providesTags: ['Student'],
    }),
    createStudent: builder.mutation<Student, CreateStudentRequest>({
      query: (newStudent) => ({
        url: 'students',
        method: 'POST',
        body: newStudent,
      }),
      invalidatesTags: ['Student'],
    }),
    updateStudent: builder.mutation<Student, { id: number; updates: Partial<CreateStudentRequest> }>({
      query: ({ id, updates }) => ({
        url: `students/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Student'],
    }),
    deleteStudent: builder.mutation<void, number>({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;