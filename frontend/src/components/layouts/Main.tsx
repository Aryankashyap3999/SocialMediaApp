import React from 'react';

export interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  showSidebar?: boolean;
}

/**
 * MainLayout
 * 
 * Structure:
 * ┌─────────────────────────┐
 * │       Header            │
 * ├──────────┬──────────────┤
 * │ Sidebar  │   Content    │
 * ├──────────┴──────────────┤
 * │       Footer            │
 * └─────────────────────────┘
 * 
 * @example
 * <MainLayout
 *   header={<Header />}
 *   sidebar={<Sidebar />}
 *   footer={<Footer />}
 * >
 *   <Page />
 * </MainLayout>
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  header,
  sidebar,
  footer,
  sidebarPosition = 'left',
  showSidebar = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-40 border-b border-border bg-white shadow-sm">
          {header}
        </header>
      )}

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && showSidebar && (
          <aside
            className={`
              w-64 border-border bg-white overflow-y-auto
              ${sidebarPosition === 'left' ? 'border-r' : 'border-l order-2'}
              hidden md:block
            `}
          >
            <nav className="p-4">{sidebar}</nav>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t border-border bg-bg-secondary py-6">
          {footer}
        </footer>
      )}
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
