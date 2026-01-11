import React, { useState } from 'react';
import { Sidebar } from '@components/organisms/Sidebar';

export interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout
 * Main app layout with sidebar navigation like Instagram
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCollapsed] = useState(false);

  // Mock current user - replace with actual auth context
  const currentUser = {
    name: 'Aryan Kashyap',
    avatarUrl: undefined,
  };

  return (
    <div className="h-screen bg-black text-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        currentUser={currentUser}
        unreadMessages={8}
        unreadNotifications={3}
      />

      {/* Main Content - this is the scroll container */}
      <main className="flex-1 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
