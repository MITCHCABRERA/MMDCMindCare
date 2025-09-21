// // import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Brain, 
//   User, 
//   Lock, 
//   ArrowRight,
//   Stethoscope,
//   Shield
// } from 'lucide-react';

// const DoctorLogin = () => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate login process
//     setTimeout(() => {
//       // Store doctor session
//       localStorage.setItem('doctor-session', JSON.stringify({
//         id: 'doc-001',
//         name: 'Dr. Maria Santos',
//         email: credentials.email,
//         role: 'doctor',
//         loginTime: new Date().toISOString()
//       }));
      
//       navigate('/doctor-panel');
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//             <Stethoscope className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctor Portal</h1>
//           <p className="text-gray-600">MMCD MindCare Professional Access</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Professional Email
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   required
//                   value={credentials.email}
//                   onChange={(e) => setCredentials({...credentials, email: e.target.value})}
//                   placeholder="doctor@mmdc.edu.ph"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   required
//                   value={credentials.password}
//                   onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Signing In...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Sign In</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </form>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <div className="flex items-center space-x-2 text-sm text-gray-600">
//               <Shield className="w-4 h-4" />
//               <span>Secure professional access portal</span>
//             </div>
//           </div>
//         </div>

//         {/* Back to Student Portal */}
//         <div className="text-center mt-6">
//           <button
//             onClick={() => navigate('/')}
//             className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//           >
//             ← Back to Student Portal
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorLogin;