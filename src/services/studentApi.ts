import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Student interface
export interface Student {
  id: number;
  name: string;
  grade: number;
}

// Create student request interface
export interface CreateStudentRequest {
  name: string;
  grade: number;
}

// Define our API service
export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080', // Adjust this to match your API base URL
    prepareHeaders: (headers) => {
      // Add any authentication headers here if needed
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    // Get all students
    getStudents: builder.query<Student[], void>({
      query: () => 'students',
      providesTags: ['Student'],
    }),
    // Create a new student
    createStudent: builder.mutation<Student, CreateStudentRequest>({
      query: (newStudent) => ({
        url: 'students',
        method: 'POST',
        body: newStudent,
      }),
      invalidatesTags: ['Student'],
    }),
    // Update a student (optional)
    updateStudent: builder.mutation<Student, { id: number; updates: Partial<CreateStudentRequest> }>({
      query: ({ id, updates }) => ({
        url: `students/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Student'],
    }),
    // Delete a student (optional)
    deleteStudent: builder.mutation<void, number>({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;