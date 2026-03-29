/**
 * Seed Script — SocialMediaApp
 * Run: npx ts-node src/seed.ts
 *
 * Creates sample users, posts, stories, comments, likes, follows, and notifications.
 * Clears existing data before inserting fresh seed data.
 */

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import UserModel from './models/user.model';
import { Post } from './models/post.model';
import { Story } from './models/story.model';
import { Comment } from './models/comment.model';
import { Like } from './models/like.model';
import { Follow } from './models/follow.model';
import { Notification, NotificationType } from './models/notification.model';
import { Conversation as ConversationModel } from './models/conversation.model';
import { Message } from './models/message.model';

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/socialmediaapp';

// ─── Seed Data ────────────────────────────────────────────────────────────────

const USERS = [
    {
        username: 'aryan_k',
        name: 'Aryan Kashyap',
        email: 'aryan@aptoodate.com',
        password: 'password123',
        bio: '🚀 Building the future one drop at a time. Full-stack dev & founder @Aptoodate.',
    },
    {
        username: 'alex_morgan',
        name: 'Alex Morgan',
        email: 'alex@aptoodate.com',
        password: 'password123',
        bio: '🤖 AI researcher & open-source contributor. Obsessed with LLMs and distributed systems.',
    },
    {
        username: 'sarah_j',
        name: 'Sarah Johnson',
        email: 'sarah@aptoodate.com',
        password: 'password123',
        bio: '✈️ Travel & photography | 🌍 50+ countries | Capturing moments, not likes.',
    },
    {
        username: 'dev_guru',
        name: 'Dev Guru',
        email: 'devguru@aptoodate.com',
        password: 'password123',
        bio: '👨‍💻 Senior engineer @ BigTech. TypeScript evangelist. Coffee-driven development.',
    },
    {
        username: 'jessica_t',
        name: 'Jessica T',
        email: 'jessica@aptoodate.com',
        password: 'password123',
        bio: '🎨 UI/UX Designer. I make pixels beautiful and products intuitive.',
    },
];

