#!/bin/bash

# ============================================================
# QUICK GIT COMMANDS CHEAT SHEET
# ============================================================

echo "
╔════════════════════════════════════════════════════════════╗
║          APTOODATE - GIT WORKFLOW QUICK REFERENCE          ║
╚════════════════════════════════════════════════════════════╝

📋 QUICK SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Before Starting Work
   $ git checkout develop
   $ git pull origin develop

2. Start New Feature
   $ git checkout -b feature/my-feature develop

3. Make Changes & Commit
   $ git add .
   $ git commit -m 'feat(scope): description'

4. Push to GitHub
   $ git push -u origin feature/my-feature

5. After PR Merge
   $ git branch -d feature/my-feature
   $ git push origin --delete feature/my-feature


🔀 BRANCH STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

main           → Production releases (tagged v1.0.0)
  ↑
develop        → Integration branch (current)
  ↑
feature/*      → Feature branches
hotfix/*       → Emergency fixes
release/*      → Release prep


📝 COMMIT CONVENTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Format: <type>(<scope>): <subject>

Types:
  feat     - New feature
  fix      - Bug fix
  docs     - Documentation
  style    - Formatting (no code change)
  refactor - Code refactoring
  perf     - Performance improvement
  test     - Tests
  chore    - Build/tooling

Examples:
  $ git commit -m 'feat(auth): add phone OTP'
  $ git commit -m 'fix(home): fix infinite scroll'
  $ git commit -m 'docs(readme): update installation'


🔍 USEFUL COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

View Status
  $ git status              - Current changes
  $ git branch -a           - All branches
  $ git log --oneline       - Commit history
  $ git diff                - See changes

Sync with Remote
  $ git fetch origin        - Get latest
  $ git pull origin develop - Update develop
  $ git fetch -p            - Clean deleted branches

Before Pushing
  $ npm run lint --fix      - Fix linting
  $ npm run build           - Check TypeScript
  $ git diff --staged       - Review changes

Undo Changes
  $ git restore <file>      - Discard changes
  $ git reset HEAD~1 --soft - Undo last commit
  $ git revert <hash>       - Revert commit

Stash (Save work temporarily)
  $ git stash               - Save changes
  $ git stash pop           - Restore changes


📦 VERSION BUMPING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Create release branch
   $ git checkout -b release/v0.2.0 develop

2. Update version
   $ npm version minor

3. Update CHANGELOG.md

4. Commit & Push
   $ git commit -am 'chore: bump version to 0.2.0'
   $ git push -u origin release/v0.2.0

5. Create PR: release/v0.2.0 → main

6. After merge, tag release
   $ git tag -a v0.2.0 -m 'Release v0.2.0'
   $ git push origin v0.2.0


⚠️  DO NOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Force push to shared branches
   $ git push --force origin develop

❌ Commit directly to main or develop
   Always use feature branches

❌ Large messy commits
   Keep commits small and focused

❌ Unclear commit messages
   Use conventional commits format

❌ Forget to pull before starting
   Always: git pull origin develop


📚 DOCUMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GIT_WORKFLOW.md   - Complete Git guide
VERSIONING.md     - Versioning strategy
CHANGELOG.md      - All changes
CONTRIBUTING.md   - Contributing guidelines
SETUP_SUMMARY.md  - Project overview


🎯 WORKFLOW EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Get latest
$ git checkout develop && git pull origin develop

# Create feature
$ git checkout -b feature/home-feed develop

# Make changes...
$ npm run lint --fix
$ npm run build

# Commit
$ git add .
$ git commit -m 'feat(home): add feed component'

# Push
$ git push -u origin feature/home-feed

# (Create PR on GitHub, request review)

# After merge
$ git checkout develop
$ git pull origin develop
$ git branch -d feature/home-feed

✨ Done! Ready for next feature


💡 TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Commit frequently with clear messages
- Pull before starting work
- Push regularly to backup
- Review changes before committing
- Keep branches focused on single feature
- Delete feature branches after merge


════════════════════════════════════════════════════════════

Last Updated: 2026-01-08
For detailed info, see documentation files
" | less
