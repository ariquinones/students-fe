import React, {useState } from 'react';

interface NewStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, grade: number) => void;
  }
  
export const NewStudentModal: React.FC<NewStudentModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim() && grade.trim()) {
        const gradeNumber = parseInt(grade);
        if (!isNaN(gradeNumber) && gradeNumber >= 0 && gradeNumber <= 100) {
          onSubmit(name.trim(), gradeNumber);
          setName('');
          setGrade('');
          onClose();
        }
      }
    };
  
    const handleClose = () => {
      setName('');
      setGrade('');
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Student</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="studentName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter student name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="studentGrade" className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <input
                type="number"
                id="studentGrade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter grade (0-100)"
                min="0"
                max="100"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };