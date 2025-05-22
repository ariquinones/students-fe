import React from 'react';
import { Student } from '../services/studentApi';

// Table component props interface
interface StudentTableProps {
    students: Student[];
    onDelete: (id: number) => void;
    isLoading: boolean;
  }

// Reusable Student Table Component
export const StudentTable: React.FC<StudentTableProps> = ({ students, onDelete, isLoading }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => onDelete(student.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  x Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No students found
          </div>
        )}
        {
            isLoading && (
                <div className="text-center py-8 text-gray-500">
                Loading your students...
                </div>
            )
        }
      </div>
    );
  };