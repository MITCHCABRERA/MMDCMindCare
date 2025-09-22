import React from 'react';
import { Clock } from 'lucide-react';

interface Activity {
  action: string;
  time: string;
  icon: any;
}

interface Props {
  activities: Activity[];
}

const RecentActivity: React.FC<Props> = ({ activities }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <Clock className="w-5 h-5 mr-2 text-gray-600" /> Recent Activity
    </h3>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <activity.icon className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800">{activity.action}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivity;
