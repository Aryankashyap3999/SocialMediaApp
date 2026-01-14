/**
 * Component Library - Atomic Design Structure
 * 
 * ATOMS - Basic building blocks (no dependencies on other components)
 * ├── Button - Single button with variants
 * ├── Input - Single input field
 * ├── Avatar - User profile picture
 * ├── Badge - Status label
 * ├── Text - Styled text element
 * ├── Heading - Semantic heading
 * └── Icons - SVG icon components
 * 
 * MOLECULES - Simple combinations (2-3 atoms)
 * ├── InputField - Label + Input + Error
 * ├── Card - Container with styling
 * ├── UserHeader - Avatar + Name + Badge
 * ├── PostActions - Like + Comment + Share buttons
 * └── LanguageTag - Language indicator
 * 
 * ORGANISMS - Complex components (multiple molecules)
 * ├── FeedCard - Complete post/feed item
 * └── CreatePostCard - Post creation interface
 * 
 * LAYOUTS - Page structure
 * ├── MainLayout - Header + Sidebar + Content + Footer
 * └── AuthLayout - Authentication page layout
 */

// Atoms
export * from './atoms';

// Molecules
export * from './molecules';

// Organisms
export * from './organisms';

// Layouts
export * from './layouts';

// Providers
export * from './providers';
