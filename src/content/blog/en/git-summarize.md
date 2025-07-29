---
title: Git Mastery Guide - Professional Development Workflows
slug: en/git-summarize-version-final
image:
  src: /covers/git-summarize.webp
  alt: Git version control comprehensive guide
author: Cristian Arando
language: en
tags: [best practices, development, git, workflows]
publishDate: "2025-07-29"
authorContact: crisarandosyse@gmail.com
readTime: 15 min
excerpt: A comprehensive yet concise Git guide covering essential concepts, professional workflows, and advanced techniques for modern software development teams.
---

## 1. Understanding Version Control Fundamentals

Version control is a system that records and manages changes to files over time, enabling teams to collaborate efficiently while maintaining project integrity.

### Why Version Control Matters

**Individual Benefits:**
- **Change Tracking**: Complete history of what changed, when, and why
- **Backup & Recovery**: Distributed storage prevents data loss
- **Experimentation**: Safe feature development without breaking stable code
- **Release Management**: Tag and maintain multiple software versions

**Team Benefits:**
- **Collaboration**: Multiple developers working simultaneously on the same codebase
- **Conflict Resolution**: Intelligent merging of concurrent changes
- **Code Review**: Systematic examination of changes before integration
- **Accountability**: Clear audit trail of contributions and modifications

### Core Concepts

- **Repository**: Database containing complete project history and metadata
- **Commit**: Immutable snapshot of project state at a specific point in time
- **Branch**: Independent development line enabling parallel feature work
- **Merge**: Process of combining changes from different branches
- **Working Directory**: Local file system where you edit files
- **Staging Area**: Intermediate space for preparing commits
- **Remote**: Shared repository hosted on a server for collaboration
- **HEAD**: Pointer to the current commit/branch you're working on

## 2. Git Architecture and Data Model

Git is a distributed version control system designed for speed, data integrity, and support for non-linear development workflows.

### Git's Unique Advantages

**Distributed Nature**: Every repository contains complete project history and full versioning capabilities

**Snapshot-Based Storage**: Git stores complete snapshots rather than file differences

**Data Integrity**: All content is checksummed using SHA-1 hashes before storage

**Branching Excellence**: Lightweight, fast branch creation and switching

### The Git Workflow

```
Working Directory → Staging Area → Local Repository → Remote Repository
    (Modified)       (Staged)       (Committed)        (Shared)
        ↓               ↓              ↓                  ↓
   Edit files      git add file    git commit        git push
```

**Workflow Stages:**
1. **Working Directory**: Make changes to files
2. **Staging Area**: Select changes for next commit
3. **Local Repository**: Permanently store commit locally
4. **Remote Repository**: Share changes with team

## 3. Essential Git Configuration

### Configuration Hierarchy
Git uses a three-level configuration system with clear precedence:
- **Local** (`--local`): Repository-specific settings
- **Global** (`--global`): User-specific settings across all repositories  
- **System** (`--system`): Machine-wide settings for all users

**Priority**: Local → Global → System

### Initial Setup

```bash
# Identity configuration (required)
git config --global user.name "Your Full Name"
git config --global user.email "your.email@company.com"

# Editor preference
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim

# Default branch name
git config --global init.defaultBranch main

# Pull behavior (choose one)
git config --global pull.rebase false   # Merge strategy (preserves history)
git config --global pull.rebase true    # Rebase strategy (linear history)

# Better display
git config --global color.ui auto
git config --global core.autocrlf input  # Unix line endings
```

## 4. Repository Creation and Setup

### Creating Repositories

```bash
# Initialize new repository
git init my-project
cd my-project

# Clone existing repository
git clone https://github.com/user/repository.git
git clone https://github.com/user/repository.git custom-name

# Clone with specific branch
git clone -b develop https://github.com/user/repository.git
```

### Professional Setup

```bash
# Create essential files
touch README.md .gitignore LICENSE

# Project structure
mkdir -p src/{components,utils,tests}
mkdir -p docs config

# Initial content
echo "# Project Name" > README.md
echo "node_modules/\n.env\ndist/" > .gitignore

# First commit
git add .
git commit -m "feat: initial project setup

- Add project structure
- Configure basic files
- Set up development environment"
```

