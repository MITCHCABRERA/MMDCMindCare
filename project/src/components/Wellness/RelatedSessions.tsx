const RelatedSessions = ({
  currentSession,
  wellnessPrograms,
  onSelect,
}: {
  currentSession: any;
  wellnessPrograms: any[];
  onSelect: (program: any) => void;
}) => {
  const related = wellnessPrograms
    .filter((p) => p.category === currentSession.category && p.id !== currentSession.id)
    .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Sessions</h3>
      <div className="space-y-3">
        {related.map((program) => (
          <button
            key={program.id}
            onClick={() => onSelect(program)}
            className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${program.color} rounded-lg flex items-center justify-center`}>
                <program.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{program.title}</p>
                <p className="text-xs text-gray-500">{program.duration}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelatedSessions;
