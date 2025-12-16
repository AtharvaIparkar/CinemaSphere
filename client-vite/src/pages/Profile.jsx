import React from 'react';
import { UserProfile, useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome back, {user?.firstName || 'Movie Lover'}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">∞</div>
              <h3 className="text-white font-semibold">Movies Available</h3>
              <p className="text-gray-400 text-sm">Unlimited streaming</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">HD</div>
              <h3 className="text-white font-semibold">Quality</h3>
              <p className="text-gray-400 text-sm">High definition</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">4</div>
              <h3 className="text-white font-semibold">Servers</h3>
              <p className="text-gray-400 text-sm">Multiple options</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-gray-800 border-gray-700",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-gray-700 border-gray-600 text-white hover:bg-gray-600",
                formButtonPrimary: "bg-red-600 hover:bg-red-700",
                footerActionLink: "text-red-400 hover:text-red-300"
              },
              variables: {
                colorPrimary: "#dc2626",
                colorBackground: "#1f2937",
                colorInputBackground: "#374151",
                colorInputText: "#ffffff"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;