const POST_CONTENTS = [
    // aryan_k posts
    {
        userIdx: 0,
        content: "Just shipped v1 of Aptoodate's signal engine. Drops, capsules, broadcasts — the future of content is intentional, not infinite. Thread 🧵👇",
        language: 'English',
        tags: ['aptoodate', 'buildinpublic', 'startup'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/aptoodate/800/600', aspectRatio: '4:3' },
    },
    {
        userIdx: 0,
        content: "Why I stopped using traditional social media:\n\n→ Algorithmic feeds optimise for outrage\n→ Infinite scroll is a dark pattern\n→ Engagement ≠ value\n\nAptoodate is my answer. What's yours?",
        language: 'English',
        tags: ['socialmedia', 'mindfulness', 'tech'],
        visibility: 'public' as const,
        type: 'post' as const,
    },
    {
        userIdx: 0,
        content: "MongoDB aggregation pipelines are underrated. Just replaced 4 chained queries with a single $lookup + $facet pipeline. Query time went from 340ms → 18ms 🔥",
        language: 'English',
        tags: ['mongodb', 'performance', 'backend'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/mongodb/800/600', aspectRatio: '4:3' },
    },
    // alex_morgan posts
    {
        userIdx: 1,
        content: "GPT-4o vision is wild. Fed it a screenshot of a complex database schema and it generated the full TypeScript interfaces + Mongoose models in one shot. We live in the future.",
        language: 'English',
        tags: ['AI', 'LLM', 'typescript'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/AI-future/800/600', aspectRatio: '4:3' },
    },
    {
        userIdx: 1,
        content: "Attention is all you need — but attention from the right people matters more than attention from everyone. Quality signals > quantity engagement.",
        language: 'English',
        tags: ['AI', 'opinion', 'tech'],
        visibility: 'public' as const,
        type: 'post' as const,
    },
    {
        userIdx: 1,
        content: "Hot take: The best code you can write is no code. Every line is a liability. Solve problems, don't collect LOC trophies.",
        language: 'English',
        tags: ['programming', 'engineering', 'opinion'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/code-clean/800/1000', aspectRatio: '4:5' },
    },
    // sarah_j posts
    {
        userIdx: 2,
        content: "Sunrise from Santorini's caldera rim. Some mornings make you forget your phone exists. Almost. 🌅\n\n(Shot on Sony A7IV, 35mm f/1.8, golden hour magic did the rest.)",
        language: 'English',
        tags: ['travel', 'photography', 'santorini'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/santorini-sunrise/800/600', aspectRatio: '4:3' },
    },
    {
        userIdx: 2,
        content: "Travel hack nobody talks about: Learn 10 words in the local language. Just 10. The warmth you get from locals changes the entire trip. Tried it in 30+ countries — works every time. 🌍",
        language: 'English',
        tags: ['travel', 'tips', 'culture'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/travel-world/800/600', aspectRatio: '4:3' },
    },
    {
        userIdx: 2,
        content: "Tokyo at 3am is a different planet. Neon reflections on wet pavement, vending machines every 10 steps, and an eerie silence. Shot this after 36hrs no sleep. Worth it. 📸",
        language: 'English',
        tags: ['travel', 'photography', 'tokyo'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/tokyo-night/800/1000', aspectRatio: '4:5' },
    },
    // dev_guru posts
    {
        userIdx: 3,
        content: "Code review checklist I use before every PR:\n\n✅ Does it solve the right problem?\n✅ Is it readable in 6 months?\n✅ Are edge cases handled?\n✅ Is it testable?\n✅ Does it make things simpler or complex?\n\nSave this.",
        language: 'English',
        tags: ['codereview', 'softwareengineering', 'career'],
        visibility: 'public' as const,
        type: 'post' as const,
    },
    {
        userIdx: 3,
        content: "TypeScript tip of the day: Stop using `any`. If you're reaching for `any`, you either need `unknown`, a proper interface, or a generic. `any` is a lie you're telling yourself.",
        language: 'English',
        tags: ['typescript', 'tips', 'javascript'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/typescript/800/600', aspectRatio: '4:3' },
    },
    {
        userIdx: 3,
        content: "Just hit 10k GitHub stars on our open-source project ⭐. Started as a weekend hack, now it's used by teams at Google, Meta, and Stripe. Ship things. Put them out there.",
        language: 'English',
        tags: ['opensource', 'github', 'career'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/github-stars/800/600', aspectRatio: '4:3' },
    },
    // jessica_t posts
    {
        userIdx: 4,
        content: "Design principle I swear by: If you need to explain how to use it, redesign it. Good UX is invisible. The best interface is the one users never notice.",
        language: 'English',
        tags: ['ux', 'design', 'product'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/ux-design/800/600', aspectRatio: '4:3' },
    },
    {
        userIdx: 4,
        content: "Redesigned our onboarding flow from 7 steps → 3 steps. Completion rate went from 38% → 81%. Sometimes less is so much more. Numbers don't lie. 📈",
        language: 'English',
        tags: ['ux', 'conversion', 'designcase'],
        visibility: 'public' as const,
        type: 'post' as const,
    },
    {
        userIdx: 4,
        content: "Color theory for UI designers in 3 rules:\n\n1. 60-30-10 rule: dominant / secondary / accent\n2. Never use pure black (#000) — it looks harsh on screens, use #0a0a0a or dark navy\n3. Test every color in light AND dark mode\n\nThread 🎨",
        language: 'English',
        tags: ['design', 'ux', 'colortheory'],
        visibility: 'public' as const,
        type: 'post' as const,
        media: { type: 'image' as const, url: 'https://picsum.photos/seed/color-palette/800/600', aspectRatio: '4:3' },
    },
];

const STORY_DATA = [
    { userIdx: 0, caption: '🚀 Shipping new features today!', signalTier: 'flash' as const },
    { userIdx: 1, caption: 'Deep in research mode ☕🤖', signalTier: 'pulse' as const },
    { userIdx: 2, caption: 'Golden hour in Mykonos 🌅', signalTier: 'broadcast' as const },
    { userIdx: 3, caption: 'PR approved. Weekend starts now 🍺', signalTier: 'pulse' as const },
    { userIdx: 4, caption: 'New design system drop 🎨', signalTier: 'flash' as const },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
    console.log('🌱  Connecting to MongoDB…');
    await mongoose.connect(DB_URL);
    console.log('✅  Connected.\n');

    // ── Clear all collections ──────────────────────────────────────────────
    console.log('🗑️   Clearing existing data…');
    await Promise.all([
        UserModel.deleteMany({}),
        Post.deleteMany({}),
        Story.deleteMany({}),
        Comment.deleteMany({}),
        Like.deleteMany({}),
        Follow.deleteMany({}),
        Notification.deleteMany({}),
        ConversationModel.deleteMany({}),
        Message.deleteMany({}),
    ]);
    console.log('✅  Collections cleared.\n');

    // ── Users ──────────────────────────────────────────────────────────────
    console.log('👤  Creating users…');
    const users = await Promise.all(
        USERS.map((u) => {
            const doc = new UserModel({ ...u, isVerified: true });
            return doc.save();
        })
    );
    console.log(`✅  ${users.length} users created.\n`);

    // ── Posts ──────────────────────────────────────────────────────────────
    console.log('📝  Creating posts…');
    const posts = await Promise.all(
        POST_CONTENTS.map((p) => {
            const { userIdx, ...rest } = p;
            const doc = new Post({ ...rest, author: users[userIdx]._id });
            return doc.save();
        })
    );
    console.log(`✅  ${posts.length} posts created.\n`);

    // ── Stories ────────────────────────────────────────────────────────────
    console.log('📡  Creating stories (signals)…');
    const stories = await Promise.all(
        STORY_DATA.map((s) => {
            const doc = new Story({
                user: users[s.userIdx]._id,
                caption: s.caption,
                signalTier: s.signalTier,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                media: {
                    type: 'image',
                    url: `https://robohash.org/${users[s.userIdx].username}?set=set2&size=400x400`,
                },
            });
            return doc.save();
        })
    );
    console.log(`✅  ${stories.length} stories created.\n`);

    // ── Follows ────────────────────────────────────────────────────────────
    // aryan follows everyone; alex ↔ sarah follow each other; dev_guru follows jessica
    console.log('👥  Creating follows…');
    const followPairs = [
        [0, 1], [0, 2], [0, 3], [0, 4], // aryan follows all
        [1, 0], [1, 2],                   // alex follows aryan & sarah
        [2, 0], [2, 1],                   // sarah follows aryan & alex
        [3, 0], [3, 4],                   // dev_guru follows aryan & jessica
        [4, 0], [4, 3],                   // jessica follows aryan & dev_guru
    ];
    await Promise.all(
        followPairs.map(([fi, fing]) =>
            new Follow({ follower: users[fi]._id, following: users[fing]._id }).save()
        )
    );
    console.log(`✅  ${followPairs.length} follow relationships created.\n`);

    // ── Comments ───────────────────────────────────────────────────────────
    console.log('💬  Creating comments…');
    const commentData = [
        { postIdx: 0, userIdx: 1, content: 'Huge congrats! The signal concept is genuinely fresh. Can\'t wait to try it.' },
        { postIdx: 0, userIdx: 2, content: 'Love the intentional design philosophy. Following closely 🙌' },
        { postIdx: 0, userIdx: 3, content: 'The tech stack choice? Hope you\'re on TypeScript + Node 👀' },
        { postIdx: 3, userIdx: 0, content: 'This is actually insane. What prompt did you use? Drop the system message!' },
        { postIdx: 3, userIdx: 4, content: 'The day I can reliably describe a UI and get production-ready code is the day everything changes.' },
        { postIdx: 6, userIdx: 0, content: 'This photo is unreal 😍 What time was this taken?' },
        { postIdx: 6, userIdx: 1, content: 'Sony + golden hour is the cheat code. Beautiful shot.' },
        { postIdx: 9, userIdx: 0, content: 'Saving this. This is literally my PR checklist but written properly.' },
        { postIdx: 9, userIdx: 4, content: 'Adding "does it make things simpler?" to every review I do from today.' },
        { postIdx: 12, userIdx: 3, content: 'Every word of this is gold. Invisible design is the hardest kind to ship.' },
        { postIdx: 13, userIdx: 0, content: 'From 7 to 3 steps and doubled completion. Proof that simplicity = conversion.' },
    ];
    const comments = await Promise.all(
        commentData.map((c) => {
            const { postIdx, userIdx, content } = c;
            return new Comment({
                post: posts[postIdx]._id,
                user: users[userIdx]._id,
                content,
            }).save();
        })
    );
    // Update post comment counts
    const postCommentCounts: Record<number, number> = {};
    commentData.forEach(({ postIdx }) => {
        postCommentCounts[postIdx] = (postCommentCounts[postIdx] || 0) + 1;
    });
    await Promise.all(
        Object.entries(postCommentCounts).map(([idx, count]) =>
            Post.findByIdAndUpdate(posts[Number(idx)]._id, { $inc: { comments: count } })
        )
    );
    console.log(`✅  ${comments.length} comments created.\n`);

    // ── Replies ────────────────────────────────────────────────────────────
    console.log('↩️   Creating replies…');
    const replies = await Promise.all([
        new Comment({
            post: posts[0]._id,
            user: users[0]._id,
            content: 'TypeScript all the way 😄 Node + Express + MongoDB. Will open-source it soon!',
            parentComment: comments[2]._id,
        }).save(),
        new Comment({
            post: posts[3]._id,
            user: users[1]._id,
            content: 'DM me — sharing the prompt in the next drop 👀',
            parentComment: comments[3]._id,
        }).save(),
    ]);
    await Comment.findByIdAndUpdate(comments[2]._id, { $inc: { replies: 1 } });
    await Comment.findByIdAndUpdate(comments[3]._id, { $inc: { replies: 1 } });
    console.log(`✅  ${replies.length} replies created.\n`);

    // ── Likes ──────────────────────────────────────────────────────────────
    console.log('❤️   Creating likes…');
    const likePairs: [number, number][] = [
        [1, 0], [2, 0], [3, 0], [4, 0], // post 0 liked by all
        [0, 1], [2, 1], [3, 1],           // post 1
        [1, 3], [2, 3], [4, 3],           // post 3
        [0, 6], [1, 6], [3, 6], [4, 6],  // post 6 (santorini photo)
        [0, 9], [1, 9], [2, 9], [4, 9],  // post 9 (code review)
        [0, 12], [1, 12], [3, 12],        // post 12 (design principle)
        [0, 13], [1, 13], [2, 13], [3, 13], // post 13 (onboarding)
    ];
    await Promise.all(
        likePairs.map(([userIdx, postIdx]) =>
            new Like({ user: users[userIdx]._id, post: posts[postIdx]._id }).save()
        )
    );
    // Update post like counts
    const postLikeCounts: Record<number, number> = {};
    likePairs.forEach(([, postIdx]) => {
        postLikeCounts[postIdx] = (postLikeCounts[postIdx] || 0) + 1;
    });
    await Promise.all(
        Object.entries(postLikeCounts).map(([idx, count]) =>
            Post.findByIdAndUpdate(posts[Number(idx)]._id, { $set: { likes: count } })
        )
    );
    console.log(`✅  ${likePairs.length} likes created.\n`);

    // ── Notifications ──────────────────────────────────────────────────────
    console.log('🔔  Creating notifications…');
    const notifData = [
        // Follow notifications for aryan
        { type: NotificationType.FOLLOW, senderIdx: 1, recipientIdx: 0 },
        { type: NotificationType.FOLLOW, senderIdx: 2, recipientIdx: 0 },
        { type: NotificationType.FOLLOW, senderIdx: 3, recipientIdx: 0 },
        { type: NotificationType.FOLLOW, senderIdx: 4, recipientIdx: 0 },
        // Like notifications
        { type: NotificationType.LIKE, senderIdx: 1, recipientIdx: 0, postIdx: 0 },
        { type: NotificationType.LIKE, senderIdx: 2, recipientIdx: 0, postIdx: 0 },
        { type: NotificationType.LIKE, senderIdx: 0, recipientIdx: 1, postIdx: 3 },
        { type: NotificationType.LIKE, senderIdx: 0, recipientIdx: 2, postIdx: 6 },
        // Comment notifications
        { type: NotificationType.COMMENT, senderIdx: 1, recipientIdx: 0, postIdx: 0 },
        { type: NotificationType.COMMENT, senderIdx: 0, recipientIdx: 1, postIdx: 3 },
        { type: NotificationType.COMMENT, senderIdx: 0, recipientIdx: 3, postIdx: 9 },
    ];
    const notifications = await Promise.all(
        notifData.map((n) =>
            new Notification({
                type: n.type,
                sender: users[n.senderIdx]._id,
                recipient: users[n.recipientIdx]._id,
                post: n.postIdx !== undefined ? posts[n.postIdx]._id : undefined,
                isRead: false,
            }).save()
        )
    );
    console.log(`✅  ${notifications.length} notifications created.\n`);

    // ── Conversations & Messages ───────────────────────────────────────────
    console.log('💬  Creating conversations & messages…');
    const conv1 = await new ConversationModel({
        participants: [users[0]._id, users[1]._id],
    }).save();

    const msgData = [
        { convIdx: conv1._id, senderIdx: 0, content: 'Hey Alex! Love your take on LLMs. Are you open to collaborating on something AI-powered for Aptoodate?' },
        { convIdx: conv1._id, senderIdx: 1, content: "Aryan! Absolutely — I've been watching what you're building. What do you have in mind?" },
        { convIdx: conv1._id, senderIdx: 0, content: 'Thinking about a signal relevance engine — surface drops that match your actual interests, not what the algorithm wants you to see.' },
        { convIdx: conv1._id, senderIdx: 1, content: "That's literally my research area. Let's set up a call this week 🔥" },
    ];
    const messages = await Promise.all(
        msgData.map((m) =>
            new Message({
                conversation: m.convIdx,
                sender: users[m.senderIdx]._id,
                content: m.content,
                type: 'text',
            }).save()
        )
    );
    const lastMsg = messages[messages.length - 1];
    await ConversationModel.findByIdAndUpdate(conv1._id, {
        lastMessage: lastMsg._id,
        lastMessageAt: lastMsg.createdAt,
    });
    console.log(`✅  1 conversation, ${messages.length} messages created.\n`);

    // ── Summary ────────────────────────────────────────────────────────────
    console.log('━'.repeat(50));
    console.log('🌱  Seed complete! Summary:');
    console.log(`   Users         : ${users.length}`);
    console.log(`   Posts         : ${posts.length}`);
    console.log(`   Stories       : ${stories.length}`);
    console.log(`   Follows       : ${followPairs.length}`);
    console.log(`   Comments      : ${comments.length + replies.length}`);
    console.log(`   Likes         : ${likePairs.length}`);
    console.log(`   Notifications : ${notifications.length}`);
    console.log(`   Conversations : 1`);
    console.log(`   Messages      : ${messages.length}`);
    console.log('━'.repeat(50));
    console.log('\n🔑  Test credentials (all passwords: password123):');
    users.forEach((u) => console.log(`   ${u.email.padEnd(28)} → @${u.username}`));
    console.log('');

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌  Seed failed:', err);
    mongoose.disconnect();
    process.exit(1);
});
