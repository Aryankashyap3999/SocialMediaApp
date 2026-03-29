import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '@components/organisms/Sidebar';
import { MobileBottomNav } from '../organisms';
import { useModalStore } from '@/store/useModalStore';
import { useAuth } from '@/hooks/context/useAuth';
import { useUnreadCount } from '@/hooks';

export interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout
 * Main app layout with sidebar navigation like Instagram
 * Fully responsive: desktop sidebar + mobile bottom navigation
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isCollapsed] = useState(false);
  const { openModal } = useModalStore();
  const location = useLocation();
  const { auth } = useAuth();
  const { data: unreadCountData } = useUnreadCount();

  const currentUser = auth.user
    ? { name: auth.user.name ?? auth.user.username, username: auth.user.username, avatarUrl: auth.user.avatarUrl }
    : { name: 'Guest', username: 'guest', avatarUrl: undefined };

  const unreadNotifications = unreadCountData?.data?.count ?? 0;

  // Handle "Launch a Drop" button click
  const handleCreateClick = () => {
    openModal('createPost', { source: 'sidebar' }); // Opens the CreateDropModal with context
  };

  return (
    <div className="min-h-dvh bg-[#0e0805] text-gray-100 flex">
      {/* Sidebar - Hidden on mobile/tablet, visible on lg and above */}
      <div className="hidden lg:block shrink-0">
        <Sidebar
          isCollapsed={isCollapsed}
          currentUser={currentUser}
          unreadMessages={0}
          unreadNotifications={unreadNotifications}
          onCreateClick={handleCreateClick}
        />
      </div>

      {/* Main Content - scrollable area with bottom padding for mobile nav */}
      <main className="flex-1 min-h-dvh overflow-y-auto pb-24 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation - Visible on mobile/tablet, hidden on lg and above */}
      <MobileBottomNav
        currentPath={location.pathname}
        unreadMessages={0}
        unreadNotifications={unreadNotifications}
        onCreateClick={handleCreateClick}
      />
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