## 5. Core Git Commands and Workflow

### Basic Command Patterns

```bash
# Repository status and inspection
git status                     # Current repository state
git diff                       # Unstaged changes
git diff --staged             # Staged changes
git diff HEAD~1               # Changes since last commit

# Staging operations
git add filename.txt          # Stage specific file
git add .                     # Stage all changes
git add -p                    # Interactive staging (patch mode)
git add -A                    # Stage all including deletions

# Committing changes
git commit -m "feat: add user authentication"
git commit -am "fix: resolve login bug"  # Add and commit tracked files
git commit --amend            # Modify last commit
git commit --amend --no-edit  # Amend without changing message
```

### Professional Commit Messages

Follow the Conventional Commits specification for consistency:

```bash
git commit -m "type(scope): brief description

Optional longer explanation of what this commit does and why.

- List specific changes made
- Reference issues: Fixes #123, Closes #456
- Note breaking changes if any

Co-authored-by: Name <email@example.com>"
```

**Common Types:**
- `feat`: New feature or functionality
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic changes)
- `refactor`: Code restructuring without behavior changes
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks (dependencies, build config)
- `perf`: Performance improvements
- `ci`: Continuous integration changes

## 6. Git History and Log Analysis

### Exploring Project History

```bash
# Basic logging
git log                        # Full commit history
git log --oneline             # Condensed one-line format
git log --graph               # Visual branch structure
git log -p                    # Show patches/changes
git log --stat                # Show file change statistics

# Advanced filtering
git log --author="John Doe"
git log --since="2 weeks ago" --until="1 week ago"
git log --grep="bugfix"       # Search commit messages
git log -- filename.txt      # History of specific file
git log -S "function_name"    # Search for code changes

# Professional log format
git log --pretty=format:"%C(yellow)%h%C(reset) %C(blue)%ad%C(reset) %C(green)%an%C(reset) %s" --date=short --graph
```

### Comparing Changes

```bash
# Compare commits
git diff abc123 def456
git diff HEAD~2 HEAD          # Last 2 commits
git diff main feature-branch

# Compare branches
git diff main...feature-branch  # Changes from common ancestor

# Advanced diff options
git diff --word-diff          # Word-level differences
git diff --name-only          # Just file names
git diff --stat              # Summary statistics
```

### Code Analysis Tools

```bash
# Blame and annotation
git blame filename.txt
git blame -L 10,20 filename.txt  # Specific lines

# File history
git log --follow -- filename.txt  # Track through renames
git log -p -- filename.txt       # Show all changes

# Content search
git grep "search_term"
git grep -n "function_name"      # With line numbers
git grep --count "TODO"          # Count occurrences
```

## 7. Undoing Changes and Recovery

### Understanding Undo Strategies

```
Working Directory → Staging Area → Local Repository → Remote Repository
      ↓               ↓              ↓                   ↓
  git restore     git restore      git reset/         git revert
                   --staged        git revert        (safe for shared)
```

**Key Principle**: The further changes have progressed in the Git workflow, the more careful you must be when undoing them.

### Working Directory Changes

```bash
# Restore files to last committed state
git restore filename.txt       # Single file
git restore .                  # All files
git restore --source=HEAD~2 filename.txt  # From specific commit

# Clean untracked files
git clean -n                   # Dry run (preview)
git clean -f                   # Remove untracked files
git clean -fd                  # Remove files and directories
git clean -fx                  # Remove files and ignored items
```

### Staging Area Operations

```bash
# Unstage changes
git restore --staged filename.txt
git restore --staged .

# Traditional unstaging
git reset HEAD filename.txt
git reset                      # Unstage all
```

### Commit-Level Undoing

#### Safe for Local Work

```bash
# Soft reset - keep changes staged
git reset --soft HEAD~1

# Mixed reset - keep changes unstaged (default)
git reset HEAD~1
git reset --mixed HEAD~1

# Hard reset - discard all changes (DANGEROUS)
git reset --hard HEAD~1

# Amend last commit
git commit --amend -m "Corrected commit message"
git add forgotten-file.txt && git commit --amend --no-edit
```

