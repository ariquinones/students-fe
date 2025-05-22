import React, { useState } from 'react';
import { CreateStudentRequest, Student, useCreateStudentMutation, useDeleteStudentMutation, useGetStudentsQuery } from './services/studentApi';
import { StudentTable } from './components/studentTable';
import { NewStudentModal } from './components/studentModal';

const App: React.FC = () => {
  const { data: apiStudents, isLoading }  = useGetStudentsQuery();
  const [createStudent] = useCreateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [students, setStudents] = useState<Student[]>([]);

  React.useEffect(() => {
    if (apiStudents) {
      setStudents(apiStudents);
    }
  }, [apiStudents]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnCreate = async (name: string, grade: number) => {
    const newStudent: CreateStudentRequest = {
      name,
      grade
    };
    await createStudent(newStudent);
  };

  const handleOnDelete = async (id: number) => {
    await deleteStudent(id);
    setStudents(students.filter(student => student.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Student Management System
          </h1>
          <p className="text-gray-600 text-center mt-2">
            View and manage your students
          </p>
        </header>
        
        <main>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Students ({students.length})
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                + New
              </button>
            </div>
            
            <StudentTable students={students} onDelete={handleOnDelete} isLoading={isLoading}/>
          </div>
        </main>
        
        <NewStudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleOnCreate}
        />
      </div>
    </div>
  );
};

export default App;