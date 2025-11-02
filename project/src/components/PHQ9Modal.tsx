import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface PHQ9ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (responses: number[], totalScore: number) => void;
}

const PHQ9Modal: React.FC<PHQ9ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading or watching television",
    "Moving or speaking so slowly that other people could have noticed — or the opposite, being so fidgety or restless that you have been moving a lot more than usual",
    "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way"
  ];

  const choices = [
    { label: "Not at all", value: 0 },
    { label: "Several days", value: 1 },
    { label: "More than half the days", value: 2 },
    { label: "Nearly every day", value: 3 },
  ];

  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(-1));

  const handleChange = (index: number, value: number) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleSubmit = () => {
    if (responses.includes(-1)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const totalScore = responses.reduce((sum, val) => sum + val, 0);
    onSubmit(responses, totalScore);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-gray-800">PHQ-9 Depression Assessment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Questions */}
        <div className="p-6 space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="border-b pb-4">
              <p className="font-medium text-gray-800 mb-3">
                {index + 1}. {question}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {choices.map((choice) => (
                  <label
                    key={choice.value}
                    className={`flex items-center justify-center border rounded-lg py-2 px-3 cursor-pointer text-sm transition-colors ${
                      responses[index] === choice.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={choice.value}
                      checked={responses[index] === choice.value}
                      onChange={() => handleChange(index, choice.value)}
                      className="hidden"
                    />
                    {choice.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end space-x-3 bg-white sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PHQ9Modal;
