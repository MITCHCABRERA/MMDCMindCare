const SessionProgress = ({
  session,
  completedSessions,
  watchSeconds,
}: {
  session: any;
  completedSessions: Record<string | number, number>;
  watchSeconds: number;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Progress</h3>
      <div className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-gray-800">{completedSessions[session.id] || 0}</div>
          <div className="text-sm text-gray-600">Times Completed</div>
          <div className="text-xs text-gray-500 mt-2">
            {watchSeconds === -1 ? "Completed" : `Watched: ${watchSeconds}s`}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Category</span>
            <span className="text-sm font-medium text-gray-800">{session.category}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Duration</span>
            <span className="text-sm font-medium text-gray-800">{session.duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Difficulty</span>
            <span className="text-sm font-medium text-gray-800">{session.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionProgress;
