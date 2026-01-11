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
    <div className="min-h-screen bg-black text-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        currentUser={currentUser}
        unreadMessages={8}
        unreadNotifications={3}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen px-6 pt-8 pb-16 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
