# Git Workflow & Branching Strategy

This project follows **Git Flow** branching model for professional version control.

## Branch Structure

```
main          → Production-ready code (tagged with versions)
  ↑
develop       → Integration branch for features
  ↑
feature/*     → Individual feature branches
hotfix/*      → Emergency fixes for production
release/*     → Release preparation branches
```

---

## Branch Naming Convention

### Feature Branches
```bash
feature/auth-login          # User authentication
feature/home-feed           # Home feed implementation
feature/create-post         # Create post functionality
feature/language-translation # Language translation
```

### Hotfix Branches
```bash
hotfix/critical-bug-fix     # Urgent production fixes
hotfix/security-patch       # Security issues
```

### Release Branches
```bash
release/v1.0.0              # Release preparation v1.0.0
release/v1.0.1              # Release preparation v1.0.1
```

---

## Workflow Steps

### 1. Creating a Feature

```bash
# Start from develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push feature branch
git push -u origin feature/my-feature
```

### 2. Creating a Pull Request (PR)

When your feature is ready:
- Push your branch to GitHub
- Create PR from `feature/my-feature` → `develop`
- Add description of changes
- Request code review
- Wait for approval and merge

### 3. Merging to Develop

After PR approval:
```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/my-feature
git push origin develop

# Delete feature branch
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### 4. Release Preparation

When ready to release:

```bash
# Create release branch
git checkout -b release/v1.0.0 develop

# Update version numbers
# Update CHANGELOG.md
# Commit changes
git commit -m "chore: bump version to 1.0.0"
git push -u origin release/v1.0.0
```

### 5. Merging Release to Main

```bash
# Create PR: release/v1.0.0 → main
# After approval and merge:

git checkout main
git pull origin main

# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Merge back to develop
git checkout develop
git merge --no-ff main
git push origin develop
```

### 6. Hotfix for Production

```bash
# Create hotfix from main
git checkout -b hotfix/critical-bug main

# Fix the bug
git add .
git commit -m "hotfix: critical bug fix"

# Create PR: hotfix/critical-bug → main
# After approval and merge:

git checkout main
git pull origin main
git tag -a v1.0.1 -m "Hotfix version 1.0.1"
git push origin v1.0.1

# Merge back to develop
git checkout develop
git merge --no-ff main
git push origin develop
```

---

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build, dependencies, or tooling changes

### Examples:
```bash
git commit -m "feat(auth): add phone OTP authentication"
git commit -m "fix(home): fix feed loading infinite scroll"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(api): simplify API service structure"
git commit -m "perf(images): optimize image loading"
```

---

## Semantic Versioning

Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (v1.0.0 → v2.0.0)
- **MINOR**: New features (v1.0.0 → v1.1.0)
- **PATCH**: Bug fixes (v1.0.0 → v1.0.1)

Examples:
- v1.0.0 - First stable release
- v1.1.0 - Added new feature
- v1.1.1 - Bug fix
- v2.0.0 - Major breaking changes

---

## Branch Protection Rules

On GitHub, set these rules for important branches:

### Main Branch:
- ✅ Require pull request reviews before merging
- ✅ Dismiss stale pull request approvals
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Restrict who can push to matching branches

### Develop Branch:
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging

---

## Quick Reference

```bash
# Switch to develop and get latest
git checkout develop && git pull origin develop

# Create new feature
git checkout -b feature/my-feature develop

# Push feature to remote
git push -u origin feature/my-feature

# After feature is done, create PR on GitHub
# (develop base branch, your feature branch as compare)

# Delete local feature branch
git branch -d feature/my-feature

# Delete remote feature branch
git push origin --delete feature/my-feature

# View all branches
git branch -a

# View commits on your branch
git log --oneline origin/develop..HEAD
```

---

## Tips

1. **Always pull before starting work**
   ```bash
   git pull origin develop
   ```

2. **Commit frequently with meaningful messages**
   ```bash
   git commit -m "feat(scope): clear description of change"
   ```

3. **Push regularly to backup your work**
   ```bash
   git push origin feature/my-feature
   ```

4. **Never force push to shared branches**
   ```bash
   # ❌ WRONG
   git push --force origin develop
   
   # ✅ CORRECT
   git push origin develop
   ```

5. **Review your changes before committing**
   ```bash
   git diff              # See all changes
   git diff --staged     # See staged changes
   ```

---

## Useful Commands

```bash
# See commit history
git log --oneline --graph --all

# See branches and their latest commits
git branch -v

# Stash changes temporarily
git stash
git stash pop

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Clean up deleted remote branches locally
git fetch -p
```