#### Safe for Shared History

```bash
# Revert commits (creates new commits)
git revert HEAD               # Revert last commit
git revert abc123            # Revert specific commit
git revert HEAD~2..HEAD      # Revert range of commits
git revert -m 1 merge-hash   # Revert merge commit
```

### Recovery Techniques

```bash
# Find lost commits
git reflog                    # Show all HEAD movements
git reflog --all             # All references

# Recover deleted commit
git checkout abc123          # Go to lost commit
git branch recovery-branch   # Create branch to save it
git switch main             # Return to main
git merge recovery-branch   # Merge recovered work

# Find dangling objects
git fsck --lost-found
```

## 8. Git Branching Mastery

### Understanding Git Branches

Branches in Git are lightweight, movable pointers to specific commits. They enable:
- **Parallel Development**: Multiple features simultaneously
- **Isolation**: Changes don't affect other work until merged
- **Experimentation**: Safe testing of new ideas
- **Collaboration**: Team members work independently

### Branch Operations

```bash
# Creating and switching branches
git branch feature-auth              # Create branch
git switch feature-auth             # Switch to branch
git switch -c feature-auth          # Create and switch
git switch -c feature-auth main     # Create from specific branch

# Branch information
git branch                          # List local branches
git branch -a                       # All branches (local + remote)
git branch -vv                      # Verbose with tracking info
git branch --merged                 # Merged branches
git branch --no-merged              # Unmerged branches

# Branch management
git branch -d feature-auth          # Delete merged branch
git branch -D feature-auth          # Force delete branch
git branch -m old-name new-name     # Rename branch
```

### Professional Branching Workflows

#### Feature Branch Workflow

```bash
# 1. Start from clean main
git switch main
git pull origin main

# 2. Create feature branch
git switch -c feature/user-dashboard

# 3. Develop with meaningful commits
git add dashboard.jsx
git commit -m "feat: implement user dashboard layout"

git add dashboard.test.js
git commit -m "test: add dashboard component tests"

# 4. Keep branch updated
git fetch origin
git rebase origin/main              # Maintain linear history

# 5. Push feature branch
git push -u origin feature/user-dashboard

# 6. Create pull/merge request
# 7. After approval and merge, cleanup
git switch main
git pull origin main
git branch -d feature/user-dashboard
```

#### Hotfix Workflow

```bash
# 1. Create hotfix from production
git switch main
git pull origin main
git switch -c hotfix/critical-security-fix

# 2. Implement minimal fix
git add security-patch.js
git commit -m "fix: patch XSS vulnerability in user input

- Sanitize HTML content before rendering
- Add input validation for forms
- Update security headers

CRITICAL: Immediate deployment required
CVE-2024-XXXX"

# 3. Fast-track to production
git switch main
git merge --no-ff hotfix/critical-security-fix
git tag -a v1.2.1 -m "Emergency security patch"
git push origin main --tags

# 4. Merge to development branch
git switch develop
git merge hotfix/critical-security-fix
git push origin develop

# 5. Cleanup
git branch -d hotfix/critical-security-fix
```

### Branch Naming Conventions

```bash
# Feature branches
feature/user-authentication
feature/payment-processing
feature/dashboard-redesign

# Bug fix branches
bugfix/login-validation
fix/api-timeout-handling

# Release branches
release/v2.1.0
release/v2.1.0-beta

# Hotfix branches
hotfix/security-patch
hotfix/critical-data-loss

# Experimental branches
experiment/new-architecture
spike/performance-testing
```

## 9. Merging vs Rebasing Strategies

### Understanding the Fundamental Difference

**Merging**: Combines branch histories while preserving the original branch structure
**Rebasing**: Replays commits from one branch onto another, creating linear history

```
Before Integration:
main:    A---B---C
              \
feature:       D---E---F

After Merge:
main:    A---B---C-------M
              \         /
feature:       D---E---F

After Rebase:
main:    A---B---C---D'---E'---F'
```

