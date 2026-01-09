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
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        currentUser={currentUser}
        unreadMessages={8}
        unreadNotifications={3}
      />

      {/* Main Content */}
      <main
        className={`
          min-h-screen transition-all duration-300
          ${isCollapsed ? 'ml-18' : 'ml-61.25 xl:ml-83.75'}
        `}
      >
        {children}
      </main>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
