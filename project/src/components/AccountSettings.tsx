import React, { useState } from "react";
import { ArrowLeft, Settings, User, Mail, Lock, Bell,} from "lucide-react";
import { useNavigate } from "react-router-dom";


const AccountSettings = () => {
  const navigate = useNavigate();

  // Profile state
    const [displayName] = useState("Maria Santos");
    const [email] = useState("MariaSantos@mmdc.com");
    const [profilePic] = useState<string | null>(
  "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400" );


  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Notifications state
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(true);

  // Handle password change (mock)
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
    } else if (!currentPassword || !newPassword) {
      setPasswordMessage("Fill in all password fields.");
    } else {
      setPasswordMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };


  // Handle notifications save (mock)
  const handleNotifSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Notification preferences updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-2">
              <Settings className="w-7 h-7 text-gray-600" />
              <span className="font-bold text-lg text-gray-700">Account Settings</span>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

            <form className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Profile</h2>
        </div>
        <div className="flex items-center gap-5 mb-4">
            <img
            src={profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName)}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
            />
            <input
            type="text"
            className="border border-gray-200 rounded-lg px-3 py-2 w-1/2 text-gray-700 font-medium bg-gray-100 cursor-not-allowed"
            value={displayName}
            readOnly
            placeholder="Display name"
            />
        </div>
        <div>
            <label className="block font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Mail className="w-4 h-4" />
            Email Address
            </label>
            <input
            type="email"
            className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
            value={email}
            readOnly
            placeholder="youremail@example.com"
            />
        </div>
        </form>

        {/* Password Card */}
        <form onSubmit={handleChangePassword} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Current password"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="New password"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm new password"
            />
          </div>
          {passwordMessage && (
            <div className={`text-sm ${passwordMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>{passwordMessage}</div>
          )}
          <div className="flex justify-end">
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow">
              Change Password
            </button>
          </div>
        </form>

        {/* Notifications Card */}
        <form onSubmit={handleNotifSave} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">Email Notifications</label>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">App Notifications</label>
            <input
              type="checkbox"
              checked={appNotif}
              onChange={() => setAppNotif(!appNotif)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-semibold shadow">
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
