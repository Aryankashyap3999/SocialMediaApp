# Frontend API Hooks - Quick Reference

## Installation & Setup

All hooks are exported from `/frontend/src/hooks/index.ts`. Import what you need:

```typescript
import { useFeed, useCreatePost, useLikePost } from '@/hooks';
```

## Posts

### Fetch Posts
```typescript
// Get feed with pagination
const { data, isLoading, error } = useFeed(20, 0);
// data.posts contains array of Post objects

// Get single post
const { data: post } = usePost(postId);

// Get user's posts
const { data } = useUserPosts(userId, 20, 0);
```

### Create/Update/Delete Posts
```typescript
// Create post
const createPost = useCreatePost();
createPost.mutate({ 
  content: 'Hello world!',
  imageUrl: 'https://example.com/image.jpg' 
});

// Update post
const updatePost = useUpdatePost();
updatePost.mutate({ 
  postId: '123',
  data: { content: 'Updated content' }
});

// Delete post
const deletePost = useDeletePost();
deletePost.mutate(postId);
```

## Likes

### Check & Toggle Likes
```typescript
// Check if user liked post
const { data: likeStatus } = useLikeStatus(postId);
// likeStatus: { isLiked: boolean }

// Get post's likes
const { data } = usePostLikes(postId, 20, 0);

// Like/Unlike
const likePost = useLikePost();
const unlikePost = useUnlikePost();

likePost.mutate(postId);
unlikePost.mutate(postId);
```

## Comments

### Fetch Comments
```typescript
// Get post comments
const { data } = usePostComments(postId, 20, 0);

// Get comment replies
const { data: replies } = useCommentReplies(commentId, 10, 0);
```

### Create/Update/Delete Comments
```typescript
// Create comment
const createComment = useCreateComment();
createComment.mutate({ 
  postId: '123',
  data: { 
    content: 'Great post!',
    parentComment: null // or commentId for replies
  }
});

// Update comment
const updateComment = useUpdateComment();
updateComment.mutate({ 
  commentId: '123',
  content: 'Updated comment'
});

// Delete comment
const deleteComment = useDeleteComment();
deleteComment.mutate(commentId);
```

## Follow System

### Check Follow Status
```typescript
// Check if following user
const { data } = useFollowingStatus(userId);
// data: { isFollowing: boolean }

// Get follow stats
const { data } = useFollowStats(userId);
// data: { followersCount: number, followingCount: number }
```

### Follow/Unfollow
```typescript
const followUser = useFollowUser();
const unfollowUser = useUnfollowUser();

followUser.mutate(userId);
unfollowUser.mutate(userId);
```

### Get Lists
```typescript
// Get followers
const { data } = useFollowers(userId, 20, 0);

// Get following
const { data } = useFollowing(userId, 20, 0);
```

## Stories

### View Stories
```typescript
// Get active stories (not expired)
const { data } = useActiveStories(20, 0);

// Get user's stories
const { data } = useUserStories(userId);
```

### Create/Delete Stories
```typescript
// Create story
const createStory = useCreateStory();
createStory.mutate({ 
  mediaUrl: 'https://example.com/story.jpg',
  mediaType: 'image'
});

// Delete story
const deleteStory = useDeleteStory();
deleteStory.mutate(storyId);

// Mark story as viewed
const viewStory = useViewStory();
viewStory.mutate(storyId);
```

## Messages

### View Conversations & Messages
```typescript
// Get all conversations (refetches every 10s)
const { data } = useConversations(20, 0);

// Get conversation messages (refetches every 5s)
const { data } = useMessages(conversationId, 50, 0);
```

### Send/Delete Messages
```typescript
// Send message
const sendMessage = useSendMessage();
sendMessage.mutate({ 
  conversationId: '123',
  content: 'Hello!'
});

// Delete message
const deleteMessage = useDeleteMessage();
deleteMessage.mutate(messageId);

// Mark as read
const markAsRead = useMarkConversationAsRead();
markAsRead.mutate(conversationId);
```

## Notifications

### View Notifications
```typescript
// Get all notifications (refetches every 30s)
const { data } = useNotifications(20, 0);

// Get unread only
const { data } = useUnreadNotifications();

// Get unread count (for badge)
const { data } = useUnreadCount();
// data: { count: number }
```

### Manage Notifications
```typescript
// Mark as read
const markAsRead = useMarkNotificationAsRead();
markAsRead.mutate(notificationId);

// Mark all as read
const markAllAsRead = useMarkAllNotificationsAsRead();
markAllAsRead.mutate();

// Delete notification
const deleteNotification = useDeleteNotification();
deleteNotification.mutate(notificationId);

// Delete all
const deleteAll = useDeleteAllNotifications();
deleteAll.mutate();
```

## Common Patterns

### Loading States
```typescript
const { data, isLoading, error } = useFeed();

if (isLoading) return <Spinner />;
if (error) return <Error message={error.message} />;
return <FeedList posts={data.posts} />;
```

### Mutation States
```typescript
const createPost = useCreatePost();

<Button 
  onClick={() => createPost.mutate(postData)}
  disabled={createPost.isPending}
>
  {createPost.isPending ? 'Posting...' : 'Post'}
</Button>
```

### Optimistic Updates
```typescript
const likePost = useLikePost();

// UI updates immediately, reverts on error
<Button onClick={() => likePost.mutate(postId)}>
  {isLiked ? '❤️ Liked' : '🤍 Like'}
</Button>
```

### Pagination
```typescript
const [page, setPage] = useState(0);
const limit = 20;
const skip = page * limit;

const { data } = useFeed(limit, skip);

<button onClick={() => setPage(p => p + 1)}>
  Load More
</button>
```

### Real-time Updates
Messages, conversations, and notifications automatically refetch at intervals:
- Messages: Every 5 seconds
- Conversations: Every 10 seconds
- Notifications: Every 30 seconds

To disable:
```typescript
const { data } = useMessages(conversationId, 50, 0, {
  refetchInterval: false // Disable auto-refetch
});
```

## Error Handling

All mutations show toast notifications automatically:
- ✅ Success: Green toast with success message
- ❌ Error: Red toast with error message from backend

```typescript
const createPost = useCreatePost();

// Automatically shows:
// - "Post created successfully!" on success
// - "Failed to create post" or backend error message on failure
```

## Type Safety

All hooks are fully typed. Import types as needed:

```typescript
import type { Post, User, Comment } from '@/types/api';

const { data } = useFeed();
// data is typed as FeedResponse { posts: Post[], total: number, ... }

const post: Post = data.posts[0];
// TypeScript knows all Post properties
```

## Cache Management

React Query automatically manages caching:
- Feed data cached for 5 minutes
- Other data refetched when component mounts
- Mutations automatically invalidate related queries

Example: Creating a post invalidates the feed:
```typescript
const createPost = useCreatePost();
createPost.mutate(data); // This will auto-refresh the feed
```

## Best Practices

1. **Use query hooks in components**:
   ```typescript
   const { data, isLoading } = useFeed();
   ```

2. **Use mutation hooks for actions**:
   ```typescript
   const createPost = useCreatePost();
   ```

3. **Handle loading states**:
   ```typescript
   if (isLoading) return <Skeleton />;
   ```

4. **Handle errors gracefully**:
   ```typescript
   if (error) return <EmptyState />;
   ```

5. **Disable buttons during mutations**:
   ```typescript
   disabled={mutation.isPending}
   ```

6. **Use proper pagination**:
   ```typescript
   const [page, setPage] = useState(0);
   const { data } = useFeed(20, page * 20);
   ```