### Strategic Decision Framework

| Scenario | Strategy | Reasoning | Command |
|----------|----------|-----------|---------|
| **Public branch integration** | Merge | Preserves collaboration history | `git merge --no-ff` |
| **Local commit cleanup** | Interactive Rebase | Perfect history before sharing | `git rebase -i HEAD~3` |
| **Feature integration** | Merge or Rebase | Depends on team preference | `git merge` / `git rebase` |
| **Hotfix application** | Fast-forward | Clean, immediate fix | `git merge --ff-only` |
| **Release preparation** | Merge | Clear release milestones | `git merge --no-ff` |
| **Shared branch updates** | Merge | Never rewrite published history | `git pull` |

### Advanced Merge Techniques

#### No Fast-Forward Merge

```bash
# Preserve branch context
git switch main
git merge --no-ff feature/user-auth

# Benefits:
# - Clear feature boundaries in history
# - Easy rollback of entire features
# - Improved code archaeology
```

#### Squash Merge

```bash
# Combine all feature commits into one
git switch main
git merge --squash feature/refactor-api

# Manual commit with comprehensive message
git commit -m "refactor: modernize API architecture

- Migrate from REST to GraphQL
- Implement caching layer with Redis  
- Add comprehensive error handling
- Update API documentation

Squashed from 15 commits in feature/refactor-api
Original authors: @dev1, @dev2, @dev3"
```

#### Three-Way Merge Conflict Resolution

```bash
# During merge conflicts
git merge feature/complex-changes
# CONFLICT (content): Merge conflict in src/api.js

# Examine conflict details
git status                     # See conflicted files
git diff                       # View conflict markers

# Three-way comparison
git show :1:src/api.js > base.js    # Common ancestor
git show :2:src/api.js > ours.js    # Current branch (main)
git show :3:src/api.js > theirs.js  # Incoming branch (feature)

# Resolve using merge tool
git mergetool --tool=vscode

# Manual resolution approach
vim src/api.js
# Edit file to resolve conflicts, remove markers:
# <<<<<<< HEAD
# =======  
# >>>>>>> feature/complex-changes

# Complete merge
git add src/api.js
git commit                     # Complete merge with auto-generated message
```

### Interactive Rebase for History Curation

```bash
# Clean up last 5 commits before sharing
git rebase -i HEAD~5

# Interactive options:
# pick   = use commit as-is
# reword = change commit message  
# edit   = pause to modify commit
# squash = combine with previous commit
# fixup  = like squash but discard message
# drop   = remove commit entirely

# Example session:
pick a1b2c3d feat: add user authentication
squash e4f5g6h fix: typo in auth module  
reword h7i8j9k feat: implement password validation
edit k0l1m2n test: add authentication tests
drop n3o4p5q debug: temporary logging
```

#### Autosquash Workflow

```bash
# During development, create fixup commits
git commit -m "feat: add user dashboard"
# ... later find a bug
git add bug-fix.js
git commit --fixup HEAD~1        # Creates fixup commit

# Automatically organize during rebase
git rebase -i --autosquash HEAD~5

# Git automatically arranges:
# pick a1b2c3d feat: add user dashboard
# fixup e4f5g6h fixup! feat: add user dashboard
```

## 10. Working with Remote Repositories

### Understanding Remote Collaboration

Remote repositories serve as the central hub for team collaboration, providing:
- **Centralized Storage**: Single source of truth for project state
- **Backup**: Distributed copies prevent data loss
- **Integration**: CI/CD pipeline integration point
- **Access Control**: Permission management for team members

### Remote Configuration

```bash
# View remote information
git remote -v                           # List all remotes
git remote show origin                  # Detailed remote info

# Managing remotes
git remote add origin git@github.com:user/repo.git
git remote add upstream git@github.com:original/repo.git
git remote set-url origin git@github.com:user/new-repo.git
git remote remove old-remote

# SSH setup for GitHub
ssh-keygen -t ed25519 -C "your.email@company.com"
ssh-add ~/.ssh/id_ed25519
ssh -T git@github.com                   # Test connection
```

