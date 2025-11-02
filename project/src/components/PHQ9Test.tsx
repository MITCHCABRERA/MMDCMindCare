import React, { useState } from "react";
import PHQ9Modal from "../components/PHQ9Modal"; // adjust path if needed


const PHQ9Test: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (answers: number[], score: number) => {
    console.log("Answers:", answers);
    console.log("Total Score:", score);
    alert(`Total PHQ-9 Score: ${score}`);
    setOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">PHQ-9 Modal Test</h1>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open PHQ-9 Modal
      </button>

      <PHQ9Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PHQ9Test;
