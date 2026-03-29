import express from 'express';
import pingRouter from './ping.router';
import userRouter from './user.router';
import postRouter from './post.router';
import followRouter from './follow.router';
import likeRouter from './like.router';
import commentRouter from './comment.router';
import conversationRouter from './conversation.router';
import storyRouter from './story.router';
import notificationRouter from './notification.router';
import bookmarkRouter from './bookmark.router';
import echoRouter from './echo.router';
import searchRouter from './search.router';
import trendingRouter from './trending.router';

const v1Router = express.Router();

v1Router.use('/ping', pingRouter);
v1Router.use('/users', userRouter);
v1Router.use('/posts', postRouter);
v1Router.use('/follow', followRouter);
v1Router.use('/likes', likeRouter);
v1Router.use('/comments', commentRouter);
v1Router.use('/conversations', conversationRouter);
v1Router.use('/stories', storyRouter);
v1Router.use('/notifications', notificationRouter);
v1Router.use('/bookmarks', bookmarkRouter);
v1Router.use('/echo', echoRouter);
v1Router.use('/search', searchRouter);
v1Router.use('/trending', trendingRouter);

export default v1Router;