### Fetch, Pull, and Push Operations

```bash
# Fetching updates
git fetch origin                        # Fetch all branches
git fetch origin main                   # Fetch specific branch
git fetch --all                         # Fetch from all remotes
git fetch --prune origin               # Remove deleted remote branches

# Pulling changes
git pull origin main                    # Fetch and merge
git pull --rebase origin main          # Fetch and rebase
git pull --autostash                    # Stash, pull, unstash

# Pushing changes
git push origin main                    # Push to main branch
git push -u origin feature-branch      # Push and set upstream
git push --all origin                  # Push all branches
git push --tags origin                 # Push tags
git push --force-with-lease origin feature  # Safe force push
```

### Fork and Contribution Workflow

```bash
# 1. Fork repository on GitHub/GitLab
# 2. Clone your fork
git clone git@github.com:yourusername/project.git
cd project

# 3. Add original repository as upstream
git remote add upstream git@github.com:original/project.git

# 4. Create feature branch
git switch main
git pull upstream main                  # Sync with original
git switch -c feature/improve-docs

# 5. Make changes and commit
git add README.md
git commit -m "docs: improve installation instructions

- Add prerequisites section
- Clarify configuration steps
- Include troubleshooting guide"

# 6. Push to your fork
git push -u origin feature/improve-docs

# 7. Create pull request via GitHub/GitLab interface

# 8. Keep fork synchronized
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

## 11. Professional Git Workflows

### Git Flow: Enterprise Development Model

Git Flow provides structured branching for teams with scheduled releases and multiple environments.

#### Branch Structure and Roles

```
main (production) ←─── hotfix/* (emergency fixes)
  │                      │
  └── develop (integration) ←─── feature/* (new features)
       │
       └── release/* (stabilization)
```

**Branch Purposes:**
- **main**: Production-ready code, each commit represents a release
- **develop**: Integration branch where features come together
- **feature/***: Individual feature development branches
- **release/***: Release preparation and bug fixing
- **hotfix/***: Critical production fixes

#### Complete Git Flow Implementation

```bash
# Initial repository setup
git clone https://github.com/company/project.git
cd project
git switch -c develop
git push -u origin develop

# Feature development process
git switch develop
git pull origin develop
git switch -c feature/payment-processing

# Development with atomic commits
git add payment-service.js
git commit -m "feat: implement payment gateway integration"

git add payment-models.js
git commit -m "feat: add payment data models"

git add payment.test.js
git commit -m "test: add comprehensive payment tests"

# Keep feature updated with develop
git fetch origin
git rebase origin/develop

# Complete feature
git switch develop
git merge --no-ff feature/payment-processing
git push origin develop
git branch -d feature/payment-processing

# Release workflow
git switch develop
git pull origin develop
git switch -c release/v2.0.0

# Release preparation
echo "2.0.0" > VERSION
git add VERSION CHANGELOG.md
git commit -m "chore: bump version to 2.0.0"

# Release stabilization (bug fixes only)
git add critical-fixes.js
git commit -m "fix: resolve payment timeout issues"

# Finalize release
git switch main
git merge --no-ff release/v2.0.0
git tag -a v2.0.0 -m "Release version 2.0.0

Major Features:
- Payment processing system
- User dashboard improvements
- Performance optimizations

Bug Fixes:
- Fixed authentication timeout
- Resolved data synchronization issues"

git push origin main --tags

# Merge back to develop
git switch develop
git merge --no-ff release/v2.0.0
git push origin develop
git branch -d release/v2.0.0

# Hotfix workflow
git switch main
git pull origin main
git switch -c hotfix/database-connection

git add db-fix.js
git commit -m "fix: resolve database connection pool exhaustion

- Increase connection pool size
- Add connection timeout handling
- Implement connection retry logic

Critical fix for production stability"

# Apply hotfix
git switch main
git merge --no-ff hotfix/database-connection
git tag -a v2.0.1 -m "Hotfix: database connection stability"
git push origin main --tags

# Merge to develop
git switch develop
git merge --no-ff hotfix/database-connection
git push origin develop
git branch -d hotfix/database-connection
```

**When to Use Git Flow:**
- Teams with scheduled releases
- Multiple environments (dev, staging, production)
- Need for parallel development and maintenance
- Strict quality control requirements

### Trunk-Based Development

Trunk-based development emphasizes short-lived branches and frequent integration, promoting continuous integration.

#### Core Philosophy

```
main ←─── short-feature (< 2 days)
  │   ←─── bug-fix (< 1 day)
  └   ←─── direct-commits (small changes)
```

**Principles:**
- **Short-lived branches**: Maximum 1-2 days before merging
- **Frequent integration**: Multiple commits to main daily
- **Feature flags**: Control incomplete features in production
- **Comprehensive CI/CD**: Automated testing and deployment

#### Implementation Strategies

```bash
# Small changes go directly to main
git switch main
git pull origin main

git add minor-fix.js
git commit -m "fix: correct typo in error message"
git push origin main

# Short-lived feature branches
git switch main
git pull origin main
git switch -c quick-improvement-$(date +%Y%m%d)

# Rapid development (same day completion)
git add new-utility.js
git commit -m "feat: add input validation utility

- Support email validation
- Support phone number validation  
- Add comprehensive test coverage"

# Fast integration
git switch main
git pull origin main
git merge --ff-only quick-improvement-20240129
git push origin main
git branch -d quick-improvement-20240129

# Feature flags for larger work
git add feature-flags.js
git commit -m "feat: add feature flag infrastructure"

git add new-dashboard.js  
git commit -m "feat: add new dashboard (behind feature flag)

- Implement redesigned user interface
- Add real-time data updates
- Improve mobile responsiveness

Feature controlled by ENABLE_NEW_DASHBOARD flag
Default: disabled in production"

git push origin main
```

**When to Use Trunk-Based Development:**
- Small to medium teams (2-10 developers)
- Fast iteration cycles
- Strong automated testing infrastructure
- Continuous deployment practices
- SaaS products with frequent releases

### Ship/Show/Ask Strategy

Ship/Show/Ask categorizes changes based on risk level and required collaboration.

#### Decision Framework

```
Risk Assessment → Strategy Selection → Implementation
     ↓                    ↓                  ↓
   Low Risk            🚢 SHIP         Direct push
  Medium Risk          🎭 SHOW         PR + CI validation  
   High Risk           ❓ ASK          PR + manual review
```

#### Implementation Guidelines

**🚢 SHIP (Low Risk - Direct Push)**
```bash
# Documentation, minor fixes, configuration updates
git add README.md
git commit -m "docs: clarify installation steps"
git push origin main
```

**🎭 SHOW (Medium Risk - Automated Review)**
```bash
# Performance improvements, refactoring, test additions
git switch -c show/optimize-queries
git add optimized-queries.js
git commit -m "perf: optimize database queries

- Replace N+1 queries with batch loading
- Add query result caching
- Reduce average response time by 60%"

git push -u origin show/optimize-queries
# Create PR with automated merge after CI passes
```

**❓ ASK (High Risk - Manual Review)**
```bash
# New features, architecture changes, breaking changes
git switch -c ask/payment-system
git add payment/
git commit -m "feat: implement multi-provider payment system

- Support Stripe, PayPal, and Square
- Add fraud detection capabilities
- Implement payment retry mechanisms
- Include comprehensive audit logging

Breaking changes: Payment API restructured
Requires security team review"

git push -u origin ask/payment-system
# Create PR requiring manual approval from relevant teams
```

## 12. Git Ignore and File Management

### Understanding .gitignore

The `.gitignore` file specifies intentionally untracked files that Git should ignore.

```gitignore
# Dependencies
node_modules/
vendor/
*.egg-info/

# Build outputs
dist/
build/
target/
*.min.js
*.min.css

# Environment configuration
.env
.env.local
.env.*.local
!.env.example

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Operating system files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
Desktop.ini

# Logs and databases
*.log
logs/
*.sqlite
*.db

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Temporary files
tmp/
temp/
*.tmp

# Archive files
*.zip
*.tar.gz
*.rar

# Application specific
uploads/
cache/
.cache/

# Security and secrets
*.pem
*.key
*.p12
config/secrets.yml
```

### Advanced File Management

```bash
# Check if file is ignored
git check-ignore filename.txt
git check-ignore -v filename.txt      # Verbose output with rule

# List all ignored files
git ls-files --others --ignored --exclude-standard

# Force add ignored file (when necessary)
git add -f important-config.txt

# Stop tracking already tracked file
git rm --cached secret-file.txt
echo "secret-file.txt" >> .gitignore
git add .gitignore
git commit -m "stop tracking secret file"

# Temporarily ignore tracked files (local only)
git update-index --skip-worktree config.json
git update-index --no-skip-worktree config.json

# Global gitignore for user-specific files
git config --global core.excludesfile ~/.gitignore_global
```

### Git Attributes for Advanced File Handling

```gitattributes
# .gitattributes file for repository-specific handling

# Text files
*.txt text
*.md text
*.js text eol=lf
*.css text eol=lf

# Binary files  
*.png binary
*.jpg binary
*.ico binary

# Archive files
*.zip binary
*.tar.gz binary

# Language-specific settings
*.java text diff=java
*.html text diff=html
*.css text diff=css

# Merge strategies for specific files
package-lock.json merge=ours
yarn.lock merge=ours

# Large files with Git LFS
*.psd filter=lfs diff=lfs merge=lfs -text
*.ai filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
```

## 13. Git Stashing for Context Switching

Stashing temporarily saves work in progress when you need to quickly switch contexts.

### Basic Stashing Operations

```bash
# Save current work
git stash                             # Quick stash with auto-generated message
git stash push -m "WIP: user authentication feature"  # Named stash
git stash push -u                     # Include untracked files
git stash push -a                     # Include untracked and ignored files

# View stashed work
git stash list                        # Show all stashes
git stash show                        # Show latest stash changes
git stash show stash@{1}             # Show specific stash
git stash show -p stash@{1}          # Show patch details

# Retrieve stashed work
git stash pop                         # Apply latest and remove from stash
git stash apply                       # Apply latest but keep in stash
git stash apply stash@{2}            # Apply specific stash
git stash drop stash@{1}             # Delete specific stash
git stash clear                       # Remove all stashes
```

### Advanced Stashing Techniques

```bash
# Partial stashing
git stash push -p                     # Interactive stashing
git stash push -m "UI changes" -- src/components/  # Stash specific paths
git stash push --keep-index          # Stash unstaged changes only

# Creating branches from stashes
git stash branch feature-branch stash@{1}  # Create branch and apply stash

# Stashing specific file types
git stash push -m "config changes" -- "*.config.js"
```

### Professional Stashing Workflow

```bash
# Context switching scenario
git status                            # Check current work
git stash push -m "WIP: implementing user dashboard

- Added dashboard component structure
- Working on data fetching logic
- Tests partially complete"

git switch hotfix/critical-bug        # Switch to urgent work
# ... fix critical bug ...
git switch feature/user-dashboard     # Return to original work

git stash list                        # Find your stash
git stash pop                         # Resume where you left off
```

## 14. Cherry-Picking for Selective Integration

Cherry-picking applies specific commits from one branch to another, useful for selective bug fixes and feature porting.

### Basic Cherry-Pick Operations

```bash
# Apply specific commit
git cherry-pick abc123

# Apply multiple commits
git cherry-pick abc123 def456 ghi789

# Apply commit range (exclusive start, inclusive end)
git cherry-pick abc123..ghi789

# Cherry-pick without committing
git cherry-pick --no-commit abc123
git cherry-pick -n def456             # Short form

# Edit commit message during cherry-pick
git cherry-pick --edit abc123
```

### Handling Cherry-Pick Conflicts

```bash
# When conflicts occur
git cherry-pick feature-commit
# CONFLICT (content): Merge conflict in src/api.js

# Resolve conflicts manually
git status                            # See conflicted files
vim src/api.js                        # Edit and resolve conflicts

# Continue cherry-pick
git add src/api.js
git cherry-pick --continue

# Alternative options
git cherry-pick --abort               # Abort and return to original state
git cherry-pick --skip                # Skip current commit and continue
```

### Professional Cherry-Pick Workflows

```bash
# Hotfix propagation across branches
git switch main
git cherry-pick security-fix-commit

git switch release/v2.1
git cherry-pick security-fix-commit

git switch develop  
git cherry-pick security-fix-commit

# Feature backporting
git switch release/v1.5
git cherry-pick feature-enhancement-commit

# Selective integration from feature branch
git log --oneline feature/large-refactor  # Review available commits
git cherry-pick a1b2c3d                   # Pick specific improvements
git cherry-pick e4f5g6h                   # Pick bug fixes
# Skip unstable or experimental commits
```

## 15. Security and Best Practices

### Commit Security

```bash
# GPG commit signing for authenticity
git config --global commit.gpgsign true
git config --global user.signingkey YOUR_GPG_KEY_ID

# Generate GPG key if needed
gpg --full-generate-key
gpg --list-secret-keys --keyid-format LONG
git config --global user.signingkey YOUR_KEY_ID
```

### Preventing Sensitive Data Exposure

```bash
# Pre-commit hooks to prevent secrets
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

# Check for potential secrets in staged files
if git diff --cached --name-only | xargs grep -E "(password|api[_-]?key|secret|token)" >/dev/null 2>&1; then
    echo "❌ Potential secret detected in staged files!"
    echo "Please review your changes and use environment variables for sensitive data."
    exit 1
fi

# Run linting and tests
npm run lint && npm test
EOF

chmod +x .git/hooks/pre-commit
```

### Repository Maintenance

```bash
# Regular repository cleanup
git gc --aggressive --prune=now       # Garbage collection
git remote prune origin               # Remove stale remote branches
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d

# Repository health check
git fsck --full                       # Check repository integrity
git count-objects -vH                 # Repository size analysis

# Performance optimization
git config --global core.preloadindex true
git config --global core.fscache true
git config --global pack.threads 0
```

### Team Collaboration Standards

```bash
# Configure useful aliases
git config --global alias.co checkout
git config --global alias.br branch  
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Professional log alias
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Branch management aliases
git config --global alias.recent "for-each-ref --sort=-committerdate refs/heads/ --format='%(committerdate:short) %(refname:short)'"
git config --global alias.cleanup "!git branch --merged | grep -v '\\*\\|main\\|develop' | xargs -n 1 git branch -d"
```

## Conclusion

This comprehensive Git guide provides the foundation for professional software development workflows. Key takeaways:

### Fundamental Skills
- **Three-state architecture**: Understanding working directory, staging area, and repository
- **Branching mastery**: Creating, managing, and merging branches effectively
- **History management**: Using logs, diffs, and recovery techniques

### Professional Workflows
- **Git Flow**: Structured branching for enterprise environments
- **Trunk-based development**: Continuous integration with short-lived branches
- **Ship/Show/Ask**: Risk-based decision making for change integration

### Advanced Techniques
- **Interactive rebasing**: Curating commit history for clarity
- **Cherry-picking**: Selective change integration across branches
- **Stashing**: Efficient context switching during development

### Collaboration Excellence
- **Remote repositories**: Effective team coordination and code sharing
- **Conflict resolution**: Systematic approach to merge conflicts
- **Security practices**: Protecting sensitive data and ensuring authenticity

### Best Practices
- **Commit quality**: Atomic commits with clear, conventional messages
- **Branch hygiene**: Regular cleanup and meaningful naming conventions
- **Repository maintenance**: Performance optimization and integrity checks

Git's true power emerges through disciplined usage, clear team conventions, and deep understanding of its distributed nature. Start with solid fundamentals, gradually adopt advanced techniques, and always prioritize clear communication through excellent commit practices.

Remember: Git is not just version control—it's a collaboration platform that enables teams to build exceptional software together. Master these concepts, choose appropriate workflows for your context, and maintain clean, secure repositories that serve as the foundation for successful software projects.
