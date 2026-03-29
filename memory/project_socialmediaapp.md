---
name: SocialMediaApp project overview
description: Architecture, tech stack, and key design decisions for the SocialMediaApp project
type: project
---

Full-stack social media app called "Aptoodate" with a unique "Signals/Drops" concept (stories = signals, posts = drops).

**Stack:**
- Backend: Express 5 + TypeScript + MongoDB/Mongoose + JWT + Bcrypt + Winston logging (port 3001)
- Frontend: React 19 + React Router 7 + Zustand + React Query + Axios + TailwindCSS + shadcn-ui

**Backend structure:** N-tier (Controller → Service → Repository → Model). All 9 features fully implemented: users, posts, stories, comments, likes, follow, conversations, messages, notifications.

**Frontend structure:** hooks/queries + hooks/mutations + apis/ + store/ + pages/. Auth stored in localStorage (token + user). Axios baseURL from VITE_API_BASE_URL (default http://localhost:3001/api/v1). Token sent as x-access-token header.

**Key fixes applied in session:**
- notification.router.ts was all TODO - wired up all 8 notification routes
- error.middleware.ts appErrorHandler didn't check for statusCode - fixed with guard + next(err)
- message.repository.ts markAsRead used non-existent isRead field - fixed to use readBy Map
- conversation.model.ts missing lastMessageAt field used by repository - added field
- user.model.ts had name in interface but not in schema - added name field
- Added GET /users/me, GET /users/:userId, PUT /users/me endpoints
- HomePage.tsx used feedData?.posts (wrong) - fixed to feedData?.data; storiesData?.stories → storiesData?.data; story.author → story.user
- ProfilePage.tsx was fully mock data - rewired to real API using useUserById, useUserPosts, useFollowStats, useFollowingStatus, useUpdateProfile
- Added frontend: apis/users.ts, hooks/queries/useUsers.ts, hooks/mutations/useUsers.ts, hooks/queries/useLikes.ts::useUserLikes

**Why:** User wanted a complete backend + frontend integration for their social media app.
**How to apply:** When continuing work on this project, the backend is fully functional. Frontend still has ProfilePage using mock data for media tab. Messages page uses mock data.
