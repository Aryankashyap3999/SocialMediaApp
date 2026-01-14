import React, { useState } from 'react';
import { Sidebar } from '@components/organisms/Sidebar';
import { useModalStore } from '@/store/useModalStore';

export interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout
 * Main app layout with sidebar navigation like Instagram
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCollapsed] = useState(false);
  const { openModal } = useModalStore();

  // Mock current user - replace with actual auth context
  const currentUser = {
    name: 'Aryan Kashyap',
    username: 'aryankashyap',
    avatarUrl: 'https://i.pravatar.cc/150?u=aryan',
  };

  // Handle "Launch a Drop" button click
  const handleCreateClick = () => {
    openModal('createPost'); // Opens the CreateDropModal
  };

  return (
    <div className="h-screen bg-black text-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        currentUser={currentUser}
        unreadMessages={8}
        unreadNotifications={3}
        onCreateClick={handleCreateClick}
      />

      {/* Main Content - this is the scroll container */}
      <main className="flex-1 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
