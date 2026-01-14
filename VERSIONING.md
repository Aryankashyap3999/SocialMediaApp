# Versioning Strategy

## Current Version: v0.1.0 (Development)

---

## Semantic Versioning Rules

We follow [Semantic Versioning](https://semver.org/) format: `MAJOR.MINOR.PATCH`

### Increment Rules:

1. **MAJOR** (v0.0.0 → v1.0.0)
   - Breaking API changes
   - Major feature revisions
   - Incompatible with previous version

2. **MINOR** (v1.0.0 → v1.1.0)
   - New features (backward compatible)
   - Feature enhancements
   - New capabilities

3. **PATCH** (v1.0.0 → v1.0.1)
   - Bug fixes
   - Security patches
   - Hotfixes

### Pre-release Versions:
- `v1.0.0-alpha.1` - Alpha release
- `v1.0.0-beta.1` - Beta release
- `v1.0.0-rc.1` - Release candidate

---

## Version Bumping Process

### 1. Update package.json version
```json
{
  "version": "0.1.0"
}
```

### 2. Update CHANGELOG.md
Document what changed (see CHANGELOG.md)

### 3. Create git tag
```bash
git tag -a v0.1.0 -m "Release version 0.1.0"
git push origin v0.1.0
```

### 4. Create GitHub Release
- Go to GitHub Releases
- Create release from tag
- Copy CHANGELOG section as description

---

## Release Schedule

- **v0.1.0** (Current) - Foundation & Setup
  - Initial project structure
  - Logger setup
  - Global styles & Tailwind
  - Git workflow setup

- **v0.2.0** - Core Architecture
  - API service layer
  - State management
  - Routing setup
  - Base components

- **v1.0.0** - MVP Ready
  - Auth (Login/Signup/Verification)
  - Home Feed
  - Create Post/Reel
  - Basic UI

- **v1.1.0** - Extended Features
  - Discover page
  - Messages & Chat
  - User Profile
  - Language translation

- **v2.0.0** - Production Features
  - Admin dashboard
  - Moderation tools
  - Analytics
  - Performance optimization

---

## Updating Version in Multiple Places

When bumping version, update:
1. `frontend/package.json`
2. This file (VERSIONING.md)
3. `CHANGELOG.md`
4. Git tag

Script to help:
```bash
# Set new version
NEW_VERSION="0.2.0"

# Update package.json
npm version $NEW_VERSION --no-git-tag-v

# Create git tag
git tag -a v$NEW_VERSION -m "Release version $NEW_VERSION"
git push origin v$NEW_VERSION
```

---

## Version History

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| v0.1.0 | 2026-01-08 | Development | Initial setup |
| v0.2.0 | Upcoming | Planning | Core architecture |
| v1.0.0 | Planned | MVP | Core features |

---

## References

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a CHANGELOG](https://keepachangelog.com/)
