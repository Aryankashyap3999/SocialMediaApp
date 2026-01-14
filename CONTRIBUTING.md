# Contributing Guidelines

Thank you for contributing to Aptoodate! This document provides guidelines for contributing to the project.

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SocialMediaApp.git
   cd SocialMediaApp/frontend
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature develop
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

---

## Development Workflow

### 1. Before Starting

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/descriptive-name develop
```

### 2. While Developing

- Follow **Conventional Commits** for commit messages
- Keep commits small and focused
- Test your changes frequently
- Run linter before committing

```bash
# Check lint errors
npm run lint

# Fix lint errors
npm run lint -- --fix
```

### 3. Before Pushing

```bash
# Update with latest develop changes
git pull origin develop

# Push your feature
git push -u origin feature/your-feature
```

### 4. Creating Pull Request

- Go to GitHub
- Create PR from `feature/your-feature` → `develop`
- Fill in the PR template
- Request reviewers
- Wait for approval

### 5. After Merge

```bash
# Delete local branch
git branch -d feature/your-feature

# Delete remote branch
git push origin --delete feature/your-feature

# Update local develop
git checkout develop
git pull origin develop
```

---

## Code Style

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting (no code change)
- **refactor**: Refactoring
- **perf**: Performance improvement
- **test**: Tests
- **chore**: Build/tooling/dependencies

#### Scope
- auth
- home
- create
- messages
- profile
- discover
- api
- ui
- types
- etc.

#### Examples
```bash
git commit -m "feat(auth): add phone OTP verification"
git commit -m "fix(home): fix infinite scroll bug"
git commit -m "docs(readme): update installation steps"
git commit -m "refactor(api): simplify HTTP client"
```

### Code Format

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Run `npm run lint --fix` before committing
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings (unless needed)

```typescript
// ✅ Good
const greeting: string = 'Hello';
const age: number = 25;
const user: User = { name: 'John' };

// ❌ Bad
const greeting = "Hello"
const age = 25
const user = { name: 'John' }
```

### Component Style

```typescript
// ✅ Good - Feature-based, with proper structure
// src/features/home/components/FeedCard.tsx
import React from 'react';
import { Post } from '@types';
import { log } from '@services/logger';

interface FeedCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({ post, onLike }) => {
  const handleLike = () => {
    log.info('Post liked', { postId: post.id });
    onLike(post.id);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p>{post.content}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};
```

---

## File Structure

### Where to Add Code

```
src/
├── features/
│   ├── auth/           # Authentication logic
│   ├── home/           # Home feed
│   ├── create/         # Create post/reel
│   └── ...
├── components/
│   ├── common/         # Reusable components
│   └── layouts/        # Layout components
├── services/           # API calls, business logic
├── store/              # Zustand stores
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces
└── utils/              # Helper functions
```

### Creating New Feature

1. Create folder in `src/features/feature-name`
2. Create `components/`, `types/`, `hooks/` if needed
3. Export from index.ts

```
src/features/my-feature/
├── components/
│   ├── MyComponent.tsx
│   └── index.ts
├── hooks/
│   ├── useMyFeature.ts
│   └── index.ts
├── types/
│   ├── index.ts
├── index.ts
└── MyFeaturePage.tsx
```

---

## Testing

- Write tests for new features
- Use Jest + React Testing Library
- Test file location: same as source but with `.test.ts`

```typescript
// src/utils/helpers.test.ts
import { formatDate } from './helpers';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2026-01-08');
    expect(result).toBe('Jan 8, 2026');
  });
});
```

---

## Documentation

- Update docs when adding features
- Add JSDoc comments to functions
- Update CHANGELOG.md
- Include examples in README

```typescript
/**
 * Formats a date string to readable format
 * @param date - ISO date string
 * @returns Formatted date string
 * @example
 * formatDate('2026-01-08') // Returns 'Jan 8, 2026'
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
```

---

## PR Review Checklist

Before requesting review, ensure:

- [ ] Branch is up to date with develop
- [ ] All tests pass
- [ ] Lint errors are fixed (`npm run lint --fix`)
- [ ] TypeScript compiles without errors
- [ ] Code follows style guide
- [ ] CHANGELOG.md is updated
- [ ] Commit messages follow convention
- [ ] PR title is descriptive
- [ ] PR description explains changes

---

## Common Issues

### Issue: Lint errors
```bash
npm run lint --fix
```

### Issue: TypeScript errors
```bash
npm run build
```

### Issue: Git merge conflicts
```bash
# Check conflicted files
git status

# Edit files to resolve conflicts
# Then
git add .
git commit -m "resolve: merge conflicts"
```

### Issue: Need to update from develop
```bash
git fetch origin
git rebase origin/develop
# or
git merge origin/develop
```

---

## Need Help?

- Check [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for git commands
- Check [VERSIONING.md](./VERSIONING.md) for versioning
- Read [CHANGELOG.md](./CHANGELOG.md) for latest changes
- Ask questions in issues or discussions

---

## Community

- Be respectful and constructive
- Help others in the community
- Share knowledge and experience
- Report bugs clearly and helpfully

---

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing! 🎉
