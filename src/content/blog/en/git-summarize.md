---
title: The Complete Git Guide - From Basics to Advanced Workflows
slug: en/git-summarize
image:
  src: /covers/git-summarize.webp
  alt: Git version control comprehensive guide
author: Cristian Arando
language: en
tags: [best practices, development]
publishDate: "2025-07-24"
authorContact: crisarandosyse@gmail.com
readTime: 25 min
excerpt: A comprehensive guide to Git covering everything from basic concepts to advanced workflows, branching strategies, and best practices for professional development teams.
---

## 1. Understanding Version Control

Version control is a system that records and manages changes to files over time, enabling developers to:

### Why Version Control Matters

**For Individual Developers:**
- **Track Changes**: See exactly what changed, when, and why
- **Backup & Recovery**: Never lose work with distributed backups
- **Experimentation**: Try new features without fear of breaking working code
- **Release Management**: Tag and maintain multiple versions of your software

**For Teams:**
- **Collaboration**: Multiple developers working on the same codebase simultaneously
- **Conflict Resolution**: Intelligent merging of concurrent changes
- **Code Review**: Systematic examination of changes before integration
- **Accountability**: Track who made what changes and when

### Evolution of Version Control Systems

**First Generation: Local Systems**
- Single computer, local database
- Examples: RCS (Revision Control System)
- Limitation: No collaboration capabilities

**Second Generation: Centralized Systems**
- Central server stores all versions
- Examples: CVS, Subversion (SVN)
- Limitation: Single point of failure, requires network connection

**Third Generation: Distributed Systems**
- Every developer has complete history
- Examples: Git, Mercurial, Bazaar
- Advantages: Offline work, multiple backups, flexible workflows

### Key Concepts in Version Control

**Repository (Repo)**: Database containing all versions of your project files and their complete history.

**Commit**: Snapshot of your project at a specific point in time, with a unique identifier and descriptive message.

**Branch**: Independent line of development, allowing parallel work on different features.

**Merge**: Process of combining changes from different branches into a single branch.

**Conflict**: Situation where the same lines of code are modified differently in branches being merged.

## 2. Git Fundamentals

Git is a distributed version control system designed for speed, simplicity, and strong support for non-linear development workflows. Created by Linus Torvalds in 2005 for Linux kernel development, Git has become the de facto standard for version control in software development.

### What Makes Git Special

**Distributed Architecture**: Unlike centralized systems, every Git repository contains the complete history and full version-tracking capabilities. This means:
- You can work offline
- Every clone is a full backup
- No single point of failure
- Multiple workflow options

**Snapshot-Based Storage**: Git stores snapshots of your entire project, not just differences between files. This approach:
- Makes branching and merging faster
- Provides better data integrity
- Enables efficient compression
- Simplifies complex operations

**Cryptographic Integrity**: Everything in Git is checksummed using SHA-1 hashes:
- Prevents data corruption
- Ensures content authenticity
- Makes it impossible to change history without detection
- Provides unique identifiers for every object

### Git vs Other Version Control Systems

| Feature | Git | Subversion (SVN) | Perforce |
|---------|-----|------------------|----------|
| **Architecture** | Distributed | Centralized | Centralized |
| **Offline Work** | Full functionality | Limited | None |
| **Branching** | Lightweight, instant | Heavy, slow | Moderate |
| **Merging** | Advanced algorithms | Basic | Manual |
| **Storage** | Snapshots | Deltas | Deltas |
| **Performance** | Very fast | Moderate | Fast |
| **Learning Curve** | Steep initially | Gentle | Moderate |

### Git Terminology Deep Dive

**Working Directory**: Your local file system where you edit files. This is what you see in your file explorer - the actual files you're working on.

**Staging Area (Index)**: A intermediate area where you prepare commits. Think of it as a "shopping cart" where you add changes before "purchasing" (committing) them.

**Repository (.git directory)**: Where Git stores all the metadata and object database for your project. Contains all the history, branches, and configuration.

**Remote**: A version of your repository hosted elsewhere (GitHub, GitLab, etc.), used for collaboration and backup.

**HEAD**: A pointer to the current branch reference, essentially telling you what commit you're currently on.

**Origin**: The default name for the remote repository you cloned from. Just a naming convention, not a special concept.

### Basic Git Data Flow

```
Working Directory → Staging Area → Repository → Remote Repository
      ↓                ↓              ↓            ↓
   git add        git commit     git push    collaboration
```

Understanding this flow is crucial for effective Git usage. Each stage serves a specific purpose:

1. **Working Directory**: Where you make changes
2. **Staging Area**: Where you prepare what to commit
3. **Local Repository**: Where commits are permanently stored
4. **Remote Repository**: Where you share with others

## 3. Git's Three-State Architecture

Understanding Git's three-state architecture is fundamental to mastering version control. This conceptual model governs how Git tracks and manages your files throughout their lifecycle.

### The Three States Explained

```
Working Directory → Staging Area → Local Repository → Remote Repository
     (Modified)      (Staged)       (Committed)        (Pushed)
        ↓               ↓              ↓                ↓
   Edit files      git add file   git commit      git push origin
```

#### 1. Modified (Working Directory)
Files that have been changed but not yet prepared for commit.

```bash
# Check what's modified
git status
git diff                    # See exact changes
git diff --name-only       # Just file names
git diff --stat            # Summary of changes
```

**Characteristics:**
- Files exist in your file system
- Changes are not tracked by Git yet
- Can be easily lost if not careful
- Visible in `git status` as "modified" or "untracked"

#### 2. Staged (Staging Area/Index)
Files that have been marked to go into the next commit.

```bash
# Stage specific files
git add filename.txt
git add *.js               # All JavaScript files
git add .                  # All changes in current directory
git add -A                 # All changes in entire repository

# Interactive staging
git add -p                 # Review and stage chunks
git add -i                 # Interactive mode

# Check staged changes
git diff --staged          # See what's staged
git diff --cached          # Alternative command
git status                 # Overview of staged/unstaged
```

**Staging Best Practices:**
- Stage related changes together
- Use `git add -p` for partial file staging
- Review staged changes before committing
- Stage frequently to avoid losing work

#### 3. Committed (Local Repository)
Files safely stored in your local Git database.

```bash
# Create commits
git commit -m "Add user authentication feature"
git commit -am "Fix bug and update docs"  # Add and commit
git commit --amend                        # Modify last commit

# View committed changes
git log                    # View commit history
git log --oneline         # Condensed view
git show HEAD             # Show last commit
git show <commit-hash>    # Show specific commit
```

**Commit Characteristics:**
- Permanent record in Git history
- Includes author, timestamp, and message
- Assigned unique SHA-1 hash
- Can be shared with others via push

### Visual Representation

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Working Dir     │    │ Staging Area    │    │ Git Repository  │
│                 │    │                 │    │                 │
│ file1.txt (M)   │───►│ file1.txt       │───►│ commit abc123   │
│ file2.js (M)    │    │ file3.py        │    │ commit def456   │
│ file3.py (M)    │    │                 │    │ commit ghi789   │
│ new-file.css    │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

Legend: (M) = Modified, staged files ready for commit

### File Lifecycle States

Git files can be in one of several states:

**Untracked**: New files that Git isn't monitoring
```bash
# See untracked files
git status -u
git ls-files --others --exclude-standard
```

**Tracked**: Files Git knows about, subdivided into:
- **Unmodified**: No changes since last commit
- **Modified**: Changed but not staged
- **Staged**: Ready for next commit

**Ignored**: Files explicitly ignored via `.gitignore`
```bash
# Check if file is ignored
git check-ignore filename.txt
git status --ignored
```

### State Transitions

Understanding how files move between states:

```bash
# Untracked → Staged
git add new-file.txt

# Modified → Staged
git add existing-file.txt

# Staged → Committed
git commit -m "Commit message"

# Committed → Modified (edit file)
echo "new content" >> file.txt

# Staged → Modified (unstage)
git reset HEAD file.txt
git restore --staged file.txt  # Git 2.23+

# Modified → Unmodified (discard changes)
git checkout -- file.txt
git restore file.txt           # Git 2.23+
```

### Practical Workflow Example

```bash
# 1. Start with clean working directory
git status  # Should show "working tree clean"

# 2. Create/modify files (Working Directory)
echo "console.log('Hello');" > app.js
echo "# My Project" > README.md

# 3. Check status
git status
# Shows:
# Untracked files: app.js, README.md

# 4. Stage files (Staging Area)
git add app.js
git add README.md

# 5. Check status again
git status
# Shows:
# Changes to be committed: app.js, README.md

# 6. Commit (Local Repository)
git commit -m "Initial project setup with app.js and README"

# 7. Verify commit
git log --oneline
git status  # Should show "working tree clean"
```

### Common Misconceptions

**"Staging is unnecessary"**: While you can use `git commit -a`, staging allows for:
- Better commit organization
- Partial file commits
- Review before committing
- More intentional version control

**"Modified means staged"**: Modified files must be explicitly staged. Git doesn't automatically include modifications in commits.

**"Commits are immediately shared"**: Commits are local until pushed to a remote repository.

Understanding these three states provides the foundation for all Git operations and helps avoid common mistakes like losing work or creating unclear commit history.

## 4. Git Configuration

Proper Git configuration is essential for a smooth development experience. Git operates at three configuration levels, each with different scopes and priorities.

### Configuration Levels

Git configuration works in a hierarchical system:

1. **System level** (`--system`): Applies to all users and repositories on the machine
2. **Global level** (`--global`): Applies to all repositories for the current user
3. **Local level** (`--local`): Applies only to the specific repository

**Priority Order**: Local → Global → System (local settings override global, global overrides system)

### Essential Initial Configuration

#### 4.1 User Identity Setup

Your identity is attached to every commit, making this configuration crucial:

```bash
# Global configuration (recommended for personal machines)
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"

# Local configuration (useful for work projects)
git config --local user.name "Your Work Name"
git config --local user.email "work.email@company.com"

# Verify identity
git config user.name
git config user.email
```

**Best Practices:**
- Use your real name, not a username
- Use an email that matches your Git hosting service (GitHub, GitLab)
- Set up different emails for work vs personal projects

#### 4.2 Default Editor Configuration

Configure your preferred editor for commit messages and Git operations:

```bash
# Visual Studio Code
git config --global core.editor "code --wait"

# Vim (advanced users)
git config --global core.editor "vim"

# Nano (beginner-friendly)
git config --global core.editor "nano"

# Sublime Text
git config --global core.editor "subl -w"

# Notepad++ (Windows)
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

#### 4.3 Default Branch Configuration

Modern Git allows you to set the default branch name:

```bash
# Set default branch name for new repositories
git config --global init.defaultBranch main

# Alternative names some teams use
git config --global init.defaultBranch develop
git config --global init.defaultBranch master  # Traditional default
```

### Advanced Configuration Options

#### 4.4 Merge and Pull Behavior

```bash
# Configure pull behavior (recommended for beginners)
git config --global pull.rebase false   # Merge (creates merge commits)
git config --global pull.rebase true    # Rebase (linear history)
git config --global pull.ff only        # Fast-forward only

# Configure merge tool
git config --global merge.tool vimdiff  # Built-in diff tool
git config --global merge.tool vscode   # VS Code as merge tool
```

#### 4.5 Output and Display Configuration

```bash
# Enable colored output (usually default)
git config --global color.ui auto
git config --global color.branch auto
git config --global color.diff auto
git config --global color.status auto

# Configure paging
git config --global core.pager "less -R"
git config --global pager.diff false     # Disable pager for git diff

# Show file status in short format
git config --global status.short true
```

#### 4.6 Performance and Algorithm Settings

```bash
# Better diff algorithm for complex changes
git config --global diff.algorithm histogram

# Enable parallel processing
git config --global core.preloadindex true

# Optimize for large repositories
git config --global core.fscache true      # Windows only
git config --global pack.threads 0         # Use all available cores
```

#### 4.7 Security and Credential Management

```bash
# Credential caching (saves authentication temporarily)
git config --global credential.helper cache                    # Linux/macOS
git config --global credential.helper manager                  # Windows
git config --global credential.helper 'cache --timeout=3600'   # 1 hour cache

# GPG signing (advanced security)
git config --global user.signingkey YOUR_GPG_KEY_ID
git config --global commit.gpgsign true

# Push configuration for security
git config --global push.default simple
```

### Configuration File Locations

Understanding where Git stores configuration helps with troubleshooting:

```bash
# System configuration
/etc/gitconfig                    # Linux/macOS
C:\Program Files\Git\etc\gitconfig # Windows

# Global configuration
~/.gitconfig                      # Linux/macOS
C:\Users\{username}\.gitconfig    # Windows

# Local configuration
{repository}/.git/config          # Repository-specific
```

### Viewing and Managing Configuration

```bash
# List all configuration
git config --list
git config --list --show-origin    # Show where each setting comes from
git config --list --show-scope     # Show the scope of each setting

# View specific settings
git config user.name
git config --global user.email
git config --local core.editor

# Edit configuration directly
git config --global --edit         # Opens global config in editor
git config --local --edit          # Opens local config in editor

# Unset configuration values
git config --global --unset user.email
git config --local --unset core.editor
```

### Professional Configuration Template

Here's a comprehensive configuration suitable for professional development:

```bash
# Identity
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"

# Editor and tools
git config --global core.editor "code --wait"
git config --global merge.tool vscode
git config --global diff.tool vscode

# Default behaviors
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global push.default simple

# Display preferences
git config --global color.ui auto
git config --global diff.algorithm histogram

# Performance
git config --global core.preloadindex true
git config --global pack.threads 0

# Credential management
git config --global credential.helper cache

# Aliases for common commands (covered in advanced section)
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

### Configuration Troubleshooting

**Problem**: Git doesn't recognize your commits
```bash
# Check if user identity is set
git config user.name
git config user.email

# If empty, set them
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Problem**: Wrong editor opens for commit messages
```bash
# Check current editor
git config core.editor

# Set preferred editor
git config --global core.editor "code --wait"
```

**Problem**: Conflicting configurations
```bash
# Check all configurations and their sources
git config --list --show-origin

# Remove problematic local setting
git config --local --unset problematic.setting
```

Proper configuration sets the foundation for a productive Git workflow and prevents many common issues developers encounter.

## 5. Repository Creation and Initialization

Git repositories are the foundation of version control. Understanding how to create, clone, and set up repositories properly is essential for effective Git usage.

### 5.1 Initializing a New Repository

Creating a Git repository transforms any directory into a version-controlled project.

#### Basic Initialization

```bash
# Create new project directory and initialize
mkdir my-awesome-project
cd my-awesome-project
git init

# Alternative: Create and initialize in one command
git init my-awesome-project
cd my-awesome-project
```

#### What Happens During Initialization

When you run `git init`, Git creates a hidden `.git` directory containing:

```
.git/
├── HEAD              # Points to current branch
├── config            # Repository-specific configuration
├── description       # Repository description file
├── hooks/            # Custom scripts for Git events
├── info/             # Global exclude file
├── objects/          # Git object database
└── refs/             # References (branches, tags)
```

#### Verify Initialization

```bash
# Check if directory is a Git repository
git status

# View Git directory contents
ls -la .git/

# Check current branch
git branch
```

#### Initialize with Specific Template

```bash
# Initialize with custom template directory
git init --template=/path/to/template

# Initialize with specific branch name
git init --initial-branch=main
git init -b main  # Short form
```

### 5.2 Cloning Existing Repositories

Cloning creates a local copy of a remote repository with full history and all branches.

#### Basic Cloning

```bash
# Clone via HTTPS (works everywhere, requires authentication)
git clone https://github.com/username/repository.git

# Clone via SSH (requires SSH key setup, more secure)
git clone git@github.com:username/repository.git

# Clone into specific directory
git clone https://github.com/username/repository.git my-project-name
```

#### Advanced Cloning Options

```bash
# Clone specific branch only
git clone -b feature-branch https://github.com/username/repository.git

# Clone with specific depth (shallow clone)
git clone --depth 1 https://github.com/username/repository.git
git clone --depth 10 https://github.com/username/repository.git

# Clone without downloading history (just latest state)
git clone --depth 1 --no-tags https://github.com/username/repository.git

# Clone only specific directory (sparse checkout)
git clone --filter=blob:none --sparse https://github.com/username/repository.git
cd repository
git sparse-checkout set desired-directory/
```

#### Clone Configuration

```bash
# Clone with different remote name (default is 'origin')
git clone -o upstream https://github.com/username/repository.git

# Clone with different default branch
git clone -b develop https://github.com/username/repository.git

# Clone without checkout (just .git directory)
git clone --bare https://github.com/username/repository.git repository.git
```

### 5.3 Repository Setup Best Practices

#### Initial Repository Structure

After initializing or cloning, set up your repository structure:

```bash
# Create essential files
touch README.md
touch .gitignore
touch LICENSE

# Create basic directory structure
mkdir src
mkdir docs
mkdir tests

# Add initial content
echo "# My Awesome Project" > README.md
echo "node_modules/" > .gitignore
echo "*.log" >> .gitignore
```

#### Configure Repository-Specific Settings

```bash
# Set local user (if different from global)
git config user.name "Project Specific Name"
git config user.email "project@email.com"

# Set up tracking for main branch
git branch --set-upstream-to=origin/main main

# Configure push behavior for this repository
git config push.default current
```

### 5.4 Working with Multiple Remotes

Sometimes you need to work with multiple remote repositories (e.g., forking workflow).

#### Adding Multiple Remotes

```bash
# Clone your fork
git clone git@github.com:yourname/project.git
cd project

# Add original repository as upstream
git remote add upstream git@github.com:original/project.git

# Verify remotes
git remote -v
# origin    git@github.com:yourname/project.git (fetch)
# origin    git@github.com:yourname/project.git (push)
# upstream  git@github.com:original/project.git (fetch)
# upstream  git@github.com:original/project.git (push)
```

#### Managing Multiple Remotes

```bash
# Fetch from all remotes
git fetch --all

# Fetch from specific remote
git fetch upstream

# Push to specific remote
git push origin feature-branch
git push upstream main

# Set different URLs for fetch and push
git remote set-url --push origin git@github.com:yourname/project.git
git remote set-url origin https://github.com/original/project.git
```

### 5.5 Repository Verification and Troubleshooting

#### Verify Repository Health

```bash
# Check repository integrity
git fsck

# Verify all objects
git fsck --full

# Check for common issues
git status
git remote -v
git branch -a
```

#### Common Repository Issues

**Problem**: Repository not recognized
```bash
# Check if .git directory exists
ls -la .git

# Re-initialize if necessary
git init
```

**Problem**: Wrong remote URL
```bash
# Check current remotes
git remote -v

# Change remote URL
git remote set-url origin new-url
```

**Problem**: Permission denied when cloning
```bash
# Check SSH key setup
ssh -T git@github.com

# Or clone via HTTPS
git clone https://github.com/username/repository.git
```

### 5.6 Repository Templates and Automation

#### Creating Repository Templates

```bash
# Create template directory
mkdir ~/.git-templates/hooks

# Add template hook
cat > ~/.git-templates/hooks/pre-commit << 'EOF'
#!/bin/sh
# Run tests before each commit
npm test
EOF

chmod +x ~/.git-templates/hooks/pre-commit

# Configure Git to use template
git config --global init.templateDir ~/.git-templates
```

#### Automated Repository Setup Script

```bash
#!/bin/bash
# setup-repo.sh - Automated repository setup

PROJECT_NAME=$1
TEMPLATE_TYPE=${2:-basic}

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./setup-repo.sh <project-name> [template-type]"
    exit 1
fi

# Create and initialize repository
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"
git init

# Create basic structure based on template
case $TEMPLATE_TYPE in
    "node")
        npm init -y
        echo "node_modules/" > .gitignore
        echo "*.log" >> .gitignore
        echo ".env" >> .gitignore
        ;;
    "python")
        echo "__pycache__/" > .gitignore
        echo "*.pyc" >> .gitignore
        echo ".env" >> .gitignore
        echo "venv/" >> .gitignore
        ;;
    *)
        echo "# $PROJECT_NAME" > README.md
        touch .gitignore
        ;;
esac

# Initial commit
git add .
git commit -m "Initial commit: Setup $PROJECT_NAME"

echo "Repository $PROJECT_NAME created successfully!"
```

Understanding repository creation and initialization provides the foundation for all Git operations and ensures your projects start with proper version control setup.

## 6. Basic Git Workflow

The basic Git workflow is the foundation of version control. Mastering these fundamental operations enables you to track changes, create meaningful commits, and maintain a clean project history.

### The Standard Git Workflow Cycle

```
1. Modify files → 2. Stage changes → 3. Commit changes → 4. (Optional) Push to remote
      ↓                    ↓                ↓                      ↓
   Edit code           git add          git commit            git push
```

### 6.1 Checking Repository Status

Understanding your repository's current state is crucial before making any changes.

#### Basic Status Commands

```bash
# Detailed status with helpful hints
git status

# Short format status
git status -s
git status --short

# Porcelain format (machine-readable)
git status --porcelain

# Show ignored files too
git status --ignored

# Show individual file status
git status filename.txt
```

#### Understanding Status Output

**Detailed Status Example:**
```
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/app.js
        new file:   src/utils.js

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        config.json
```

**Short Status Format:**
```
M  src/app.js     # Modified and staged
A  src/utils.js   # Added (new file) and staged
 M README.md      # Modified but not staged
?? config.json    # Untracked file
```

**Status Code Legend:**
- `??` = Untracked
- `A` = Added (staged)
- `M` = Modified
- `D` = Deleted
- `R` = Renamed
- `C` = Copied
- `U` = Updated but unmerged

### 6.2 Adding Changes to Staging Area

The staging area allows you to selectively prepare changes for commit.

#### Basic Staging Operations

```bash
# Stage specific file
git add filename.txt

# Stage multiple specific files
git add file1.txt file2.js config.json

# Stage all changes in current directory and subdirectories
git add .

# Stage all changes in entire repository
git add -A
git add --all

# Stage all tracked files (excludes new files)
git add -u
git add --update
```

#### Pattern-Based Staging

```bash
# Stage all JavaScript files
git add "*.js"
git add src/**/*.js

# Stage all files in specific directory
git add src/
git add tests/

# Stage files with specific extension
git add *.css *.html

# Stage files matching complex pattern
git add "src/**/*.{js,ts,jsx,tsx}"
```

#### Interactive and Selective Staging

```bash
# Interactive staging menu
git add -i
git add --interactive

# Patch mode - stage parts of files
git add -p filename.txt
git add --patch

# Edit hunks manually before staging
git add -e filename.txt
git add --edit
```

**Patch Mode Commands:**
- `y` = Yes, stage this hunk
- `n` = No, don't stage this hunk
- `s` = Split hunk into smaller parts
- `e` = Edit hunk manually
- `q` = Quit patch mode
- `?` = Help

#### Advanced Staging Techniques

```bash
# Stage only tracked files that are modified
git add -u

# Stage and remove deleted files
git add -A

# Intent to add (stage file path without content)
git add -N new-file.txt
git add --intent-to-add new-file.txt

# Force add ignored files
git add -f ignored-file.txt
git add --force ignored-file.txt
```

### 6.3 Unstaging Changes

Sometimes you need to remove files from the staging area without losing changes.

#### Modern Unstaging (Git 2.23+)

```bash
# Unstage specific file
git restore --staged filename.txt

# Unstage multiple files
git restore --staged file1.txt file2.js

# Unstage all files
git restore --staged .
```

#### Traditional Unstaging

```bash
# Unstage specific file
git reset filename.txt
git reset HEAD filename.txt

# Unstage all files
git reset
git reset HEAD

# Unstage and keep changes in working directory
git reset --mixed filename.txt
```

#### Understanding the Difference

```bash
# Example workflow
echo "new content" >> file.txt
git add file.txt                    # File is staged
git restore --staged file.txt       # File is unstaged, changes remain
git status                          # Shows file as modified (unstaged)

# vs.
git add file.txt                    # File is staged
git reset --hard HEAD               # File is unstaged AND changes are lost!
```

### 6.4 Creating Commits

Commits are snapshots of your project at specific points in time.

#### Basic Commit Operations

```bash
# Simple commit with message
git commit -m "Add user authentication feature"

# Multi-line commit message
git commit -m "Add user authentication" \
           -m "- Implement login/logout functionality" \
           -m "- Add password validation" \
           -m "- Create user session management"

# Open editor for detailed commit message
git commit

# Commit with automatic staging of tracked files
git commit -a -m "Fix login bug and update documentation"
git commit -am "Fix login bug and update documentation"  # Short form
```

#### Advanced Commit Options

```bash
# Amend last commit (change message or add files)
git add forgotten-file.txt
git commit --amend -m "New commit message"

# Amend without changing message
git add forgotten-file.txt
git commit --amend --no-edit

# Create empty commit (useful for CI triggers)
git commit --allow-empty -m "Trigger deployment"

# Commit with specific date
git commit --date="2023-12-01 10:00:00" -m "Backdated commit"

# Sign commit with GPG
git commit -S -m "Signed commit for security"
```

#### Commit Message Best Practices

**Format Convention:**
```
type(scope): brief description

More detailed explanation if needed.

- List specific changes
- Reference issues: Fixes #123
- Include breaking change notes

Co-authored-by: Name <email@example.com>
```

**Common Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Good Commit Messages:**
```bash
git commit -m "feat(auth): add JWT token validation"
git commit -m "fix(ui): resolve button alignment issue on mobile"
git commit -m "docs: update API documentation for v2.0"
git commit -m "refactor: extract user service into separate module"
```

### 6.5 Viewing Changes

Before committing, it's important to review what you're about to commit.

```bash
# See unstaged changes
git diff

# See staged changes
git diff --staged
git diff --cached

# See changes in specific file
git diff filename.txt
git diff --staged filename.txt

# Compare with specific commit
git diff HEAD~1
git diff abc123..def456

# Word-level diff
git diff --word-diff

# Ignore whitespace changes
git diff --ignore-all-space
```

### 6.6 Complete Workflow Example

Here's a practical example of the basic Git workflow:

```bash
# 1. Start with clean working directory
git status
# Output: working tree clean

# 2. Create/modify files
echo "console.log('Hello World');" > app.js
echo "# My Project" > README.md
mkdir src
echo "export default class User {}" > src/User.js

# 3. Check status
git status
# Shows: 3 untracked files

# 4. Stage files selectively
git add app.js README.md          # Stage specific files
git add src/                      # Stage entire directory

# 5. Review staged changes
git diff --staged

# 6. Create commit
git commit -m "feat: initial project setup

- Add main application file (app.js)
- Create project documentation (README.md)
- Add User class in src directory"

# 7. Verify commit
git log --oneline -1
git status                        # Should show clean working tree

# 8. Make additional changes
echo "// TODO: Add error handling" >> app.js

# 9. Check what changed
git diff app.js

# 10. Stage and commit update
git add app.js
git commit -m "docs: add TODO comment for error handling"

# 11. View recent history
git log --oneline -3
```

### 6.7 Workflow Optimization Tips

**Daily Workflow Shortcuts:**
```bash
# Create alias for common commands
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch

# Quick status check
git st

# Stage and commit in one command (for tracked files)
git ci -am "Quick fix"

# View last commit
git show HEAD
git log -1
```

**Productivity Tips:**
- Use `git status` frequently to understand repository state
- Stage related changes together for logical commits
- Write descriptive commit messages for future reference
- Review changes with `git diff` before committing
- Keep commits small and focused on single changes

Understanding the basic Git workflow provides the foundation for all advanced Git operations and ensures you can effectively track and manage your project's evolution.

## 7. Viewing History and Logs

Git's history tracking is one of its most powerful features. Understanding how to effectively view and analyze your project's history helps with debugging, code review, and understanding project evolution.

### 7.1 Basic Log Commands

The `git log` command is your primary tool for exploring repository history.

#### Essential Log Formats

```bash
# Basic log with full commit information
git log

# Compact one-line format
git log --oneline

# Show specific number of commits
git log -5                    # Last 5 commits
git log --max-count=10        # Alternative syntax

# Graphical representation of branches
git log --graph --oneline --all
git log --graph --pretty=format:'%h -%d %s (%cr) <%an>' --abbrev-commit --all

# Show file changes in each commit
git log -p                    # Show patches (diffs)
git log --stat                # Show file statistics
git log --shortstat           # Compact statistics
git log --name-only           # Just file names
git log --name-status         # File names with change type (A/M/D)
```

#### Advanced Log Filtering

```bash
# Filter by author
git log --author="John Doe"
git log --author="john"       # Partial match
git log --committer="jane"    # Filter by committer

# Filter by date range
git log --since="2024-01-01"
git log --until="2024-12-31"
git log --since="1 week ago"
git log --after="2024-01-01" --before="2024-02-01"

# Filter by commit message
git log --grep="bugfix"       # Search commit messages
git log --grep="feat"         # Find feature commits
git log --grep="fix" --grep="bug" --all-match  # Multiple patterns (AND)
git log --grep="fix\|bug"     # Regex pattern (OR)

# Filter by file or directory
git log -- filename.txt       # Commits affecting specific file
git log -- src/              # Commits affecting directory
git log --follow -- file.txt  # Follow file through renames

# Filter by content changes
git log -S "function_name"    # Find commits that add/remove specific string
git log -G "regex_pattern"    # Find commits with content matching regex
```

#### Custom Log Formatting

```bash
# Beautiful custom formats
git log --pretty=format:"%h %ad %s (%an)" --date=short
git log --pretty=format:"%C(yellow)%h%Creset %C(blue)%ad%Creset %s %C(green)(%an)%Creset" --date=short

# Predefined pretty formats
git log --pretty=oneline
git log --pretty=short
git log --pretty=medium
git log --pretty=full
git log --pretty=fuller

# Create custom alias for beautiful log
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

**Format Placeholders:**
- `%H` = Full commit hash
- `%h` = Abbreviated commit hash
- `%an` = Author name
- `%ae` = Author email
- `%ad` = Author date
- `%cn` = Committer name
- `%cd` = Committer date
- `%s` = Subject (commit message)
- `%d` = Ref names (branches, tags)

### 7.2 Viewing Differences and Changes

Understanding what changed between commits, branches, or working states is crucial for debugging and code review.

#### Basic Diff Commands

```bash
# Show unstaged changes (working directory vs. staging)
git diff

# Show staged changes (staging vs. last commit)
git diff --staged
git diff --cached             # Alternative command

# Show all changes (working directory vs. last commit)
git diff HEAD

# Compare specific files
git diff filename.txt
git diff --staged filename.txt
git diff HEAD filename.txt
```

#### Comparing Commits and Branches

```bash
# Compare specific commits
git diff abc123 def456
git diff HEAD~1 HEAD          # Compare last commit with previous
git diff HEAD~3..HEAD         # Compare last 3 commits with current

# Compare branches
git diff main feature-branch
git diff main..feature-branch  # Same as above
git diff main...feature-branch # Compare from common ancestor

# Compare with remote branches
git diff origin/main
git diff HEAD origin/main

# Compare files between branches
git diff main feature-branch -- filename.txt
git diff main:src/app.js feature:src/app.js
```

#### Advanced Diff Options

```bash
# Word-level differences
git diff --word-diff
git diff --word-diff=color

# Ignore whitespace changes
git diff --ignore-all-space
git diff --ignore-space-at-eol
git diff --ignore-space-change

# Show function context
git diff --function-context

# Statistical summary
git diff --stat
git diff --numstat
git diff --shortstat

# Show only filenames
git diff --name-only
git diff --name-status

# Unified context lines
git diff -U10                 # Show 10 lines of context
git diff --unified=5          # Show 5 lines of context
```

### 7.3 Specialized History Views

#### Blame and Annotation

Track who changed what and when:

```bash
# Show line-by-line authorship
git blame filename.txt

# Blame specific lines
git blame -L 10,20 filename.txt

# Follow through file renames
git blame --follow filename.txt

# Show original file names
git blame -M filename.txt

# Ignore whitespace changes in blame
git blame -w filename.txt

# Show email addresses
git blame --show-email filename.txt
```

#### File History and Evolution

```bash
# Show all commits that modified a file
git log --follow -- filename.txt

# Show patches for specific file
git log -p -- filename.txt

# Show when lines were added/removed
git log -S "specific_function" -- filename.txt

# Show file at specific commit
git show HEAD~5:src/app.js
git show abc123:filename.txt

# List files in specific commit
git ls-tree HEAD
git ls-tree --name-only HEAD
git ls-tree -r HEAD              # Recursive
```

#### Commit Information

```bash
# Show specific commit details
git show HEAD                    # Latest commit
git show abc123                  # Specific commit by hash
git show HEAD~5                  # 5 commits ago
git show main~2                  # 2 commits before main

# Show only commit message and metadata
git show --stat abc123
git show --name-only abc123

# Show commit without diff
git show --no-patch abc123
```

### 7.4 Searching and Finding

#### Content Search

```bash
# Search current working directory
git grep "search_term"
git grep -n "search_term"       # Show line numbers
git grep -i "search_term"       # Case insensitive

# Search specific commit
git grep "search_term" HEAD~5

# Search all branches
git grep "search_term" --all

# Search with context
git grep -A 3 -B 3 "search_term"  # 3 lines after and before

# Search for files
git ls-files | grep "pattern"
```

#### Finding Specific Commits

```bash
# Find commit that introduced a bug (binary search)
git bisect start
git bisect bad                   # Current commit is bad
git bisect good HEAD~10          # 10 commits ago was good
# Git will checkout middle commit, test and mark as good/bad
git bisect good                  # If current checkout is good
git bisect bad                   # If current checkout is bad
git bisect reset                 # When done

# Find when content was added/removed
git log -S "function_name" --source --all

# Find commits in date range
git rev-list --since="1 week ago" --until="now" HEAD
```

### 7.5 Practical History Analysis Examples

#### Project Health Analysis

```bash
# Most active contributors
git shortlog -sn                 # Summary by author
git shortlog -sn --since="1 month ago"

# Commit frequency over time
git log --since="1 year ago" --pretty=format:"%ad" --date=short | sort | uniq -c

# File change frequency
git log --name-only --pretty=format: | sort | uniq -c | sort -nr

# Lines of code contributed by author
git log --author="John Doe" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'
```

#### Debugging and Investigation

```bash
# When was a specific line last changed?
git blame -L 150,150 src/app.js

# What changed in the last release?
git log v1.0.0..v1.1.0 --oneline

# Find all merge commits
git log --merges --oneline

# Find commits not in main branch
git log main..feature-branch

# Find commits unique to each branch
git log --left-right main...feature-branch

# Timeline of specific file
git log --follow --patch -- filename.txt
```

#### Release Analysis

```bash
# Changes since last tag
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# Commits between two tags
git log v1.0.0..v2.0.0 --oneline

# Files changed in release
git diff --name-only v1.0.0 v2.0.0

# Contributors to release
git shortlog v1.0.0..v2.0.0
```

### 7.6 Useful Aliases for History

```bash
# Set up helpful aliases
git config --global alias.hist "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"
git config --global alias.type "cat-file -t"
git config --global alias.dump "cat-file -p"
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.contributors "shortlog -sn"
git config --global alias.filechanges "log --name-status"

# Usage examples
git hist -10                     # Last 10 commits with nice format
git lg --since="1 week ago"      # Beautiful graph for last week
git contributors                 # See all contributors
git filechanges -- filename.txt # See all changes to specific file
```

### 7.7 Performance Tips for Large Repositories

```bash
# Speed up log operations
git config log.showSignature false

# Limit log output
git log --max-count=100
git log --since="1 month ago"

# Use shallow clones for faster operations
git clone --depth 50 <repository-url>

# Skip expensive operations
git log --no-merges              # Skip merge commits
git log --first-parent           # Follow only first parent
```

Understanding Git's history and viewing capabilities enables you to effectively debug issues, understand code evolution, and make informed decisions about your project's development.

```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Compare specific files
git diff filename.txt

# Compare branches
git diff main feature-branch

# Compare commits
git diff abc123 def456

# Word-level diff
git diff --word-diff
```

## 8. Undoing Changes

One of Git's greatest strengths is its ability to safely undo changes at any stage of development. Understanding the various undo operations and their implications is crucial for maintaining a clean, recoverable project history.

### 8.1 Understanding the Undo Landscape

Git provides different undo mechanisms depending on where your changes are:

```
Working Directory → Staging Area → Local Repository → Remote Repository
      ↓               ↓              ↓                ↓
  git restore     git restore    git reset/        git revert
                   --staged      git revert       (shared history)
```

**Key Principle**: The further along in the Git workflow your changes are, the more careful you need to be when undoing them.

### 8.2 Discarding Working Directory Changes

When you want to undo modifications in your working directory that haven't been staged yet.

#### Modern Approach (Git 2.23+)

```bash
# Restore specific file to last committed state
git restore filename.txt

# Restore multiple files
git restore file1.txt file2.js config.json

# Restore all files in current directory
git restore .

# Restore files matching pattern
git restore "*.js"
git restore src/**/*.py

# Restore file to specific commit state
git restore --source=HEAD~2 filename.txt
git restore --source=abc123 filename.txt

# Restore and stage the file
git restore --staged --worktree filename.txt
```

#### Traditional Approach

```bash
# Restore specific file (older syntax)
git checkout -- filename.txt
git checkout HEAD -- filename.txt

# Restore all files
git checkout -- .

# Restore from specific commit
git checkout abc123 -- filename.txt
```

#### Selective Restoration

```bash
# Interactive restoration (choose hunks to restore)
git restore -p filename.txt

# Restore only staged changes back to working directory
git restore --staged filename.txt

# Restore file from different branch
git restore --source=feature-branch filename.txt
```

### 8.3 Cleaning Untracked Files

Remove files that aren't being tracked by Git.

#### Safe Cleaning Process

```bash
# 1. See what would be removed (dry run)
git clean -n
git clean --dry-run

# 2. See what would be removed including directories
git clean -nd

# 3. Interactive cleaning (safest approach)
git clean -i
git clean --interactive

# 4. Remove untracked files (after confirming with dry run)
git clean -f
git clean --force

# 5. Remove untracked files and directories
git clean -fd

# 6. Remove ignored files too (be very careful!)
git clean -fX                # Only ignored files
git clean -fx                # Ignored and untracked files
```

#### Advanced Cleaning Options

```bash
# Clean specific directory
git clean -f src/

# Clean with pattern
git clean -f "*.tmp"

# Exclude specific files from cleaning
git clean -f -e "important-temp-file.txt"

# Show exactly what will be cleaned
git clean -n -d -x
```

### 8.4 Unstaging Changes

Remove files from the staging area while keeping changes in working directory.

#### Modern Unstaging (Git 2.23+)

```bash
# Unstage specific file
git restore --staged filename.txt

# Unstage multiple files
git restore --staged file1.txt file2.js

# Unstage all files
git restore --staged .

# Unstage files matching pattern
git restore --staged "*.css"
```

#### Traditional Unstaging

```bash
# Unstage specific file
git reset filename.txt
git reset HEAD filename.txt

# Unstage all files
git reset
git reset HEAD

# Unstage and show what was unstaged
git reset --mixed HEAD filename.txt
```

### 8.5 Undoing Commits

Different strategies for undoing commits depending on whether the commits are local or have been shared.

#### Safe Commit Undoing (Local Commits Only)

**Soft Reset - Keep Changes Staged:**
```bash
# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo multiple commits, keep all changes staged
git reset --soft HEAD~3

# Undo to specific commit, keep changes staged
git reset --soft abc123

# After soft reset, you can recommit
git commit -m "New commit combining previous changes"
```

**Mixed Reset - Keep Changes Unstaged (Default):**
```bash
# Undo last commit, keep changes in working directory
git reset HEAD~1
git reset --mixed HEAD~1    # Explicit mixed reset

# Undo to specific commit
git reset abc123

# After mixed reset, you can selectively stage and recommit
git add important-changes.txt
git commit -m "Keep only important changes"
```

**Hard Reset - Discard Changes (DANGEROUS):**
```bash
# Undo last commit and discard all changes
git reset --hard HEAD~1

# Undo multiple commits and discard changes
git reset --hard HEAD~3

# Reset to specific commit
git reset --hard abc123

# CAUTION: This permanently deletes uncommitted work!
```

#### Amending the Last Commit

```bash
# Change the last commit message
git commit --amend -m "Corrected commit message"

# Add files to the last commit
git add forgotten-file.txt
git commit --amend --no-edit

# Combine adding files and changing message
git add forgotten-file.txt
git commit --amend -m "Updated commit with forgotten file"

# Interactive amend (opens editor)
git commit --amend
```

### 8.6 Safe Undoing for Shared History

When commits have been pushed to shared repositories, use `git revert` instead of `git reset`.

#### Creating Revert Commits

```bash
# Revert the last commit (creates new commit)
git revert HEAD

# Revert specific commit
git revert abc123

# Revert multiple commits
git revert HEAD~2..HEAD     # Revert last 2 commits
git revert abc123 def456    # Revert specific commits

# Revert a merge commit (specify parent)
git revert -m 1 merge-commit-hash
```

#### Advanced Revert Options

```bash
# Revert without creating commit (stage changes)
git revert --no-commit HEAD
git revert -n HEAD~2..HEAD

# After reviewing staged changes
git commit -m "Revert problematic changes"

# Revert with custom message
git revert HEAD -m "Revert: this change caused production issues"

# Edit the revert commit message
git revert HEAD --edit
```

### 8.7 Recovering Lost Commits

Git rarely loses data permanently. Here's how to recover seemingly lost commits.

#### Using Reflog

```bash
# View reflog (shows all HEAD movements)
git reflog

# View reflog for specific branch
git reflog show main

# Find the lost commit in reflog output
# Example output:
# abc123 HEAD@{0}: reset: moving to HEAD~1
# def456 HEAD@{1}: commit: lost commit message

# Recover lost commit
git checkout def456           # Temporarily go to lost commit
git branch recovery-branch    # Create branch from lost commit
git switch main              # Go back to main
git merge recovery-branch    # Merge recovered work
```

#### Using git fsck

```bash
# Find dangling commits
git fsck --lost-found

# Look for dangling commit objects
git fsck --unreachable

# Show details of found objects
git show <object-hash>

# Recover specific dangling commit
git branch recovered-branch <commit-hash>
```

### 8.8 Undo Strategies by Scenario

#### Scenario 1: Wrong File in Working Directory

```bash
# Problem: Modified wrong file
git status                    # See modified files
git restore wrong-file.txt    # Restore specific file
```

#### Scenario 2: Staged Wrong Files

```bash
# Problem: Staged files you don't want to commit
git status                           # See staged files
git restore --staged wrong-file.txt  # Unstage specific file
git restore --staged .               # Unstage everything
```

#### Scenario 3: Wrong Commit Message

```bash
# Problem: Just committed with wrong message
git commit --amend -m "Correct message"
```

#### Scenario 4: Forgot to Add Files to Commit

```bash
# Problem: Committed but forgot important files
git add forgotten-file.txt
git commit --amend --no-edit
```

#### Scenario 5: Committed to Wrong Branch

```bash
# Problem: Committed on main instead of feature branch
git branch feature-branch        # Create branch with current commit
git reset --hard HEAD~1          # Remove commit from current branch
git switch feature-branch       # Switch to feature branch
```

#### Scenario 6: Need to Undo Public Commits

```bash
# Problem: Need to undo commits that others might have pulled
git revert HEAD~2..HEAD          # Revert last 2 commits safely
```

#### Scenario 7: Completely Messed Up Working Directory

```bash
# Problem: Working directory is completely broken
git status                       # See what's wrong
git reset --hard HEAD           # Nuclear option: reset everything
```

### 8.9 Prevention Strategies

#### Commit Frequently

```bash
# Make frequent small commits
git add .
git commit -m "WIP: working on feature"

# Use these for checkpoints, clean up later with interactive rebase
git rebase -i HEAD~5
```

#### Use Stash for Quick Context Switching

```bash
# Save current work temporarily
git stash push -m "Work in progress on authentication"

# Switch context
git switch other-branch

# Come back and restore work
git switch original-branch
git stash pop
```

#### Backup Before Dangerous Operations

```bash
# Create backup branch before risky operations
git branch backup-before-rebase

# Perform risky operation
git rebase -i HEAD~10

# If something goes wrong
git reset --hard backup-before-rebase
```

### 8.10 Undo Command Quick Reference

| Situation | Command | Risk Level |
|-----------|---------|------------|
| Unstaged changes in file | `git restore filename.txt` | ⚡ Safe |
| All unstaged changes | `git restore .` | ⚠️ Medium |
| Untracked files | `git clean -f` | ⚠️ Medium |
| Unstage file | `git restore --staged filename.txt` | ⚡ Safe |
| Change last commit message | `git commit --amend -m "new message"` | ⚡ Safe |
| Undo last commit (keep changes) | `git reset HEAD~1` | ⚠️ Medium |
| Undo last commit (discard changes) | `git reset --hard HEAD~1` | ⚠️ Dangerous |
| Undo public commit | `git revert HEAD` | ⚡ Safe |
| Recover lost commit | `git reflog` + `git checkout <hash>` | ⚡ Safe |

Understanding these undo mechanisms gives you the confidence to experiment and take risks in your development, knowing you can always recover from mistakes.

## 9. Git Branching

Branching is Git's killer feature that sets it apart from other version control systems. Understanding branching deeply enables parallel development, experimentation, and sophisticated workflows that scale from solo projects to enterprise teams.

### 9.1 Understanding Branches

#### What Are Branches?

A branch in Git is simply a lightweight, movable pointer to a specific commit. Unlike other version control systems where branching can be expensive and slow, Git branches are:

- **Lightweight**: Just a 41-byte file containing a SHA-1 checksum
- **Fast**: Creating and switching branches is nearly instantaneous
- **Independent**: Changes in one branch don't affect others until merged
- **Complete**: Each branch maintains its own working directory state

#### The Branch Pointer Model

```
main     →  [A] ← [B] ← [C]
feature  →           ↗ [D] ← [E]
```

- `main` points to commit C
- `feature` points to commit E
- Both branches share commits A and B
- HEAD points to the current branch

#### Default Branch Evolution

- **Historical**: `master` (derived from BitKeeper)
- **Modern**: `main` (more inclusive terminology)
- **Configurable**: Teams can choose any name

```bash
# Set default branch for new repositories
git config --global init.defaultBranch main
```

### 9.2 Basic Branch Operations

#### Creating Branches

```bash
# Create new branch from current commit
git branch feature-auth

# Create branch from specific commit
git branch feature-auth abc123

# Create branch from another branch
git branch feature-auth develop

# Create and switch in one command (modern)
git switch -c feature-auth
git switch -c feature-auth main    # From specific branch

# Create and switch (traditional)
git checkout -b feature-auth
git checkout -b feature-auth main  # From specific branch
```

#### Listing and Viewing Branches

```bash
# List local branches
git branch
git branch --list

# List all branches (local and remote)
git branch -a
git branch --all

# List remote branches only
git branch -r
git branch --remotes

# Show branch information with tracking
git branch -vv                # Verbose with tracking info
git branch -v                 # Just verbose

# Show merged/unmerged branches
git branch --merged           # Branches merged into current
git branch --no-merged        # Branches not merged
git branch --merged main      # Branches merged into main
```

#### Switching Branches

```bash
# Modern switch command (Git 2.23+)
git switch feature-auth
git switch main
git switch -                  # Switch to previous branch

# Traditional checkout (still works)
git checkout feature-auth
git checkout main
git checkout -                # Switch to previous branch

# Switch and create if doesn't exist
git switch -c new-feature

# Switch with uncommitted changes (stash automatically)
git switch --detach HEAD~3   # Detach HEAD to specific commit
```

#### Branch Management

```bash
# Rename current branch
git branch -m new-name
git branch --move new-name

# Rename specific branch
git branch -m old-name new-name

# Copy branch
git branch -c feature-auth feature-auth-backup
git branch --copy feature-auth feature-auth-backup

# Delete merged branch
git branch -d feature-auth
git branch --delete feature-auth

# Force delete branch (even if unmerged)
git branch -D feature-auth
git branch --delete --force feature-auth

# Delete remote tracking branch
git branch -dr origin/feature-auth
```

### 9.3 Advanced Branching Concepts

#### Understanding HEAD

HEAD is a pointer to the current branch reference:

```bash
# See what HEAD points to
cat .git/HEAD                 # Usually: ref: refs/heads/main

# See all references
git show-ref

# Show symbolic reference
git symbolic-ref HEAD

# Detached HEAD state
git checkout abc123           # HEAD points directly to commit
git switch -c new-branch      # Create branch from detached HEAD
```

#### Branch Tracking

Set up relationships between local and remote branches:

```bash
# Set upstream for current branch
git branch --set-upstream-to=origin/main
git branch -u origin/main

# Set upstream when pushing
git push -u origin feature-auth

# See tracking relationships
git branch -vv

# Push and set upstream in one command
git push --set-upstream origin feature-auth
```

#### Branch Configuration

```bash
# Configure branch-specific settings
git config branch.main.remote origin
git config branch.main.merge refs/heads/main

# Auto-setup tracking for new branches
git config --global branch.autosetupmerge always
git config --global branch.autosetuprebase always

# Default push behavior
git config --global push.default simple  # Only current branch
git config --global push.default current # Push to same-named branch
```

### 9.4 Branch Workflows and Patterns

#### Feature Branch Workflow

Complete workflow for feature development:

```bash
# 1. Start from updated main
git switch main
git pull origin main

# 2. Create feature branch
git switch -c feature/user-authentication

# 3. Develop feature with commits
echo "auth logic" > auth.js
git add auth.js
git commit -m "feat: add authentication logic"

echo "auth tests" > auth.test.js
git add auth.test.js
git commit -m "test: add authentication tests"

# 4. Keep branch updated (rebase)
git fetch origin
git rebase origin/main

# 5. Push feature branch
git push -u origin feature/user-authentication

# 6. Create pull request (via GitHub/GitLab)
# 7. After review and approval, merge
# 8. Clean up
git switch main
git pull origin main
git branch -d feature/user-authentication
```

#### Hotfix Workflow

Quick fixes for production issues:

```bash
# 1. Create hotfix from production branch
git switch main
git pull origin main
git switch -c hotfix/critical-security-fix

# 2. Make minimal fix
echo "security patch" > security.js
git add security.js
git commit -m "fix: patch critical security vulnerability"

# 3. Test thoroughly
npm test
npm run security-audit

# 4. Merge back to main
git switch main
git merge --no-ff hotfix/critical-security-fix
git tag v1.2.1
git push origin main --tags

# 5. Also merge to develop if using Git Flow
git switch develop
git merge --no-ff hotfix/critical-security-fix
git push origin develop

# 6. Clean up
git branch -d hotfix/critical-security-fix
```

#### Experimental Branch Pattern

For trying new approaches without commitment:

```bash
# Create experimental branch
git switch -c experiment/new-architecture

# Make experimental changes
git commit -m "experiment: try new architecture approach"

# If experiment works, merge or cherry-pick
git switch main
git merge experiment/new-architecture

# If experiment fails, just delete
git branch -D experiment/new-architecture
```

### 9.5 Branch Management Best Practices

#### Naming Conventions

```bash
# Feature branches
feature/user-authentication
feature/payment-integration
feature/mobile-responsive-design

# Bug fix branches
bugfix/login-error
bugfix/memory-leak
fix/api-timeout

# Release branches
release/v1.2.0
release/2024-q1

# Hotfix branches
hotfix/security-patch
hotfix/critical-bug

# Personal branches (in team environments)
yourname/experiment-new-feature
yourname/spike-performance-improvement
```

#### Branch Lifecycle Management

```bash
# Regular cleanup of merged branches
git branch --merged main | grep -v main | xargs git branch -d

# See stale branches
git for-each-ref --format='%(refname:short) %(committerdate)' refs/heads | sort -k2

# Prune remote tracking branches
git remote prune origin

# Interactive branch cleanup
git branch | grep feature/ | xargs -p git branch -d
```

#### Branch Protection Strategies

```bash
# See which branches are protected (GitHub/GitLab)
# Set up branch protection rules via web interface

# Prevent accidental commits to main
git config --global branch.main.pushRemote no-pushing

# Use hooks to prevent direct commits to main
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" = "main" ]; then
    echo "Direct commits to main are not allowed"
    exit 1
fi
EOF
chmod +x .git/hooks/pre-commit
```

### 9.6 Troubleshooting Branch Issues

#### Common Problems and Solutions

**Problem**: Can't switch branches due to uncommitted changes
```bash
# Solution 1: Stash changes
git stash push -m "Work in progress"
git switch other-branch
git switch -
git stash pop

# Solution 2: Commit work in progress
git add .
git commit -m "WIP: save current work"
git switch other-branch
# Later: git reset HEAD~1 to uncommit
```

**Problem**: Branch diverged from remote
```bash
# See divergence
git status
git log --oneline --graph origin/main..main

# Solution: Rebase
git fetch origin
git rebase origin/main

# Alternative: Merge
git merge origin/main
```

**Problem**: Accidentally committed to wrong branch
```bash
# Solution: Move commit to correct branch
git branch feature-branch        # Create branch with current commit
git reset --hard HEAD~1          # Remove commit from current branch
git switch feature-branch        # Switch to correct branch
```

**Problem**: Need to recover deleted branch
```bash
# Find the commit hash in reflog
git reflog --all | grep branch-name

# Recreate branch
git branch recovered-branch <commit-hash>
```

### 9.7 Advanced Branch Techniques

#### Cherry-Picking Between Branches

```bash
# Pick specific commit from another branch
git cherry-pick abc123

# Pick multiple commits
git cherry-pick abc123 def456

# Pick range of commits
git cherry-pick abc123..def456

# Cherry-pick without committing
git cherry-pick --no-commit abc123
```

#### Branch Comparisons

```bash
# See commits in feature branch not in main
git log main..feature-branch

# See commits in main not in feature branch
git log feature-branch..main

# See divergence (both directions)
git log --left-right main...feature-branch

# Show files changed between branches
git diff --name-only main feature-branch

# Show detailed diff between branches
git diff main feature-branch
```

#### Subtree and Submodule Branching

```bash
# Work with subtrees
git subtree push --prefix=lib/shared origin shared-lib-branch

# Work with submodules
git submodule foreach git checkout main
git submodule foreach git pull origin main
```

Understanding Git branching deeply enables you to choose the right workflow for your team and project needs, manage complex development scenarios, and maintain a clean, navigable project history.

## 10. Merging Strategies

Merging integrates changes from different branches into a unified history. Understanding various merge strategies and their implications helps you maintain clean project history and choose the right approach for different scenarios.

### 10.1 Understanding Merge Types

Git offers several merge strategies, each creating different history patterns:

```
Fast-Forward:     A---B---C (main)
                           \
                            D---E (feature)
Result:           A---B---C---D---E (main)

Three-Way:        A---B---C (main)
                       \   \
                        D---E (feature)
Result:           A---B---C---M (main)
                       \     /
                        D---E

Squash:           A---B---C (main)
                       \
                        D---E (feature)
Result:           A---B---C---S (main, S contains D+E changes)
```

### 10.2 Fast-Forward Merges

When the target branch hasn't diverged from the source branch, Git can simply move the branch pointer forward.

#### When Fast-Forward Occurs

```bash
# Scenario: main hasn't changed since feature branch was created
git switch main               # Switch to target branch
git merge feature-auth       # Fast-forward merge
```

#### Characteristics of Fast-Forward

- **No merge commit**: History appears linear
- **Preserves individual commits**: Each commit from feature branch appears in main
- **Clean history**: No unnecessary merge commits
- **Default behavior**: Git automatically fast-forwards when possible

#### Controlling Fast-Forward Behavior

```bash
# Force merge commit even when fast-forward is possible
git merge --no-ff feature-auth

# Only allow fast-forward merges (fail if not possible)
git merge --ff-only feature-auth

# Default fast-forward behavior (can be configured)
git merge feature-auth

# Configure default behavior
git config --global merge.ff false        # Always create merge commit
git config --global merge.ff only         # Only fast-forward
```

### 10.3 Three-Way Merges

When both branches have diverged with new commits, Git performs a three-way merge.

#### Three-Way Merge Process

Git compares three states:
1. **Common ancestor**: Last shared commit
2. **Target branch tip**: Latest commit on target branch
3. **Source branch tip**: Latest commit on source branch

```bash
# Perform three-way merge
git switch main
git merge feature-auth

# Explicitly request merge commit
git merge --no-ff feature-auth
```

#### Benefits of Three-Way Merges

- **Preserves context**: Shows when features were integrated
- **Clear branch points**: Easy to see where branches diverged and merged
- **Rollback capability**: Can revert entire feature by reverting merge commit
- **Collaboration clarity**: Shows collaboration patterns

#### Merge Commit Messages

```bash
# Custom merge commit message
git merge feature-auth -m "Merge feature: user authentication

- Add login/logout functionality
- Implement password validation
- Add session management
- Include comprehensive tests"

# Edit merge commit message in editor
git merge feature-auth --edit

# Use default merge commit message
git merge feature-auth --no-edit
```

### 10.4 Squash Merges

Squash merges combine all commits from the source branch into a single commit on the target branch.

#### Performing Squash Merges

```bash
# Squash merge (doesn't create merge commit automatically)
git switch main
git merge --squash feature-auth

# Check staged changes
git status

# Create squash commit
git commit -m "feat: add user authentication

Combined changes from feature-auth branch:
- Implement login/logout system
- Add password validation
- Create session management
- Add comprehensive test suite

Original commits:
- abc123: Initial auth structure
- def456: Add login functionality  
- ghi789: Implement logout
- jkl012: Add password validation
- mno345: Session management
- pqr678: Test suite completion"
```

#### When to Use Squash Merges

**Good for:**
- Small features with messy commit history
- Experimental branches with many "WIP" commits
- Features where individual commits aren't meaningful
- Teams preferring linear history

**Avoid when:**
- Individual commits are meaningful and should be preserved
- You need to revert specific changes within the feature
- Working with external contributors (loses attribution)
- Team policy requires preserving detailed history

### 10.5 Resolving Merge Conflicts

Conflicts occur when Git can't automatically reconcile differences between branches.

#### Understanding Conflict Markers

```javascript
// Example conflict in JavaScript file
function authenticate(user) {
<<<<<<< HEAD
    // Current branch version
    if (user.password === hash(user.input)) {
        return generateToken(user);
    }
=======
    // Incoming branch version  
    if (bcrypt.compare(user.input, user.password)) {
        return jwt.sign({id: user.id}, secret);
    }
>>>>>>> feature-auth
    return null;
}
```

**Conflict Markers Explained:**
- `<<<<<<< HEAD`: Start of current branch changes
- `=======`: Separator between versions
- `>>>>>>> branch-name`: End of incoming branch changes

#### Manual Conflict Resolution

```bash
# 1. See conflicted files
git status

# 2. View conflicts in detail
git diff

# 3. Edit files to resolve conflicts
# Remove markers and choose/combine desired changes

# 4. Stage resolved files
git add resolved-file.js

# 5. Continue merge
git commit
```

#### Using Merge Tools

```bash
# Configure merge tool (one-time setup)
git config --global merge.tool vimdiff    # vim-based
git config --global merge.tool vscode     # VS Code
git config --global merge.tool kdiff3     # KDiff3
git config --global merge.tool meld       # Meld

# Use merge tool to resolve conflicts
git mergetool

# Clean up backup files created by merge tool
git clean -f *.orig
```

#### Advanced Conflict Resolution

```bash
# See conflicts with more context
git diff --conflict=diff3

# Choose entire file from one side
git checkout --ours filename.txt      # Use current branch version
git checkout --theirs filename.txt    # Use incoming branch version

# Interactive conflict resolution
git add -p filename.txt               # Stage parts of resolution

# Abort merge if needed
git merge --abort
git reset --hard HEAD                 # Alternative abort method
```

### 10.6 Merge Strategies and Options

#### Built-in Merge Strategies

```bash
# Recursive strategy (default for two branches)
git merge -s recursive feature-branch

# Octopus strategy (for multiple branches)
git merge -s octopus branch1 branch2 branch3

# Ours strategy (ignore incoming changes)
git merge -s ours feature-branch

# Subtree strategy (for subproject merging)
git merge -s subtree subproject-branch
```

#### Merge Strategy Options

```bash
# Prefer our version in conflicts
git merge -X ours feature-branch

# Prefer their version in conflicts  
git merge -X theirs feature-branch

# Ignore whitespace changes
git merge -X ignore-space-change feature-branch

# Different conflict resolution algorithms
git merge -X patience feature-branch
git merge -X histogram feature-branch
```

### 10.7 Advanced Merge Scenarios

#### Merging Multiple Branches

```bash
# Octopus merge (multiple branches at once)
git merge feature-auth feature-ui feature-api

# Sequential merges
git merge feature-auth
git merge feature-ui  
git merge feature-api
```

#### Selective Merging

```bash
# Merge only specific files
git checkout feature-branch -- specific-file.txt
git commit -m "Merge specific file from feature branch"

# Merge specific commits (cherry-pick)
git cherry-pick abc123 def456
```

#### Temporary Merges for Testing

```bash
# Create temporary merge for testing
git switch -c test-merge
git merge feature-branch

# Test the merge
npm test

# If good, apply to main
git switch main
git merge feature-branch

# Clean up test branch
git branch -d test-merge
```

### 10.8 Merge Best Practices

#### Pre-Merge Checklist

```bash
# 1. Update target branch
git switch main
git pull origin main

# 2. Update feature branch  
git switch feature-branch
git pull origin feature-branch

# 3. Test feature branch
npm test
npm run lint

# 4. Rebase feature branch (optional, for clean history)
git rebase main

# 5. Perform merge
git switch main
git merge feature-branch
```

#### Merge Commit Quality

```bash
# Good merge commit message template
git merge feature-auth -m "Merge feature: user authentication

* Add JWT-based authentication system
* Implement login/logout endpoints
* Add password hashing with bcrypt
* Include comprehensive test suite
* Update API documentation

Closes #123
Reviewed-by: @senior-dev
Tested-by: @qa-engineer"
```

#### Team Merge Policies

**Linear History Teams:**
```bash
# Require fast-forward only
git config branch.main.mergeoptions "--ff-only"

# Always rebase before merge
git pull --rebase origin main
git switch main  
git merge --ff-only feature-branch
```

**Context-Preserving Teams:**
```bash
# Always create merge commits
git config --global merge.ff false

# Detailed merge messages
git merge --no-ff feature-branch --edit
```

### 10.9 Troubleshooting Merge Issues

#### Common Problems and Solutions

**Problem**: Merge conflicts seem overwhelming
```bash
# Solution: Break down the merge
git merge --abort
git rebase -i HEAD~n  # Clean up feature branch first
git switch main
git merge feature-branch
```

**Problem**: Accidental merge
```bash
# Solution: Reset to before merge
git reset --hard HEAD~1  # If no other commits after merge

# Or find the previous commit
git reflog
git reset --hard HEAD@{1}
```

**Problem**: Need to undo merge after push
```bash
# Solution: Revert the merge commit
git revert -m 1 merge-commit-hash

# -m 1 specifies which parent to revert to
```

**Problem**: Partial merge needed
```bash
# Solution: Manual selective merge
git diff main feature-branch -- filename.txt
git checkout feature-branch -- filename.txt
git commit -m "Partially merge feature: add specific file"
```

Understanding merge strategies enables you to maintain clean project history, resolve conflicts efficiently, and choose the right integration approach for your team's workflow and project requirements.

## 11. Git Rebasing: Advanced History Management

Rebasing is one of Git's most powerful yet controversial features. It allows you to rewrite commit history to create a cleaner, more linear project timeline. Understanding when and how to use rebasing effectively is crucial for maintaining professional-quality repositories.

### 11.1 Understanding Rebasing

#### What is Rebasing?

Rebasing takes commits from one branch and replays them on top of another branch, effectively changing the base of your branch. Unlike merging, which preserves the original branch structure, rebasing creates a linear history.

#### Rebase vs Merge Visualization

```
Before Rebase:
main:     A---B---C
feature:      D---E

After Rebase:
main:     A---B---C
feature:          D'---E'  (D and E replayed on top of C)

Before Merge:
main:     A---B---C
feature:      D---E

After Merge:
main:     A---B---C---M
               \     /
feature:        D---E
```

#### The Golden Rule of Rebasing

**Never rebase commits that have been pushed to a shared repository and that others might have based work on.**

This rule prevents rewriting history that other developers depend on, which could cause serious collaboration issues.

### 11.2 Basic Rebasing Operations

#### Simple Rebase

```bash
# Rebase current branch onto main
git switch feature-branch
git rebase main

# Alternative: specify both branches
git rebase main feature-branch

# Rebase onto specific commit
git rebase abc123
```

#### Rebase Process Step-by-Step

```bash
# Example scenario: feature branch diverged from main
git switch feature-auth
git log --oneline --graph main..HEAD
# Shows commits that are in feature-auth but not in main

# Perform rebase
git rebase main

# Git will:
# 1. Find common ancestor of current branch and target branch
# 2. Temporarily save commits from current branch
# 3. Reset current branch to target branch
# 4. Apply saved commits one by one
# 5. Each commit gets a new SHA (that's why history is "rewritten")
```

#### Rebasing with Remote Tracking

```bash
# Update local main and rebase feature branch
git switch main
git pull origin main
git switch feature-auth
git rebase main

# Or more concisely
git switch feature-auth
git rebase origin/main

# Push rebased branch (requires force push)
git push --force-with-lease origin feature-auth
```

### 11.3 Interactive Rebasing

Interactive rebase is a powerful tool for cleaning up commit history before sharing your work.

#### Starting Interactive Rebase

```bash
# Rebase last 5 commits
git rebase -i HEAD~5

# Rebase from specific commit
git rebase -i abc123

# Rebase all commits in current branch
git rebase -i main
```

#### Interactive Rebase Actions

When you start an interactive rebase, Git opens an editor with available actions:

```
pick abc123 Add user authentication
pick def456 Fix typo in login form
pick ghi789 Add password validation
pick jkl012 Update documentation
pick mno345 Fix authentication bug

# Rebase abc123..mno345 onto xyz789
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
```

#### Common Interactive Rebase Scenarios

**Squashing Related Commits:**
```bash
# Before: Multiple small commits for one feature
pick abc123 Add user authentication
squash def456 Fix typo in login form
squash ghi789 Add password validation
pick jkl012 Update documentation
fixup mno345 Fix authentication bug

# Result: Clean commits
# - Combined authentication implementation
# - Update documentation
```

**Reordering Commits:**
```bash
# Reorder commits by moving lines
pick jkl012 Update documentation    # Move documentation first
pick abc123 Add user authentication
pick def456 Fix typo in login form
pick ghi789 Add password validation
```

**Editing Commit Messages:**
```bash
# Use 'reword' to change commit messages
reword abc123 Add user authentication  # Will prompt for new message
pick def456 Fix typo in login form
pick ghi789 Add password validation
```

**Dropping Unwanted Commits:**
```bash
# Use 'drop' or just delete the line
pick abc123 Add user authentication
drop def456 Experimental feature that didn't work
pick ghi789 Add password validation
```

### 11.4 Handling Rebase Conflicts

Conflicts during rebase occur when Git can't automatically apply a commit to the new base.

#### Conflict Resolution Process

```bash
# When rebase encounters conflicts
git rebase main

# Output might look like:
# Auto-merging src/auth.js
# CONFLICT (content): Merge conflict in src/auth.js
# error: could not apply abc123... Add authentication
# Resolve all conflicts manually, mark them as resolved with
# "git add/rm <conflicted_files>", then run "git rebase --continue".

# 1. Check status
git status

# 2. View conflicts
git diff

# 3. Edit conflicted files (remove markers, choose code)
# 4. Stage resolved files
git add src/auth.js

# 5. Continue rebase
git rebase --continue

# Git will apply remaining commits
```

#### Advanced Conflict Resolution

```bash
# Accept all changes from current branch during conflicts
git rebase -X ours main

# Accept all changes from target branch during conflicts
git rebase -X theirs main

# Use specific merge strategy
git rebase -s recursive -X patience main

# Skip problematic commit (use carefully)
git rebase --skip

# Abort rebase and return to original state
git rebase --abort
```

#### Handling Multiple Conflicts

```bash
# During rebase with multiple conflicts
while ! git rebase --continue; do
    echo "Resolving conflicts for commit: $(git log -1 --oneline)"
    # Resolve conflicts manually
    git add .
done
```

### 11.5 Advanced Rebasing Techniques

#### Onto Option

Use `--onto` to rebase a branch onto a different commit than its current base:

```bash
# Scenario: Want to move feature branch from develop to main
# 
# Before:
# main:     A---B---C
# develop:      D---E
# feature:          F---G

git rebase --onto main develop feature

# After:
# main:     A---B---C
# feature:          F'---G'  (rebased directly onto main)
# develop:      D---E  (unchanged)
```

#### Preserving Merge Commits

```bash
# Preserve merge commits during rebase
git rebase --preserve-merges main

# Modern alternative (Git 2.18+)
git rebase --rebase-merges main
```

#### Autosquash

Automatically squash commits marked with special prefixes:

```bash
# Create commits that will be automatically squashed
git commit -m "feat: add authentication"
git commit -m "fixup! feat: add authentication"  # Will auto-squash
git commit -m "squash! feat: add authentication" # Will auto-squash

# Rebase with autosquash
git rebase -i --autosquash HEAD~3
```

#### Exec Commands

Run commands during rebase:

```bash
# Run tests after each commit during rebase
git rebase -i HEAD~5

# In the editor, add exec commands:
pick abc123 Add feature A
exec npm test
pick def456 Add feature B  
exec npm test
pick ghi789 Add feature C
exec npm test
```

### 11.6 Rebasing Strategies and Workflows

#### Feature Branch Cleanup

```bash
# Before sharing feature branch, clean it up
git switch feature-user-auth

# Interactive rebase to clean history
git rebase -i main

# Squash WIP commits, fix messages, reorder if needed
# Then force push to update remote feature branch
git push --force-with-lease origin feature-user-auth
```

#### Integrating Remote Changes

```bash
# Instead of merge commits when pulling
git pull --rebase origin main

# Configure as default behavior
git config --global pull.rebase true

# For specific branch
git config branch.main.rebase true
```

#### Linear History Maintenance

```bash
# Always rebase before merging to main
git switch feature-branch
git rebase main
git switch main
git merge --ff-only feature-branch

# This ensures linear history on main branch
```

### 11.7 Rebase vs Merge: Decision Matrix

| Scenario | Use Rebase | Use Merge | Reasoning |
|----------|------------|-----------|-----------|
| Feature branch integration | ✅ | ❌ | Clean linear history |
| Shared branch updates | ❌ | ✅ | Don't rewrite shared history |
| Local commit cleanup | ✅ | ❌ | Perfect for cleaning up |
| Preserving collaboration context | ❌ | ✅ | Merge commits show collaboration |
| Release branch integration | ❌ | ✅ | Clear release points |
| Hotfix integration | Depends | ✅ | Merge if needs to go to multiple branches |
| Open source contributions | ✅ | ❌ | Maintainers prefer clean history |

### 11.8 Rebasing Best Practices

#### Pre-Rebase Checklist

```bash
# 1. Ensure working directory is clean
git status

# 2. Create backup branch
git branch backup-before-rebase

# 3. Update target branch
git fetch origin
git switch main
git pull origin main

# 4. Perform rebase
git switch feature-branch
git rebase main
```

#### Communication and Team Practices

```bash
# Force push safely (checks remote hasn't changed)
git push --force-with-lease origin feature-branch

# Never force push to shared branches
# Protected branches in GitHub/GitLab prevent this

# Communicate with team when rebasing shared work
# Consider using merge instead if others have the branch
```

#### Rebase Commit Message Quality

```bash
# Before rebase, ensure good commit messages
git log --oneline HEAD~5

# Use interactive rebase to improve messages
git rebase -i HEAD~5
# Use 'reword' action for commits with poor messages
```

### 11.9 Troubleshooting Rebase Issues

#### Common Problems and Solutions

**Problem**: Conflicts on every commit
```bash
# Solution: Check if rebasing onto wrong branch
git rebase --abort
git log --oneline --graph origin/main..HEAD  # Check what commits exist
git rebase origin/main  # Use correct target
```

**Problem**: Lost commits after rebase
```bash
# Solution: Use reflog to find lost commits
git reflog
git branch recovery-branch abc123  # Recover from reflog
```

**Problem**: Rebase takes too long with many conflicts
```bash
# Solution: Break into smaller rebases
git rebase --abort
git rebase origin/main~5  # Rebase onto older commit first
git rebase origin/main    # Then rebase to current
```

**Problem**: Accidentally rebased shared commits
```bash
# Solution: Restore from backup and use merge instead
git reset --hard backup-before-rebase
git merge origin/main  # Use merge instead
```

#### Recovery Strategies

```bash
# If rebase goes wrong, reflog is your friend
git reflog feature-branch

# Find the commit before rebase started
git branch feature-branch-recovered abc123

# Compare to see what was lost
git diff feature-branch feature-branch-recovered
```

### 11.10 Rebase Tools and Configuration

#### Useful Configuration

```bash
# Auto-stash uncommitted changes during rebase
git config --global rebase.autoStash true

# Use better conflict resolution algorithm
git config --global rebase.backend merge

# Abbreviate commit hashes in interactive rebase
git config --global rebase.abbreviateCommands true

# Default to interactive rebase
git config --global rebase.interactive true
```

#### External Tools

```bash
# Use visual merge tool for conflicts
git config --global mergetool.rebase true

# Configure specific merge tool for rebases
git config --global merge.tool vimdiff
git mergetool  # During rebase conflicts
```

#### Aliases for Common Rebase Operations

```bash
# Useful rebase aliases
git config --global alias.ri "rebase -i"
git config --global alias.rc "rebase --continue"
git config --global alias.ra "rebase --abort"
git config --global alias.rom "rebase origin/main"

# Usage
git ri HEAD~5    # Interactive rebase last 5 commits
git rc           # Continue rebase after resolving conflicts
git ra           # Abort rebase
git rom          # Rebase onto origin/main
```

Understanding rebasing empowers you to maintain clean, professional commit histories while avoiding the pitfalls that can disrupt team collaboration. Use it wisely, and your repository's history will tell a clear, linear story of your project's evolution.
git rebase --abort
```

### 11.4 Rebase vs Merge: When to Use Each

| Scenario | Rebase | Merge |
|----------|--------|-------|
| Feature branch integration | ✅ Clean history | ✅ Preserve context |
| Shared branches | ❌ Rewrites history | ✅ Safe for collaboration |
| Local cleanup | ✅ Perfect tool | ❌ Unnecessary |
| Release branches | ❌ Can cause confusion | ✅ Clear merge points |

> **Golden Rule**: Never rebase commits that have been pushed to shared repositories.

## 12. Working with Remote Repositories

Remote repositories are the backbone of collaborative Git workflows. Understanding how to effectively work with remotes enables seamless team collaboration, backup strategies, and distributed development patterns.

### 12.1 Understanding Remote Repositories

#### What Are Remotes?

A remote repository is a version of your project hosted on a network (GitHub, GitLab, Bitbucket, or your own server). Remotes serve multiple purposes:

- **Collaboration**: Share code with team members
- **Backup**: Safeguard your work against local failures
- **Distribution**: Enable multiple contributors across different locations
- **Integration**: Central point for CI/CD and deployment pipelines

#### Remote Naming Conventions

```bash
# Common remote names and their purposes:
origin      # Your main remote (where you cloned from)
upstream    # Original repository (when working with forks)
production  # Production deployment remote
staging     # Staging environment remote
backup      # Backup repository
fork        # Your fork of someone else's repository
```

### 12.2 Remote Configuration and Management

#### Viewing Remote Information

```bash
# List all remotes
git remote

# List remotes with URLs
git remote -v

# Show detailed information about a specific remote
git remote show origin

# Example output:
# * remote origin
#   Fetch URL: git@github.com:user/repo.git
#   Push  URL: git@github.com:user/repo.git
#   HEAD branch: main
#   Remote branches:
#     main    tracked
#     develop tracked
#   Local branches configured for 'git pull':
#     main    merges with remote main
#     develop merges with remote develop
#   Local refs configured for 'git push':
#     main    pushes to main    (up to date)
#     develop pushes to develop (up to date)
```

#### Adding and Configuring Remotes

```bash
# Add new remote
git remote add origin https://github.com/user/repo.git

# Add remote with SSH (recommended for regular use)
git remote add origin git@github.com:user/repo.git

# Add additional remotes
git remote add upstream https://github.com/original/repo.git
git remote add production git@production-server:repo.git

# Change remote URL
git remote set-url origin git@github.com:user/repo.git

# Change only push URL (useful for different push/fetch URLs)
git remote set-url --push origin git@github.com:user/repo.git

# Rename remote
git remote rename origin old-origin
git remote rename upstream origin

# Remove remote
git remote remove old-remote
git remote rm staging  # Alternative syntax
```

#### Remote URL Formats

```bash
# HTTPS (easier setup, requires authentication each time)
https://github.com/user/repository.git
https://gitlab.com/user/repository.git

# SSH (requires key setup, no repeated authentication)
git@github.com:user/repository.git
ssh://git@gitlab.com:2222/user/repository.git

# Local repositories
/path/to/local/repository.git
file:///absolute/path/to/repository.git

# Custom protocols
ftp://server/path/to/repo.git
rsync://server/path/to/repo/
```

### 12.3 Fetching and Synchronization

#### Understanding Fetch vs Pull

- **Fetch**: Downloads changes but doesn't merge them
- **Pull**: Downloads changes and merges them (fetch + merge)

#### Basic Fetch Operations

```bash
# Fetch from default remote (origin)
git fetch

# Fetch from specific remote
git fetch upstream

# Fetch all remotes
git fetch --all

# Fetch with detailed output
git fetch -v
git fetch --verbose

# Fetch specific branch
git fetch origin main
git fetch upstream develop

# Fetch all branches and tags
git fetch origin --tags
git fetch --all --tags
```

#### Advanced Fetch Options

```bash
# Prune deleted remote branches during fetch
git fetch --prune origin
git fetch -p origin  # Short form

# Fetch shallow (limited history) - useful for CI/CD
git fetch --depth=1 origin main

# Fetch unshallow (get full history)
git fetch --unshallow

# Force fetch (overwrite local references)
git fetch --force origin

# Fetch refspecs (advanced remote configuration)
git fetch origin +refs/heads/*:refs/remotes/origin/*
```

#### Understanding Remote Tracking Branches

Remote tracking branches are local references to remote branches:

```bash
# List remote tracking branches
git branch -r

# List all branches (local and remote)
git branch -a

# Show tracking relationships
git branch -vv

# Example output:
# main    abc123 [origin/main] Latest commit message
# feature def456 [origin/feature: ahead 2] Working on feature

# Create local branch from remote tracking branch
git switch -c local-main origin/main
git checkout -b local-develop origin/develop

# Set upstream tracking for existing branch
git branch --set-upstream-to=origin/main main
git branch -u origin/develop develop
```

### 12.4 Pulling Changes

#### Basic Pull Operations

```bash
# Pull from default remote and branch
git pull

# Pull from specific remote
git pull origin

# Pull specific branch
git pull origin main
git pull upstream develop

# Pull with explicit remote and branch
git pull origin main
```

#### Pull Strategies

```bash
# Pull with merge (default)
git pull origin main

# Pull with rebase (cleaner history)
git pull --rebase origin main

# Configure default pull strategy
git config --global pull.rebase true   # Always rebase
git config --global pull.ff only       # Only fast-forward

# Per-branch configuration
git config branch.main.rebase true
```

#### Advanced Pull Options

```bash
# Pull with specific merge strategy
git pull -s recursive -X ours origin main

# Pull and automatically stash/unstash local changes
git pull --autostash origin main

# Pull with verbose output
git pull --verbose origin main

# Pull without committing merge
git pull --no-commit origin main

# Pull and edit merge commit message
git pull --edit origin main
```

#### Handling Pull Conflicts

```bash
# When pull results in conflicts
git pull origin main
# Auto-merging file.txt
# CONFLICT (content): Merge conflict in file.txt
# Automatic merge failed; fix conflicts and then commit the result.

# 1. Check status
git status

# 2. Resolve conflicts manually
# Edit files, remove conflict markers

# 3. Stage resolved files
git add resolved-file.txt

# 4. Complete the merge
git commit

# Alternative: abort the pull
git merge --abort
```

### 12.5 Pushing Changes

#### Basic Push Operations

```bash
# Push current branch to its upstream
git push

# Push to specific remote and branch
git push origin main

# Push new branch and set upstream
git push -u origin feature-branch
git push --set-upstream origin feature-branch

# Push all branches
git push --all origin

# Push tags
git push --tags origin
git push origin --tags

# Push specific tag
git push origin v1.0.0
```

#### Force Pushing (Use with Extreme Caution)

```bash
# Force push (DANGEROUS - can overwrite others' work)
git push --force origin main

# Safer force push (fails if remote has changes you don't have)
git push --force-with-lease origin main

# Force push specific branch
git push --force-with-lease origin feature-branch

# Force push with lease on specific commit
git push --force-with-lease=main:abc123 origin main
```

#### Push Configurations

```bash
# Configure default push behavior
git config --global push.default simple    # Push current branch to same name
git config --global push.default current   # Push current branch
git config --global push.default upstream  # Push to configured upstream
git config --global push.default matching  # Push all matching branches
git config --global push.default nothing   # Require explicit specification

# Configure push URL different from fetch URL
git remote set-url --push origin git@github.com:user/repo.git

# Prevent accidental pushes to specific branches
git config --global branch.main.pushRemote no-pushing
```

### 12.6 Remote Branch Management

#### Working with Remote Branches

```bash
# List remote branches
git ls-remote origin
git ls-remote --heads origin    # Only branch heads
git ls-remote --tags origin     # Only tags

# Create local branch tracking remote branch
git switch -c local-feature origin/remote-feature
git checkout -b local-develop origin/develop

# Push new local branch to remote
git switch -c new-feature
git push -u origin new-feature

# Delete remote branch
git push origin --delete feature-branch
git push origin :feature-branch  # Alternative syntax

# Rename remote branch (requires coordination)
# 1. Rename local branch
git branch -m old-name new-name
# 2. Delete old remote branch
git push origin --delete old-name
# 3. Push new branch
git push -u origin new-name
```

#### Tracking Branch Configuration

```bash
# See tracking configuration
cat .git/config

# [branch "main"]
#     remote = origin
#     merge = refs/heads/main

# Set up tracking manually
git config branch.feature.remote origin
git config branch.feature.merge refs/heads/feature

# Remove tracking
git config --unset branch.feature.remote
git config --unset branch.feature.merge
```

#### Pruning Stale References

```bash
# Remove remote tracking branches that no longer exist
git remote prune origin

# Prune during fetch
git fetch --prune origin

# Configure automatic pruning
git config --global fetch.prune true

# Prune all remotes
git remote prune origin
git remote prune upstream

# See what would be pruned (dry run)
git remote prune --dry-run origin
```

### 12.7 Advanced Remote Workflows

#### Multiple Remote Workflow

```bash
# Scenario: Contributing to open source project
# 1. Fork repository on GitHub
# 2. Clone your fork
git clone git@github.com:yourusername/project.git
cd project

# 3. Add original repository as upstream
git remote add upstream git@github.com:original/project.git

# 4. Verify remotes
git remote -v
# origin    git@github.com:yourusername/project.git (fetch)
# origin    git@github.com:yourusername/project.git (push)
# upstream  git@github.com:original/project.git (fetch)
# upstream  git@github.com:original/project.git (push)

# 5. Keep fork synchronized
git fetch upstream
git switch main
git merge upstream/main
git push origin main

# 6. Create feature branch
git switch -c feature-improvement
git push -u origin feature-improvement
```

#### Deployment Remote Workflow

```bash
# Set up multiple deployment environments
git remote add staging git@staging-server:project.git
git remote add production git@production-server:project.git

# Deploy to staging
git push staging main

# Deploy to production (after testing)
git push production main

# Deploy specific tag to production
git push production v1.2.0:main
```

#### Backup Strategy with Remotes

```bash
# Add backup remote
git remote add backup git@backup-server:project.git

# Push all branches and tags to backup
git push --all backup
git push --tags backup

# Automated backup with hooks
cat > .git/hooks/post-commit << 'EOF'
#!/bin/sh
git push --quiet backup main || true
EOF
chmod +x .git/hooks/post-commit
```

### 12.8 Remote Authentication and Security

#### SSH Key Setup

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key (add to GitHub/GitLab)
cat ~/.ssh/id_ed25519.pub

# Test SSH connection
ssh -T git@github.com
ssh -T git@gitlab.com
```

#### HTTPS Authentication

```bash
# Configure credential helper (macOS)
git config --global credential.helper osxkeychain

# Configure credential helper (Windows)
git config --global credential.helper manager-core

# Configure credential helper (Linux)
git config --global credential.helper store

# Use personal access tokens instead of passwords
# Generate token in GitHub/GitLab settings
# Use token as password when prompted
```

#### Advanced Security Configuration

```bash
# Configure signed commits
git config --global user.signingkey YOUR_GPG_KEY_ID
git config --global commit.gpgsign true

# Configure SSH config for multiple accounts
cat > ~/.ssh/config << 'EOF'
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work

Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
EOF

# Use different SSH hosts for different repositories
git remote add origin git@github-work:company/repo.git
git remote add personal git@github-personal:personal/repo.git
```

### 12.9 Troubleshooting Remote Issues

#### Common Problems and Solutions

**Problem**: Permission denied when pushing
```bash
# Check remote URL
git remote -v

# Ensure you have write access to the repository
# Check SSH key is added to your account
ssh -T git@github.com

# If using HTTPS, ensure correct credentials
git config --global credential.helper store
git push  # Will prompt for credentials
```

**Problem**: Remote has changes you don't have
```bash
# Error: Updates were rejected because the remote contains work
git fetch origin
git rebase origin/main  # Or merge
git push origin main
```

**Problem**: Cannot connect to remote
```bash
# Check network connectivity
ping github.com

# Check SSH configuration
ssh -vT git@github.com

# Check HTTPS proxy settings
git config --global http.proxy http://proxy:port
git config --global https.proxy https://proxy:port
```

**Problem**: Slow remote operations
```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:user/repo.git

# Configure connection reuse
git config --global ssh.controlmaster auto
git config --global ssh.controlpersist 3600

# Use shallow clone for faster operations
git clone --depth 1 https://github.com/user/repo.git
```

### 12.10 Remote Best Practices

#### Branch Protection and Policies

```bash
# Set up branch protection (via GitHub/GitLab UI)
# - Require pull request reviews
# - Require status checks
# - Restrict who can push to branches
# - Require up-to-date branches

# Local verification before pushing
git config --global push.default simple
git config --global branch.autosetupmerge always
```

#### Collaboration Etiquette

```bash
# Always fetch before starting work
git fetch origin

# Create descriptive branch names
git switch -c feature/user-authentication
git switch -c bugfix/login-redirect

# Keep commits atomic and well-described
git add specific-file.js
git commit -m "feat: add JWT token validation

- Implement token expiration checking
- Add middleware for protected routes
- Include comprehensive error handling"

# Force push responsibly
git push --force-with-lease origin feature-branch
```

#### Performance Optimization

```bash
# Configure connection pooling
git config --global http.postBuffer 524288000

# Use parallel fetch for multiple remotes
git config --global fetch.parallel 4

# Compress data during transfer
git config --global core.compression 9

# Use reference repositories for large projects
git clone --reference /path/to/reference/repo https://github.com/user/repo.git
```

Understanding remote repositories deeply enables you to collaborate effectively, maintain robust backup strategies, and implement sophisticated deployment workflows that scale with your team and project needs.

## 13. Collaborative Development with GitHub

GitHub has revolutionized collaborative software development by providing a comprehensive platform that combines Git version control with powerful collaboration tools. Understanding GitHub's features and workflows is essential for modern software development.

### 13.1 Understanding GitHub's Collaboration Model

#### Core GitHub Concepts

- **Repository**: The central hub for your project containing code, issues, pull requests, and documentation
- **Fork**: A personal copy of someone else's repository
- **Pull Request (PR)**: A proposal to merge changes from one branch into another
- **Issues**: Bug reports, feature requests, and general project discussions
- **Organizations**: Accounts that allow multiple users to collaborate across many projects
- **Teams**: Groups within organizations with specific access permissions

#### GitHub Flow vs Git Flow

GitHub Flow is simpler and more suitable for continuous deployment:

```
GitHub Flow:
main ←─── feature-branch-1
  │   ←─── feature-branch-2  
  └   ←─── hotfix-branch

Git Flow:
main ←─── hotfix/*
  │
  └── release/* ←─── develop ←─── feature/*
```

### 13.2 Setting Up Authentication

#### SSH Authentication Setup

SSH provides secure, passwordless authentication for Git operations:

```bash
# 1. Generate SSH key pair
ssh-keygen -t ed25519 -C "your.email@example.com"

# When prompted, save to default location (~/.ssh/id_ed25519)
# Optionally set a passphrase for additional security

# 2. Start SSH agent
eval "$(ssh-agent -s)"

# 3. Add key to SSH agent
ssh-add ~/.ssh/id_ed25519

# 4. Copy public key to clipboard
# macOS:
pbcopy < ~/.ssh/id_ed25519.pub

# Linux:
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows (Git Bash):
cat ~/.ssh/id_ed25519.pub | clip

# Manual copy:
cat ~/.ssh/id_ed25519.pub
```

**Adding SSH Key to GitHub:**
1. Go to GitHub Settings → SSH and GPG keys
2. Click "New SSH key"
3. Give it a descriptive title (e.g., "MacBook Pro 2024")
4. Paste your public key
5. Click "Add SSH key"

#### Testing SSH Connection

```bash
# Test SSH connection to GitHub
ssh -T git@github.com

# Expected output:
# Hi username! You've successfully authenticated, but GitHub does not
# provide shell access.

# If connection fails, debug with verbose output
ssh -vT git@github.com
```

#### Personal Access Tokens (PAT)

For HTTPS authentication or API access:

```bash
# Generate PAT in GitHub Settings → Developer settings → Personal access tokens
# Use PAT as password when prompted for HTTPS authentication

# Configure Git to use credential helper
git config --global credential.helper store

# First push/pull will prompt for username and PAT
git push origin main
# Username: your-github-username
# Password: your-personal-access-token
```

#### Multiple GitHub Accounts

```bash
# Configure SSH for multiple accounts
cat > ~/.ssh/config << 'EOF'
# Work account
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

# Personal account  
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes
EOF

# Use different hosts for different repositories
git remote add origin git@github-work:company/project.git
git remote add personal git@github-personal:username/personal-project.git

# Configure different Git identities per repository
git config user.name "Work Name"
git config user.email "work@company.com"

cd ~/personal-projects/my-project
git config user.name "Personal Name"
git config user.email "personal@example.com"
```

### 13.3 Fork and Pull Request Workflow

#### The Complete Fork Workflow

This workflow is essential for contributing to open source projects or when you don't have direct write access to a repository.

```bash
# 1. Fork repository on GitHub (via web interface)
# Click "Fork" button on the repository page

# 2. Clone your fork locally
git clone git@github.com:yourusername/original-project.git
cd original-project

# 3. Add original repository as upstream remote
git remote add upstream git@github.com:originalowner/original-project.git

# 4. Verify remotes
git remote -v
# origin    git@github.com:yourusername/original-project.git (fetch)
# origin    git@github.com:yourusername/original-project.git (push)
# upstream  git@github.com:originalowner/original-project.git (fetch)
# upstream  git@github.com:originalowner/original-project.git (push)

# 5. Keep your fork synchronized
git fetch upstream
git switch main
git merge upstream/main
git push origin main

# Alternative: rebase instead of merge for cleaner history
git rebase upstream/main
git push --force-with-lease origin main
```

#### Creating and Managing Pull Requests

```bash
# 1. Create feature branch from updated main
git switch main
git pull upstream main
git switch -c feature/improve-documentation

# 2. Make your changes with good commit practices
echo "# Improved Documentation" > CONTRIBUTING.md
git add CONTRIBUTING.md
git commit -m "docs: add contributing guidelines

- Add code of conduct section
- Explain pull request process
- Include coding standards
- Add issue template guidelines

Closes #123"

# 3. Push feature branch to your fork
git push -u origin feature/improve-documentation

# 4. Create Pull Request (via GitHub web interface or CLI)
# Using GitHub CLI (if installed):
gh pr create --title "Improve project documentation" --body "
This PR enhances the project documentation by:

- Adding comprehensive contributing guidelines
- Including a code of conduct
- Explaining the pull request process
- Documenting coding standards

## Testing
- [x] Reviewed all documentation links
- [x] Checked markdown formatting
- [x] Verified examples work as expected

## Screenshots
![Documentation Preview](link-to-screenshot)

Closes #123
"

# 5. Address review feedback
# Make changes based on reviewer comments
git add updated-files
git commit -m "docs: address review feedback

- Fix typos in contributing guide
- Add missing code examples
- Clarify PR merge process"

git push origin feature/improve-documentation

# 6. Keep PR updated with main branch
git fetch upstream
git rebase upstream/main
git push --force-with-lease origin feature/improve-documentation
```

#### Advanced Pull Request Techniques

```bash
# Create draft pull request for early feedback
gh pr create --draft --title "WIP: Feature implementation"

# Convert draft to ready for review
gh pr ready

# Request specific reviewers
gh pr create --reviewer @senior-dev,@team-lead

# Auto-merge when checks pass (if you have permissions)
gh pr merge --auto --squash

# Update PR with changes from main
git switch feature-branch
git fetch upstream
git rebase upstream/main
git push --force-with-lease origin feature-branch
```

### 13.4 Code Review Best Practices

#### For Pull Request Authors

**Creating Review-Friendly PRs:**

```bash
# Keep PRs focused and small
# Bad: 50 files changed, 2000 lines added
# Good: 5 files changed, 150 lines added

# Write descriptive PR descriptions
gh pr create --title "feat: add user authentication system" --body "
## Summary
Implements JWT-based authentication system with password hashing and session management.

## Changes Made
- Add User model with bcrypt password hashing
- Implement JWT token generation and validation
- Create authentication middleware
- Add login/logout API endpoints
- Include comprehensive test suite

## Testing
- [x] All existing tests pass
- [x] New feature tests added and passing
- [x] Manual testing completed
- [x] Security review conducted

## Breaking Changes
None

## Dependencies
- Added bcryptjs for password hashing
- Added jsonwebtoken for JWT handling

## Screenshots/Demos
![Login Flow](link-to-demo)

Closes #42
Relates to #38, #41
"

# Include good commit messages
git commit -m "feat: add JWT authentication middleware

- Implement token validation logic
- Add error handling for expired tokens
- Include rate limiting for failed attempts
- Add comprehensive unit tests

Breaking change: requires Authorization header for protected routes"
```

**Responding to Feedback:**

```bash
# Make requested changes
git add modified-files
git commit -m "refactor: address code review feedback

- Extract authentication logic to separate service
- Add input validation for login endpoints
- Improve error messages
- Add JSDoc comments for public methods"

# Push updates
git push origin feature-branch

# Respond to comments on GitHub
# Thank reviewers for their time and feedback
# Ask clarifying questions if needed
# Explain your reasoning for specific implementation decisions
```

#### For Code Reviewers

**Effective Review Practices:**

1. **Focus on Important Issues:**
   - Security vulnerabilities
   - Performance problems
   - Logic errors
   - Architecture concerns

2. **Be Constructive:**
   - Explain the "why" behind suggestions
   - Offer specific solutions
   - Acknowledge good code when you see it

3. **Use GitHub's Review Tools:**
   ```bash
   # Suggest specific changes
   # GitHub will show a "suggestion" that can be applied directly
   
   # Request changes vs. approve vs. comment
   # - Request changes: Block merge until addressed
   # - Approve: Ready to merge
   # - Comment: General feedback, doesn't block
   ```

### 13.5 GitHub Issues and Project Management

#### Creating Effective Issues

```bash
# Good issue template example:
# Title: Bug: Authentication fails with special characters in password

## Description
Users cannot log in when their password contains special characters like @, #, or %.

## Steps to Reproduce
1. Create account with password containing special characters
2. Attempt to log in with those credentials
3. Login fails with "Invalid credentials" error

## Expected Behavior
Login should succeed with any valid password characters

## Actual Behavior
Login fails for passwords with special characters

## Environment
- Browser: Chrome 119
- OS: macOS 14.1
- App Version: v2.3.1

## Additional Context
Error appears in console: "Password encoding error"
Affects approximately 15% of our user base

## Proposed Solution
Implement proper URL encoding for password parameters
```

#### Linking Issues and Pull Requests

```bash
# Link PR to issues using keywords
git commit -m "fix: resolve authentication bug with special characters

Properly encode password parameters before sending to API.
Add validation for special characters in password field.
Include regression tests for various password formats.

Fixes #123
Closes #124
Resolves #125"

# Reference issues without closing
git commit -m "feat: improve password validation

Related to #123
See also #124"
```

#### Using GitHub Projects

```bash
# Organize work with GitHub Projects (Kanban boards)
# 1. Create project board
# 2. Add columns: Backlog, In Progress, Review, Done
# 3. Convert issues to project cards
# 4. Move cards through workflow stages

# Link commits to project cards
git commit -m "feat: add user dashboard

Updates project card in 'In Progress' column
Part of Q4 user experience improvements"
```

### 13.6 GitHub Actions and Automation

#### Basic CI/CD with GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - run: npm ci
    - run: npm run lint
    - run: npm test
    - run: npm run build
```

#### Automated Code Quality Checks

```yaml
# .github/workflows/quality.yml
name: Code Quality

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Run ESLint
      run: |
        npm ci
        npm run lint -- --format=json --output-file=eslint-report.json
    
    - name: Run Tests with Coverage
      run: |
        npm test -- --coverage --coverageReporters=json-summary
    
    - name: Comment PR with Coverage
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v7
      with:
        script: |
          const fs = require('fs');
          const coverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json'));
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: `## Test Coverage Report
            - Lines: ${coverage.total.lines.pct}%
            - Functions: ${coverage.total.functions.pct}%
            - Branches: ${coverage.total.branches.pct}%`
          });
```

### 13.7 Advanced GitHub Features

#### Branch Protection Rules

```bash
# Configure branch protection via GitHub web interface:
# Settings → Branches → Add rule

# Typical protection settings for main branch:
# - Require pull request reviews before merging
# - Require status checks to pass before merging
# - Require branches to be up to date before merging
# - Require conversation resolution before merging
# - Restrict pushes that create files over 100 MB
# - Require signed commits
```

#### GitHub CLI Integration

```bash
# Install GitHub CLI
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: apt install gh

# Authenticate
gh auth login

# Common CLI operations
gh repo clone owner/repository
gh repo create my-new-project --public
gh repo fork original-owner/repository

# Pull request operations
gh pr list
gh pr create --title "Bug fix" --body "Fixes issue with login"
gh pr checkout 123
gh pr review --approve
gh pr merge --squash

# Issue operations
gh issue list
gh issue create --title "Bug report" --body "Description"
gh issue close 42

# Release operations
gh release create v1.0.0 --title "Version 1.0.0" --notes "First stable release"
gh release list
```

#### Repository Templates and Automation

```bash
# Create repository template for consistent project setup
# 1. Create template repository with standard files:
#    - README.md template
#    - .gitignore
#    - LICENSE
#    - .github/workflows/
#    - .github/ISSUE_TEMPLATE/
#    - .github/PULL_REQUEST_TEMPLATE.md

# 2. Mark repository as template in Settings

# 3. Use template for new projects
gh repo create my-project --template owner/template-repo
```

### 13.8 Security and Compliance

#### Security Best Practices

```bash
# Enable security features in repository settings:
# - Dependency graph
# - Dependabot alerts
# - Dependabot security updates
# - Code scanning alerts
# - Secret scanning alerts

# Configure .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "security-team"
```

#### Managing Secrets

```bash
# Store secrets in GitHub repository settings
# Settings → Secrets and variables → Actions

# Use secrets in workflows
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}

# Never commit secrets to repository
# Add to .gitignore:
.env
.env.local
.env.production
config/secrets.yml
```

### 13.9 Team Collaboration Strategies

#### Effective Team Workflows

```bash
# 1. Establish clear branching strategy
git switch -c feature/team-member-name/feature-description

# 2. Use consistent commit message format
git commit -m "type(scope): description

Longer explanation if needed

Closes #issue-number"

# 3. Regular synchronization
# Daily: fetch upstream changes
git fetch upstream
git rebase upstream/main

# 4. Code review assignments
# Use CODEOWNERS file for automatic review assignment
echo "*.js @frontend-team" >> .github/CODEOWNERS
echo "*.py @backend-team" >> .github/CODEOWNERS
echo "docs/ @documentation-team" >> .github/CODEOWNERS
```

#### Communication Best Practices

1. **Clear PR Descriptions**: Explain what, why, and how
2. **Constructive Feedback**: Focus on code, not person
3. **Timely Reviews**: Respond within agreed timeframe
4. **Knowledge Sharing**: Comment on interesting solutions
5. **Documentation**: Keep README and docs updated

Understanding GitHub's collaborative features enables teams to work together efficiently, maintain high code quality, and deliver software reliably at scale.

## 14. Git Ignore and File Management

Effective file management in Git involves understanding what should and shouldn't be tracked, how to handle different file types, and implementing strategies for managing large repositories efficiently.

### 14.1 Understanding .gitignore

The `.gitignore` file tells Git which files and directories to ignore. Understanding how to create comprehensive ignore patterns prevents cluttering your repository with unnecessary files and protects sensitive information.

#### How .gitignore Works

```bash
# .gitignore file locations and precedence:
# 1. Repository .gitignore (version controlled, shared with team)
# 2. Personal .git/info/exclude (local only, not shared)
# 3. Global .gitignore (applies to all repositories)

# Create global gitignore
git config --global core.excludesfile ~/.gitignore_global

# Example global gitignore for system files
cat > ~/.gitignore_global << 'EOF'
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~
EOF
```

#### .gitignore Pattern Syntax

```gitignore
# Comments start with #
# This is a comment

# Ignore specific file
config.txt

# Ignore all files with extension
*.log
*.tmp

# Ignore directory
node_modules/
dist/

# Ignore files in specific directory
logs/*.log

# Ignore all .txt files in any directory
**/*.txt

# Exception: don't ignore important.txt
!important.txt

# Ignore all files in directory but keep directory structure
cache/*
!cache/.gitkeep

# Ignore files starting with specific pattern
temp*

# Ignore files ending with specific pattern
*_backup

# Character ranges
*.[oa]     # Ignore .o and .a files
*.[0-9]    # Ignore files ending with digits

# Escape special characters
\#filename  # Ignore file literally named #filename
```

### 14.2 Comprehensive .gitignore Templates

#### Node.js Project

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
*.min.js
*.min.css

# IDE files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Package manager files
package-lock.json  # If using yarn
yarn.lock         # If using npm
```

#### Python Project

```gitignore
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Virtual environments
venv/
env/
ENV/
.venv/
.ENV/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Jupyter Notebook
.ipynb_checkpoints

# Database
*.db
*.sqlite3

# Logs
*.log

# OS files
.DS_Store
Thumbs.db
```

#### Java Project

```gitignore
# Compiled class files
*.class

# Log files
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Virtual machine crash logs
hs_err_pid*

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
.mvn/wrapper/maven-wrapper.jar

# Gradle
.gradle/
build/
gradle-app.setting
!gradle-wrapper.jar
!gradle-wrapper.properties

# IDE files
.idea/
*.iws
*.iml
*.ipr
.vscode/
.eclipse/
.metadata/
bin/
tmp/
*.tmp
*.bak
*.swp
*~.nib
local.properties

# OS files
.DS_Store
Thumbs.db
```

#### Web Development

```gitignore
# Dependencies
node_modules/
bower_components/
vendor/

# Build outputs
dist/
build/
.next/
.nuxt/
.vuepress/dist/

# CSS preprocessors
.sass-cache/
*.css.map

# Bundler outputs
*.min.js
*.min.css
bundle.js
bundle.css

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Cache directories
.cache/
.parcel-cache/

# IDE and editor files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/

# Testing
.nyc_output/
```

### 14.3 Managing Ignored Files

#### Checking if Files are Ignored

```bash
# Check if specific file is ignored
git check-ignore filename.txt

# Check multiple files
git check-ignore file1.txt file2.js dir/file3.py

# Verbose output (shows which rule matched)
git check-ignore -v filename.txt

# Check all files in directory
find . -name "*.log" | git check-ignore --stdin

# List all ignored files in repository
git ls-files --others --ignored --exclude-standard
```

#### Force Adding Ignored Files

```bash
# Add ignored file (when you really need to track it)
git add -f important-but-ignored.txt

# See what would be added with force
git add -f --dry-run .

# Add with verbose output
git add -f -v ignored-file.txt
```

#### Removing Already Tracked Files

```bash
# Stop tracking file but keep it locally
git rm --cached filename.txt
git commit -m "Stop tracking filename.txt"

# Stop tracking directory
git rm -r --cached directory/
git commit -m "Stop tracking directory/"

# Stop tracking all files matching pattern
git rm --cached *.log
git commit -m "Stop tracking log files"

# Remove from Git but keep locally (then add to .gitignore)
echo "config.local" >> .gitignore
git rm --cached config.local
git add .gitignore
git commit -m "Ignore local config file"
```

### 14.4 Advanced File Management

#### Temporarily Ignoring Tracked Files

Sometimes you need to temporarily ignore changes to tracked files:

```bash
# Skip worktree (ignore local changes to tracked file)
git update-index --skip-worktree config.json

# Resume tracking changes
git update-index --no-skip-worktree config.json

# List files with skip-worktree flag
git ls-files -v | grep ^S

# Assume unchanged (lightweight alternative)
git update-index --assume-unchanged config.json

# Resume normal tracking
git update-index --no-assume-unchanged config.json

# List files marked as assume-unchanged
git ls-files -v | grep ^h
```

#### File Attributes with .gitattributes

The `.gitattributes` file provides more granular control over file handling:

```gitattributes
# Example .gitattributes file

# Set default behavior for all files
* text=auto

# Text files that should be normalized
*.txt text
*.md text
*.json text
*.js text
*.css text
*.html text

# Binary files that should not be normalized
*.png binary
*.jpg binary
*.gif binary
*.ico binary
*.mov binary
*.mp4 binary
*.mp3 binary
*.flv binary
*.fla binary
*.swf binary
*.gz binary
*.zip binary
*.7z binary
*.ttf binary

# Files with specific line endings
*.bat text eol=crlf
*.sh text eol=lf

# Files that should not be diffed
*.pdf -diff
*.docx -diff

# Files for language detection
*.rb linguist-language=Ruby
*.js linguist-language=JavaScript

# Generated files
dist/* linguist-generated=true
build/* linguist-generated=true

# Documentation
docs/* linguist-documentation=true

# Exclude from export (git archive)
.gitignore export-ignore
.gitattributes export-ignore
tests/ export-ignore
```

### 14.5 Large File Management

#### Git LFS (Large File Storage)

For repositories with large binary files:

```bash
# Install Git LFS
git lfs install

# Track large files by extension
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"

# Track large files by path
git lfs track "assets/videos/*"

# Track files larger than specific size
git lfs track --above=100mb

# See what's being tracked
git lfs track

# Add .gitattributes to repository
git add .gitattributes
git commit -m "Configure Git LFS tracking"

# Add large files normally
git add large-file.psd
git commit -m "Add design file"

# View LFS status
git lfs status

# List LFS objects
git lfs ls-files

# Clone repository with LFS files
git lfs clone https://github.com/user/repo.git

# Pull LFS files
git lfs pull

# Push LFS files
git lfs push origin main
```

#### Alternative Strategies for Large Files

```bash
# Use git-annex for distributed large file storage
# Use DVC (Data Version Control) for ML datasets
# Use submodules for large external dependencies
# Use subtrees for including other repositories

# Example: Adding external library as subtree
git subtree add --prefix=vendor/library https://github.com/library/repo.git main --squash

# Update subtree
git subtree pull --prefix=vendor/library https://github.com/library/repo.git main --squash
```

### 14.6 Repository Cleanup and Optimization

#### Cleaning Repository History

```bash
# Remove file from entire Git history (DANGEROUS - rewrites history)
git filter-repo --path filename.txt --invert-paths

# Alternative using git filter-branch (deprecated but still available)
git filter-branch --force --index-filter \
    'git rm --cached --ignore-unmatch filename.txt' \
    --prune-empty --tag-name-filter cat -- --all

# Remove directory from history
git filter-repo --path sensitive-dir/ --invert-paths

# Clean up after filter operations
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

#### Repository Size Analysis

```bash
# Check repository size
du -sh .git

# Find largest objects in repository
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort -nk2 | tail -10

# Analyze pack files
git verify-pack -v .git/objects/pack/pack-*.idx | sort -k 3 -nr | head -10

# Use git-sizer for detailed analysis
git-sizer --verbose
```

#### Garbage Collection and Optimization

```bash
# Manual garbage collection
git gc

# Aggressive garbage collection
git gc --aggressive --prune=now

# Clean up loose objects
git prune

# Clean up reflog
git reflog expire --expire=30.days refs/heads/main
git reflog expire --expire-unreachable=now --all

# Repack repository
git repack -ad

# Verify repository integrity
git fsck --full
```

### 14.7 Best Practices for File Management

#### What to Track vs. What to Ignore

**Always Track:**
- Source code files
- Configuration templates
- Documentation
- Tests
- Build scripts
- Dependency definitions (package.json, requirements.txt)

**Never Track:**
- Generated files (builds, compiled code)
- Dependencies (node_modules, vendor)
- Temporary files
- Local configuration files
- Sensitive information (passwords, keys)
- Operating system files
- IDE-specific files

**Sometimes Track (Consider Carefully):**
- Compiled documentation
- Small binary assets
- Lock files (depends on team policy)

#### File Organization Strategies

```bash
# Good repository structure
project/
├── .gitignore
├── .gitattributes
├── README.md
├── LICENSE
├── package.json
├── src/                 # Source code
├── tests/              # Test files
├── docs/               # Documentation
├── scripts/            # Build/deployment scripts
├── assets/             # Static assets
└── .github/            # GitHub-specific files
    ├── workflows/      # GitHub Actions
    └── ISSUE_TEMPLATE/ # Issue templates

# Configure different ignore rules per directory
echo "*.tmp" > src/.gitignore
echo "*.log" > logs/.gitignore
```

#### Team Policies and Standards

```bash
# Create team .gitignore template
cat > team-gitignore-template.txt << 'EOF'
# Team Standard .gitignore

# Build outputs
dist/
build/
*.min.*

# Dependencies
node_modules/
vendor/

# Environment files
.env*
!.env.example

# IDE files (add your preferred IDE)
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Coverage reports
coverage/

# Temporary files
*.tmp
*.temp
temp/

# Add project-specific ignores below this line
EOF

# Set up pre-commit hooks to validate .gitignore
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Check for common files that should be ignored
if git diff --cached --name-only | grep -E '\.(log|tmp|temp)$'; then
    echo "Warning: You're about to commit files that should probably be ignored"
    echo "Consider adding them to .gitignore"
    exit 1
fi
EOF
chmod +x .git/hooks/pre-commit
```

Effective file management in Git ensures clean repositories, protects sensitive information, and optimizes performance for teams of any size.

## 15. Git Branching Strategies

Choosing the right branching strategy is crucial for team productivity and code quality. Each strategy has specific use cases, advantages, and trade-offs.

### 15.1 Git Flow: The Traditional Enterprise Approach

Git Flow is a robust branching model designed for projects with scheduled releases and multiple environments.

#### 15.1.1 Branch Structure

```
main (production) ←─── hotfix/* (emergency fixes)
  │                      │
  └── release/* ←─── develop (integration) ←─── feature/* (new features)
```

**Branch Types:**
- **`main`**: Production-ready code, each commit represents a release
- **`develop`**: Integration branch where features come together
- **`feature/*`**: Individual feature development branches
- **`release/*`**: Release preparation and bug fixes
- **`hotfix/*`**: Critical production fixes

#### 15.1.2 Complete Git Flow Workflow

**Initial Setup:**
```bash
# Clone repository and set up main branches
git clone https://github.com/company/project.git
cd project

# Create develop branch if it doesn't exist
git switch -c develop
git push -u origin develop

# Set up git-flow (optional tool)
git flow init
```

**Feature Development Workflow:**
```bash
# 1. Start new feature from develop
git switch develop
git pull origin develop
git switch -c feature/user-authentication

# 2. Develop the feature
echo "Authentication logic" > auth.js
git add auth.js
git commit -m "feat: add user authentication system"

echo "Authentication tests" > auth.test.js
git add auth.test.js
git commit -m "test: add authentication tests"

# 3. Keep feature branch updated
git switch develop
git pull origin develop
git switch feature/user-authentication
git rebase develop

# 4. Finish feature
git switch develop
git merge --no-ff feature/user-authentication
git push origin develop
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

**Release Workflow:**
```bash
# 1. Create release branch from develop
git switch develop
git pull origin develop
git switch -c release/v1.2.0

# 2. Update version numbers and prepare release
echo "1.2.0" > VERSION
git add VERSION
git commit -m "chore: bump version to 1.2.0"

# 3. Fix any release-specific bugs
git add bug-fixes
git commit -m "fix: resolve last-minute release issues"

# 4. Merge to main and tag
git switch main
git pull origin main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin main --tags

# 5. Merge back to develop
git switch develop
git merge --no-ff release/v1.2.0
git push origin develop

# 6. Clean up
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

**Hotfix Workflow:**
```bash
# 1. Create hotfix from main
git switch main
git pull origin main
git switch -c hotfix/security-patch

# 2. Fix the critical issue
echo "Security fix" > security-patch.js
git add security-patch.js
git commit -m "fix: critical security vulnerability"

# 3. Update version
echo "1.2.1" > VERSION
git add VERSION
git commit -m "chore: bump version to 1.2.1"

# 4. Merge to main
git switch main
git merge --no-ff hotfix/security-patch
git tag -a v1.2.1 -m "Hotfix version 1.2.1"
git push origin main --tags

# 5. Merge to develop
git switch develop
git merge --no-ff hotfix/security-patch
git push origin develop

# 6. Clean up
git branch -d hotfix/security-patch
git push origin --delete hotfix/security-patch
```

#### 15.1.3 Git Flow Pros and Cons

**Advantages:**
- Clear separation of concerns
- Supports parallel development
- Perfect for scheduled releases
- Well-documented and standardized
- Great for teams with junior developers

**Disadvantages:**
- Complex for simple projects
- Longer integration cycles
- More overhead and ceremony
- Can slow down continuous deployment
- Merge conflicts more likely with long-lived branches

**Best for:** Enterprise software, mobile apps, desktop applications with scheduled releases.

### 15.2 GitHub Flow: Simplified Continuous Deployment

GitHub Flow emphasizes simplicity and continuous deployment with a single main branch.

#### 15.2.1 Workflow Steps

```
main ←─── feature-branch-1
  │   ←─── feature-branch-2
  └   ←─── feature-branch-3
```

**Complete GitHub Flow Process:**

```bash
# 1. Always start from updated main
git switch main
git pull origin main

# 2. Create descriptive feature branch
git switch -c feature/add-payment-integration

# 3. Develop with frequent commits
git add payment-service.js
git commit -m "feat: add Stripe payment service"

git add payment-routes.js
git commit -m "feat: add payment API endpoints"

git add payment.test.js
git commit -m "test: add payment service tests"

# 4. Push branch early and often
git push -u origin feature/add-payment-integration

# 5. Open Pull Request (can be draft initially)
# Via GitHub UI or CLI
gh pr create --title "Add payment integration" --body "Implements Stripe payment processing with full test coverage"

# 6. Continue development and push updates
git add payment-webhook.js
git commit -m "feat: add payment webhook handler"
git push origin feature/add-payment-integration

# 7. Request review and address feedback
# Reviewers add comments, you respond with commits

# 8. Deploy to staging for testing (optional)
# Many teams deploy PR branches to staging environments

# 9. Merge after approval
# Via GitHub UI or command line
git switch main
git pull origin main
git merge --no-ff feature/add-payment-integration
git push origin main

# 10. Clean up
git branch -d feature/add-payment-integration
git push origin --delete feature/add-payment-integration

# 11. Deploy to production
# Automated via CI/CD pipeline
```

#### 15.2.2 GitHub Flow Advanced Techniques

**Branch Naming Conventions:**
```bash
# Feature branches
git switch -c feature/user-profile-page
git switch -c feature/email-notifications

# Bug fixes
git switch -c bugfix/login-redirect-error
git switch -c bugfix/memory-leak-fix

# Documentation
git switch -c docs/api-documentation
git switch -c docs/deployment-guide

# Experiments
git switch -c experiment/new-caching-strategy
```

**Pull Request Best Practices:**
```bash
# 1. Create draft PR for work in progress
gh pr create --draft --title "WIP: Add payment integration"

# 2. Convert to ready when complete
gh pr ready

# 3. Request specific reviewers
gh pr create --reviewer @senior-dev,@team-lead

# 4. Auto-merge when checks pass
gh pr merge --auto --squash
```

#### 15.2.3 GitHub Flow Pros and Cons

**Advantages:**
- Simple and easy to understand
- Promotes continuous integration
- Fast feedback loops
- Great for web applications
- Minimal overhead

**Disadvantages:**
- Requires robust CI/CD
- Main branch can be unstable
- No separation between development and production
- Challenging for scheduled releases

**Best for:** Web applications, SaaS products, open source projects, teams practicing continuous deployment.

### 15.3 Trunk-Based Development: Maximum Integration

Trunk-based development focuses on very short-lived branches and frequent integration to the main branch.

#### 15.3.1 Core Principles

```
main ←─── very-short-branch (< 1 day)
  │   ←─── another-short-branch (< 1 day)
  └   ←─── direct-commits (for small changes)
```

**Implementation Strategies:**

**Direct Commits (Small Changes):**
```bash
# For very small, safe changes
git switch main
git pull origin main

# Make small change
echo "Minor bug fix" > small-fix.js
git add small-fix.js
git commit -m "fix: correct typo in error message"

# Push directly to main
git push origin main
```

**Short-Lived Branches (Larger Changes):**
```bash
# 1. Create short-lived branch
git switch main
git pull origin main
git switch -c quick-feature-$(date +%Y%m%d-%H%M)

# 2. Implement change quickly (same day)
git add new-feature.js
git commit -m "feat: add quick feature implementation"

# 3. Immediate integration
git switch main
git pull origin main
git merge quick-feature-20240125-1430
git push origin main

# 4. Clean up immediately
git branch -d quick-feature-20240125-1430
```

**Pair/Mob Programming Integration:**
```bash
# Work together on main branch
git switch main
git pull origin main

# Pair programming session
# Driver and navigator work together
git add collaborative-feature.js
git commit -m "feat: implement feature via pair programming

Co-authored-by: Navigator Name <navigator@email.com>"

git push origin main
```

#### 15.3.2 Essential Trunk-Based Development Practices

**Feature Flags for Incomplete Features:**
```bash
# Commit incomplete feature with feature flag
git add feature-flag-config.js
git commit -m "feat: add feature flag configuration"

git add incomplete-feature.js
git commit -m "feat: add new feature behind feature flag

Feature is disabled by default and can be enabled
via ENABLE_NEW_FEATURE environment variable"

git push origin main
```

**Continuous Integration Requirements:**
```bash
# Set up pre-push hooks
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh
echo "Running tests before push..."
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed. Push aborted."
    exit 1
fi
EOF

chmod +x .git/hooks/pre-push
```

**Daily Integration Practices:**
```bash
# Morning routine: sync with team
git switch main
git pull origin main

# Work in small increments
# Commit every 1-2 hours maximum
git add small-increment.js
git commit -m "feat: add small increment of feature"
git push origin main

# End of day: ensure everything is integrated
git status  # Should be clean
git log --oneline -5  # Review day's work
```

#### 15.3.3 Trunk-Based Development Pros and Cons

**Advantages:**
- Fastest integration cycle
- Minimal merge conflicts
- Promotes collaboration
- Enables true continuous deployment
- Forces good practices (testing, small commits)

**Disadvantages:**
- Requires mature team and practices
- Needs excellent CI/CD infrastructure
- Can be chaotic without discipline
- Challenging for junior developers
- Requires feature flags for incomplete work

**Best for:** High-performing teams, microservices, teams with strong DevOps culture, continuous deployment environments.

### 15.4 Ship/Show/Ask Strategy: Flexible Decision Making

Ship/Show/Ask categorizes changes based on risk and required collaboration level.

#### 15.4.1 Category Definitions and Workflows

**Ship Category: Low-risk, Independent Changes**

*Examples:* Documentation updates, minor bug fixes, configuration changes, dependency updates

```bash
# Ship workflow - direct to main
git switch main
git pull origin main

# Make low-risk change
echo "Updated documentation" > README.md
git add README.md
git commit -m "docs: update installation instructions"

# Push directly to main
git push origin main

# Automated checks run post-merge
# If checks fail, create immediate hotfix
```

**Show Category: Medium-risk, Informational Review**

*Examples:* Refactoring, performance improvements, new internal tools

```bash
# Show workflow - PR for CI validation, no review required
git switch main
git pull origin main
git switch -c show/refactor-user-service

# Make medium-risk changes
git add refactored-service.js
git commit -m "refactor: improve user service performance"

git add updated-tests.js
git commit -m "test: update tests for refactored service"

# Push and create PR
git push -u origin show/refactor-user-service

# Create PR with Show label
gh pr create \
  --title "Show: Refactor user service for better performance" \
  --body "This refactoring improves performance by 40%. All tests pass. 
  
  This is a Show PR - merging after CI passes without waiting for review." \
  --label "ship-show-ask:show"

# Merge after CI passes (automated or manual)
gh pr merge --squash --auto
```

**Ask Category: High-risk, Collaborative Changes**

*Examples:* New features, architecture changes, breaking changes, security updates

```bash
# Ask workflow - full review process
git switch main
git pull origin main
git switch -c ask/new-authentication-system

# Implement significant change
git add new-auth-system.js
git commit -m "feat: implement new JWT authentication system"

git add auth-migration.js
git commit -m "feat: add migration for new auth system"

git add comprehensive-tests.js
git commit -m "test: add comprehensive auth system tests"

# Push and create detailed PR
git push -u origin ask/new-authentication-system

gh pr create \
  --title "Ask: Implement new JWT authentication system" \
  --body "## Summary
  This PR introduces a new JWT-based authentication system replacing the current session-based approach.
  
  ## Changes
  - New JWT service with refresh token support
  - Database migration for user tokens
  - Updated middleware for JWT validation
  - Comprehensive test suite
  
  ## Breaking Changes
  - API endpoints now require JWT in Authorization header
  - Session-based auth will be deprecated in v2.0
  
  ## Testing
  - All existing tests pass
  - New authentication flow tested
  - Security review requested
  
  This is an Ask PR - requires approval from security team and senior developers." \
  --label "ship-show-ask:ask" \
  --reviewer @security-team,@senior-dev-1,@senior-dev-2

# Wait for approval and address feedback
# Multiple review rounds may be needed

# Merge only after all approvals
gh pr merge --squash
```

#### 15.4.2 Decision Matrix for Ship/Show/Ask

| Factor | Ship | Show | Ask |
|--------|------|------|-----|
| **Risk Level** | Very Low | Low-Medium | High |
| **Complexity** | Simple | Moderate | Complex |
| **Scope** | Single file/component | Multiple files/services | System-wide |
| **Reversibility** | Easily reversible | Moderately reversible | Hard to reverse |
| **Expertise Required** | Basic | Intermediate | Expert knowledge |
| **Timeline** | Immediate | Within hours | Days/weeks |

#### 15.4.3 Ship/Show/Ask Implementation Guide

**Team Setup:**
```bash
# Configure repository with Ship/Show/Ask labels
gh label create "ship-show-ask:ship" --color "00ff00" --description "Low risk, direct merge"
gh label create "ship-show-ask:show" --color "ffff00" --description "Medium risk, CI check only"
gh label create "ship-show-ask:ask" --color "ff0000" --description "High risk, full review required"

# Set up branch protection rules
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ci/tests"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```

**Automation Scripts:**
```bash
# .github/workflows/ship-show-ask.yml
name: Ship/Show/Ask Automation
on:
  pull_request:
    types: [opened, labeled]

jobs:
  auto-merge-show:
    if: contains(github.event.pull_request.labels.*.name, 'ship-show-ask:show')
    runs-on: ubuntu-latest
    steps:
      - name: Auto-merge Show PRs after CI
        run: |
          gh pr merge ${{ github.event.pull_request.number }} --squash --auto
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### 15.4.4 Ship/Show/Ask Pros and Cons

**Advantages:**
- Flexible approach adapts to change complexity
- Reduces review bottlenecks for low-risk changes
- Maintains quality for high-risk changes
- Empowers developers to make judgment calls
- Balances speed and safety

**Disadvantages:**
- Requires team maturity and good judgment
- Can be inconsistent across team members
- Needs clear guidelines and training
- Risk of miscategorizing changes
- Requires strong monitoring and rollback capabilities

**Best for:** Mature teams with mixed change types, products requiring both speed and quality, teams with strong DevOps practices.

### 15.5 Hybrid Approaches and Strategy Selection

#### 15.5.1 Combining Strategies

Many successful teams combine elements from different strategies:

**GitHub Flow + Ship/Show/Ask:**
```bash
# Use GitHub Flow structure with Ship/Show/Ask decision making
git switch main
git pull origin main

# For Ship changes: direct commit
git commit -m "docs: fix typo in README"
git push origin main

# For Show/Ask changes: use PR workflow
git switch -c feature/new-api-endpoint
# ... develop feature ...
gh pr create --label "ship-show-ask:ask"  # Based on complexity
```

**Git Flow + Trunk-Based Development (for different teams):**
```bash
# Core team uses trunk-based development
git switch main
git commit -m "feat: add core feature"
git push origin main

# Feature teams use Git Flow
git switch develop
git switch -c feature/external-integration
# ... develop feature ...
git switch develop
git merge --no-ff feature/external-integration
```

#### 15.5.2 Strategy Selection Framework

**Questions to Consider:**

1. **Team Size and Experience:**
   - Small, experienced team → Trunk-based or Ship/Show/Ask
   - Large, mixed experience → Git Flow or GitHub Flow
   - Remote team → GitHub Flow with strong PR process

2. **Release Cadence:**
   - Continuous deployment → Trunk-based or GitHub Flow
   - Weekly releases → GitHub Flow or Ship/Show/Ask
   - Monthly/quarterly releases → Git Flow

3. **Product Type:**
   - Web application → GitHub Flow or Trunk-based
   - Mobile app → Git Flow (app store approval cycles)
   - Enterprise software → Git Flow
   - Open source → GitHub Flow

4. **Risk Tolerance:**
   - High tolerance → Trunk-based
   - Medium tolerance → Ship/Show/Ask or GitHub Flow
   - Low tolerance → Git Flow

#### 15.5.3 Migration Strategies

**From Git Flow to GitHub Flow:**
```bash
# 1. Finish all active releases
git switch main
git merge --no-ff release/current-version

# 2. Merge develop to main
git merge --no-ff develop

# 3. Delete develop branch
git branch -D develop
git push origin --delete develop

# 4. Retrain team on new workflow
# 5. Update CI/CD to deploy from main
```

**From GitHub Flow to Trunk-Based:**
```bash
# 1. Strengthen CI/CD pipeline
# 2. Implement feature flags
# 3. Train team on trunk-based practices
# 4. Gradually reduce branch lifetime
# 5. Eventually allow direct commits for small changes
```

This comprehensive branching strategies section provides detailed workflows, commands, and practical guidance for each approach, helping teams choose and implement the strategy that best fits their needs.

## 16. Advanced Git Techniques

Beyond basic Git operations lies a powerful toolkit of advanced techniques that can dramatically improve your productivity, automate repetitive tasks, and solve complex development scenarios. Mastering these techniques transforms Git from a simple version control tool into a sophisticated development environment.

### 16.1 Git Stash: Temporary Work Storage

Git stash is your safety net for managing uncommitted changes when you need to quickly switch contexts without losing work.

#### Basic Stash Operations

```bash
# Stash current changes (tracked files only)
git stash

# Stash with descriptive message
git stash push -m "WIP: implementing user authentication"

# Stash including untracked files
git stash -u
git stash --include-untracked

# Stash everything (including ignored files)
git stash -a
git stash --all

# Stash only specific files
git stash push -m "Partial stash" -- file1.js file2.css

# Stash interactively (choose hunks)
git stash -p
git stash --patch
```

#### Managing Multiple Stashes

```bash
# List all stashes with details
git stash list
git stash list --stat  # Show files changed in each stash

# Example output:
# stash@{0}: WIP on main: abc123 Add login feature
# stash@{1}: On feature-branch: def456 Experimental changes
# stash@{2}: WIP on main: ghi789 Bug fix attempt

# Show stash contents
git stash show stash@{0}        # Summary
git stash show -p stash@{0}     # Full diff
git stash show stash@{0} --stat # File statistics

# Apply specific stash (keeps stash in stack)
git stash apply stash@{1}

# Pop specific stash (removes from stack after applying)
git stash pop stash@{0}

# Apply stash to different branch
git switch feature-branch
git stash apply stash@{0}
```

#### Advanced Stash Techniques

```bash
# Create stash without applying it to working directory
git stash store -m "Manual stash" $(git stash create)

# Create branch from stash
git stash branch feature-stash-recovery stash@{1}

# Partial stash operations
git stash push -m "Only JS files" -- "*.js"

# Stash with staged and unstaged changes separately
git stash push --staged -m "Staged changes only"
git stash push --keep-index -m "Unstaged changes only"

# Drop specific stash
git stash drop stash@{2}

# Clear all stashes (CAUTION: irreversible)
git stash clear

# Recover dropped stash (if you know the commit hash)
git stash apply 1a2b3c4d  # Use commit hash from reflog
```

#### Stash Conflict Resolution

```bash
# When stash apply/pop encounters conflicts
git stash apply stash@{0}
# Auto-merging file.js
# CONFLICT (content): Merge conflict in file.js

# Resolve conflicts manually, then stage
git add file.js

# No need to commit - changes are in working directory

# If conflicts are too complex, abort
git reset --hard HEAD
git stash drop stash@{0}  # Or keep for later
```

#### Practical Stash Workflows

```bash
# Emergency context switch workflow
git stash push -u -m "Emergency switch: bug report"
git switch hotfix-branch
# ... fix bug ...
git switch main
git stash pop

# Experimental changes workflow
git stash push -m "Experiment: new algorithm"
git reset --hard HEAD
# ... try different approach ...
# If experiment fails:
git stash pop  # Restore original approach

# Code review cleanup workflow
git stash -p  # Stash incomplete changes
# ... commit clean, reviewable code ...
git stash pop  # Continue working on stashed changes
```

### 16.2 Git Tags: Marking Important Points

Tags create permanent references to specific commits, essential for releases, deployments, and milestone tracking.

#### Tag Types and Creation

```bash
# Lightweight tag (simple pointer to commit)
git tag v1.0.0
git tag v1.0.0 abc123  # Tag specific commit

# Annotated tag (recommended - contains metadata)
git tag -a v1.0.0 -m "Release version 1.0.0"
git tag -a v1.0.0 -m "Release version 1.0.0" abc123

# Signed tag (with GPG signature)
git tag -s v1.0.0 -m "Signed release v1.0.0"

# Tag with detailed message (opens editor)
git tag -a v1.0.0
```

#### Tag Management and Organization

```bash
# List tags
git tag                          # All tags
git tag -l                       # Same as above
git tag -l "v1.*"               # Pattern matching
git tag -l "v2.0.*" --sort=-version:refname  # Sorted by version

# Show tag information
git show v1.0.0                  # Show tag and tagged commit
git tag -v v1.0.0               # Verify signed tag

# Tag with semantic versioning
git tag -a v2.1.3 -m "Version 2.1.3

Features:
- Add user dashboard
- Implement real-time notifications
- Improve performance by 25%

Bug Fixes:
- Fix memory leak in data processing
- Resolve login timeout issues

Breaking Changes:
- API endpoint /users now requires authentication
- Configuration format changed (see migration guide)"
```

#### Remote Tag Operations

```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags
git push --tags  # To default remote

# Push tags and commits together
git push origin main --tags

# Fetch tags from remote
git fetch origin --tags

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
git push origin :refs/tags/v1.0.0  # Alternative syntax

# Rename tag (delete old, create new)
git tag new-name old-name
git tag -d old-name
git push origin :refs/tags/old-name
git push origin new-name
```

#### Advanced Tagging Strategies

```bash
# Pre-release tags
git tag -a v2.0.0-alpha.1 -m "Alpha release"
git tag -a v2.0.0-beta.2 -m "Beta release"
git tag -a v2.0.0-rc.1 -m "Release candidate"

# Build metadata tags
git tag -a v1.0.0+build.123 -m "Build 123"

# Environment-specific tags
git tag -a v1.0.0-staging -m "Staging deployment"
git tag -a v1.0.0-production -m "Production deployment"

# Finding commits between tags
git log v1.0.0..v1.1.0 --oneline
git diff v1.0.0 v1.1.0

# Check if commit is tagged
git tag --contains abc123

# Find latest tag reachable from commit
git describe abc123
git describe --tags abc123

# Create tag from description
git tag -a $(git describe --tags) -m "Tagged from description"
```

### 16.3 Git Hooks: Automation and Workflow Integration

Git hooks are scripts that run automatically at specific points in the Git workflow, enabling powerful automation and quality control.

#### Hook Types and Locations

```bash
# Hook locations
ls .git/hooks/
# applypatch-msg        pre-applypatch       pre-push
# commit-msg           pre-commit           pre-rebase
# post-update          pre-receive          prepare-commit-msg
# update               post-commit          post-receive

# Client-side hooks (local repository)
# - pre-commit: Before commit is created
# - prepare-commit-msg: Before commit message editor
# - commit-msg: After commit message is entered
# - post-commit: After commit is completed
# - pre-push: Before push to remote
# - pre-rebase: Before rebase operation

# Server-side hooks (remote repository)
# - pre-receive: Before any references are updated
# - update: Before each reference is updated
# - post-receive: After all references are updated
```

#### Essential Client-Side Hooks

**Pre-commit Hook (Code Quality):**
```bash
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Prevent commits with debugging statements

echo "Running pre-commit checks..."

# Check for console.log in JavaScript files
if git diff --cached --name-only | grep -E '\.(js|jsx|ts|tsx)$' | xargs grep -l "console\." 2>/dev/null; then
    echo "❌ Commit rejected: Remove console.* statements"
    echo "Files with console statements:"
    git diff --cached --name-only | grep -E '\.(js|jsx|ts|tsx)$' | xargs grep -l "console\."
    exit 1
fi

# Check for TODO/FIXME in committed code
if git diff --cached | grep -E "^\+.*TODO|^\+.*FIXME"; then
    echo "⚠️  Warning: Committing TODO/FIXME items"
    echo "Are you sure you want to commit these? (y/N)"
    read response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
        exit 1
    fi
fi

# Run linter if available
if command -v npm >/dev/null 2>&1 && [ -f package.json ]; then
    echo "Running ESLint..."
    npm run lint 2>/dev/null || {
        echo "❌ Linting failed. Fix errors before committing."
        exit 1
    }
fi

# Run tests if available
if [ -f package.json ] && npm run test >/dev/null 2>&1; then
    echo "Running tests..."
    npm test 2>/dev/null || {
        echo "❌ Tests failed. Fix tests before committing."
        exit 1
    }
fi

echo "✅ All pre-commit checks passed"
EOF

chmod +x .git/hooks/pre-commit
```

**Commit Message Hook:**
```bash
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/sh
# Enforce conventional commit format

commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Invalid commit message format!"
    echo "Format: type(scope): description"
    echo "Types: feat, fix, docs, style, refactor, test, chore"
    echo "Example: feat(auth): add user login functionality"
    exit 1
fi

# Check commit message length
first_line=$(head -n1 "$1")
if [ ${#first_line} -gt 72 ]; then
    echo "❌ Commit message too long (${#first_line} chars, max 72)"
    exit 1
fi

echo "✅ Commit message format is valid"
EOF

chmod +x .git/hooks/commit-msg
```

**Pre-push Hook:**
```bash
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh
# Prevent pushing to protected branches

protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ $protected_branch = $current_branch ]; then
    echo "❌ Direct push to $protected_branch branch is not allowed"
    echo "Create a feature branch and use pull requests"
    exit 1
fi

# Run full test suite before pushing
echo "Running full test suite before push..."
if command -v npm >/dev/null 2>&1; then
    npm test || {
        echo "❌ Tests failed. Fix before pushing."
        exit 1
    }
fi

echo "✅ Pre-push checks completed"
EOF

chmod +x .git/hooks/pre-push
```

#### Advanced Hook Techniques

**Shared Team Hooks:**
```bash
# Create hooks directory in repository
mkdir .githooks

# Create shared pre-commit hook
cat > .githooks/pre-commit << 'EOF'
#!/bin/sh
# Team shared pre-commit hook
echo "Running team pre-commit checks..."
# ... shared logic ...
EOF

# Configure Git to use shared hooks
git config core.hooksPath .githooks

# Make sure hooks are executable
chmod +x .githooks/*

# Team members run once:
git config core.hooksPath .githooks
```

**Hook with Configuration:**
```bash
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

# Read configuration
HOOKS_CONFIG=".git/hooks-config"
SKIP_TESTS=false
SKIP_LINT=false

if [ -f "$HOOKS_CONFIG" ]; then
    . "$HOOKS_CONFIG"
fi

if [ "$SKIP_TESTS" = "true" ]; then
    echo "⏭️  Skipping tests (configured)"
else
    echo "Running tests..."
    npm test || exit 1
fi

if [ "$SKIP_LINT" = "true" ]; then
    echo "⏭️  Skipping linting (configured)"
else
    echo "Running linter..."
    npm run lint || exit 1
fi
EOF

# Configure hook behavior
echo "SKIP_TESTS=false" > .git/hooks-config
echo "SKIP_LINT=false" >> .git/hooks-config
```

### 16.4 Git Aliases: Power User Shortcuts

Aliases transform lengthy Git commands into memorable shortcuts, dramatically improving daily workflow efficiency.

#### Essential Aliases Setup

```bash
# Basic command shortcuts
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.sw switch

# Enhanced status and log
git config --global alias.s "status --short --branch"
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Advanced aliases
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.visual "!gitk"
```

#### Powerful Compound Aliases

```bash
# Complex log formatting
git config --global alias.hist "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"
git config --global alias.timeline "log --graph --branches --pretty=oneline --decorate"
git config --global alias.contributors "shortlog --summary --numbered"

# Branch management
git config --global alias.recent "for-each-ref --sort=-committerdate refs/heads/ --format='%(committerdate:short) %(refname:short)'"
git config --global alias.branches "branch -a"
git config --global alias.remotes "remote -v"

# Diff aliases
git config --global alias.changes "diff --name-status"
git config --global alias.dic "diff --cached"
git config --global alias.diffstat "diff --stat"

# Stash aliases
git config --global alias.sl "stash list"
git config --global alias.sa "stash apply"
git config --global alias.ss "stash save"
git config --global alias.sp "stash pop"
```

#### Workflow-Specific Aliases

```bash
# Feature branch workflow
git config --global alias.feature "!sh -c 'git switch main && git pull && git switch -c feature/\$1' -"
git config --global alias.finish "!sh -c 'git switch main && git merge --no-ff feature/\$1 && git branch -d feature/\$1' -"

# Release workflow
git config --global alias.release "!sh -c 'git tag -a v\$1 -m \"Release version \$1\"' -"
git config --global alias.releases "tag -l -n1"

# Cleanup aliases
git config --global alias.cleanup "!git branch --merged | grep -v '\\*\\|main\\|develop' | xargs -n 1 git branch -d"
git config --global alias.prune-all "!git remote | xargs -n 1 git remote prune"

# Interactive aliases
git config --global alias.add-select "add --interactive"
git config --global alias.rebase-select "rebase --interactive"
```

#### Advanced Scripted Aliases

```bash
# Alias that shows branch status with remote tracking
git config --global alias.branch-status "!git for-each-ref --format='%(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) %(color:blue)<%(authorname)>%(color:reset)' refs/heads"

# Find files that changed in last N commits
git config --global alias.files-changed "!sh -c 'git diff --name-only HEAD~\$1..HEAD' -"

# Show commits not pushed to remote
git config --global alias.unpushed "log @{u}.."

# Show commits that will be pushed
git config --global alias.outgoing "log @{u}..HEAD"

# Show commits that will be pulled
git config --global alias.incoming "!git fetch && git log HEAD..@{u}"

# Search commits by message
git config --global alias.find "!sh -c 'git log --all --grep=\"\$1\"' -"

# Show file history with patches
git config --global alias.file-history "!sh -c 'git log --follow -p -- \$1' -"
```

#### Alias Management

```bash
# List all aliases
git config --global --get-regexp alias

# Remove alias
git config --global --unset alias.shortname

# Edit aliases in config file
git config --global --edit

# Export aliases to file
git config --global --get-regexp alias > git-aliases.txt

# Import aliases from file
while read line; do
    key=$(echo $line | cut -d' ' -f1 | cut -d'.' -f2)
    value=$(echo $line | cut -d' ' -f2-)
    git config --global alias.$key "$value"
done < git-aliases.txt
```

#### Creating Function-Like Aliases

```bash
# Alias that takes multiple parameters
git config --global alias.clone-and-cd "!sh -c 'git clone \$1 && cd \$(basename \$1 .git)' -"

# Usage: git clone-and-cd https://github.com/user/repo.git

# Alias with conditional logic
git config --global alias.smart-push "!sh -c '
if [ \$(git rev-parse --abbrev-ref HEAD) = \"main\" ]; then
    echo \"Cannot push directly to main branch\"
    exit 1
else
    git push origin \$(git rev-parse --abbrev-ref HEAD)
fi' -"

# Alias that opens files in editor
git config --global alias.edit-conflicts "!sh -c '\$EDITOR \$(git diff --name-only --diff-filter=U)' -"
```

These advanced techniques transform Git from a basic version control system into a powerful development environment tailored to your workflow. Mastering stash, tags, hooks, and aliases enables you to automate repetitive tasks, enforce quality standards, and work more efficiently across any project size or team configuration.

## 17. Troubleshooting Common Issues

Even experienced developers encounter Git problems. This comprehensive troubleshooting guide covers the most common issues, their causes, and multiple solution approaches with safety considerations.

### 17.1 Merge Conflicts: Understanding and Resolution

Merge conflicts are inevitable in collaborative development. Understanding how to efficiently resolve them is crucial for maintaining team productivity.

#### Understanding Conflict Markers

```javascript
// Example conflict in JavaScript file
function authenticate(user) {
<<<<<<< HEAD
    // Your current branch changes
    if (user.password === bcrypt.hashSync(user.input, 10)) {
        return jwt.sign({id: user.id}, process.env.JWT_SECRET);
    }
=======
    // Incoming branch changes
    if (bcrypt.compareSync(user.input, user.password)) {
        return createToken(user);
    }
>>>>>>> feature-auth
    return null;
}
```

**Conflict Markers Explained:**
- `<<<<<<< HEAD`: Start of current branch content
- `=======`: Separator between conflicting versions
- `>>>>>>> branch-name`: End of incoming branch content

#### Systematic Conflict Resolution

```bash
# 1. Identify conflicts
git status
# You will see files under "Unmerged paths:"

# 2. Analyze the conflict
git diff
git diff --name-only --diff-filter=U  # Show only conflicted files

# 3. Choose resolution strategy
# Option A: Edit manually
vim conflicted-file.js

# Option B: Choose one side entirely
git checkout --ours conflicted-file.js    # Keep your version
git checkout --theirs conflicted-file.js  # Use their version

# Option C: Use merge tool
git mergetool

# 4. Stage resolved files
git add resolved-file.js

# 5. Complete the merge
git commit  # Don't add -m, Git provides merge commit message

# 6. Verify resolution
git log --oneline -3
git show HEAD  # Review the merge commit
```

#### Advanced Conflict Resolution

```bash
# See three-way diff during conflict
git diff --conflict=diff3 conflicted-file.js

# Interactive conflict resolution
git add -p conflicted-file.js  # Stage parts of resolution

# Abort merge if resolution is too complex
git merge --abort
git reset --hard HEAD  # Alternative abort

# See what caused the conflict
git log --merge --left-right --oneline

# Configure better merge tools
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# For complex conflicts, create temporary branches
git checkout --ours .
git add .
git commit -m "temp: our version"
git checkout --theirs .
git add .
git commit -m "temp: their version"
# Now you can compare and merge manually
```

### 17.2 Accidentally Committed to Wrong Branch

This common mistake has several recovery strategies depending on timing and scope.

#### Recent Commits on Wrong Branch

```bash
# Scenario: Last commit should be on feature branch, not main
git log --oneline -3  # Confirm which commit to move

# Method 1: Move commit to new branch
git branch feature-fix-user-login  # Create branch with current commit
git reset --hard HEAD~1            # Remove commit from current branch
git switch feature-fix-user-login  # Switch to new branch

# Method 2: Move commit to existing branch
git switch existing-feature-branch
git cherry-pick main              # Copy commit from main
git switch main
git reset --hard HEAD~1           # Remove from main

# Method 3: Interactive rebase (for multiple commits)
git rebase -i HEAD~5              # Edit last 5 commits
# Mark commits as 'edit', then during rebase:
git reset HEAD~1                  # Uncommit
git switch correct-branch
git add .
git commit -m "Move to correct branch"
git switch original-branch
git rebase --continue
```

#### Pushed to Wrong Branch

```bash
# If you've already pushed the wrong commit
# Method 1: Revert on wrong branch, cherry-pick to correct branch
git revert HEAD                   # Create revert commit
git push origin main             # Push revert

git switch correct-branch
git cherry-pick main~1           # Cherry-pick original commit
git push origin correct-branch

# Method 2: If no one else has pulled (DANGEROUS)
git reset --hard HEAD~1          # Remove commit locally
git push --force-with-lease origin main  # Force push removal

# Then move to correct branch
git switch correct-branch
git reflog                       # Find commit hash
git cherry-pick <commit-hash>    # Restore commit
git push origin correct-branch
```

### 17.3 Lost Commits and Data Recovery

Git rarely loses data permanently. Understanding recovery techniques can save hours of work.

#### Using Reflog for Recovery

```bash
# View reflog (shows all HEAD movements)
git reflog
git reflog --all  # Include all references

# Example reflog output:
# abc123 HEAD@{0}: reset: moving to HEAD~1
# def456 HEAD@{1}: commit: important feature
# ghi789 HEAD@{2}: checkout: moving from feature to main

# Recover lost commit
git checkout def456              # Go to lost commit
git branch recovery-feature      # Create branch from lost commit
git switch main                  # Return to main
git merge recovery-feature       # Merge recovered work

# Alternative: cherry-pick recovery
git cherry-pick def456
```

#### Advanced Recovery Techniques

```bash
# Find dangling commits
git fsck --lost-found
git fsck --unreachable

# Show details of dangling objects
git show <object-hash>

# Recover from specific reflog entry
git reset --hard HEAD@{2}

# Find commits by message
git log --all --grep="important feature"
git log --all --author="yourname" --since="1 week ago"

# Recover deleted files
git log --all --full-history -- path/to/deleted/file.txt
git checkout <commit-hash> -- path/to/deleted/file.txt

# Nuclear option: check all reachable objects
git rev-list --objects --all | grep <partial-filename>
```

### 17.4 Large File and Repository Issues

Large files and bloated repositories cause performance problems and storage issues.

#### Removing Large Files from History

```bash
# Find largest files in repository
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort -nk2 | tail -10

# Method 1: Using git filter-repo (recommended)
# Install: pip install git-filter-repo
git filter-repo --path large-file.zip --invert-paths

# Method 2: Using git filter-branch (deprecated but available)
git filter-branch --force --index-filter \
    'git rm --cached --ignore-unmatch large-file.zip' \
    --prune-empty --tag-name-filter cat -- --all

# Method 3: BFG Repo Cleaner (external tool)
# java -jar bfg.jar --delete-files large-file.zip repo.git

# Clean up after filter operations
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push changes (coordinate with team!)
git push origin --force --all
git push origin --force --tags
```

#### Preventing Large File Issues

```bash
# Set up Git LFS for large files
git lfs install
git lfs track "*.zip" "*.pdf" "*.mp4"
git add .gitattributes
git commit -m "Configure Git LFS"

# Pre-receive hook to prevent large files
cat > .git/hooks/pre-receive << 'EOF'
#!/bin/sh
# Prevent large files (over 50MB)
while read oldrev newrev refname; do
    git diff --stat $oldrev..$newrev | while read line; do
        size=$(echo $line | awk '{print $3}')
        if [ $size -gt 52428800 ]; then  # 50MB in bytes
            echo "File too large: $line"
            exit 1
        fi
    done
done
EOF
```

### 17.5 Remote Repository Problems

Issues with remote repositories often involve authentication, network problems, or synchronization conflicts.

#### Authentication Issues

```bash
# SSH key problems
ssh -T git@github.com  # Test SSH connection
ssh -vT git@github.com # Verbose debugging

# Common SSH fixes
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa

# HTTPS credential issues
git config --global credential.helper store
git config --list | grep credential

# Switch from HTTPS to SSH
git remote set-url origin git@github.com:user/repo.git

# Multiple account issues
git config --local user.name "Work Name"
git config --local user.email "work@company.com"
```

#### Push/Pull Failures

```bash
# "Updates were rejected" error
git fetch origin
git rebase origin/main  # Or merge origin/main
git push origin main

# "Remote contains work that you do not have locally"
git pull --rebase origin main
# Resolve any conflicts, then:
git push origin main

# Large push timeout
git config --global http.postBuffer 524288000
git push origin main

# Network issues
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 300
```

#### Synchronization Problems

```bash
# Out of sync branches
git fetch --prune origin  # Remove stale remote branches
git remote prune origin   # Alternative syntax

# Diverged histories
git log --oneline --graph origin/main..main  # See local commits
git log --oneline --graph main..origin/main  # See remote commits

# Fix diverged history
git rebase origin/main    # Rewrite local history
# Or
git merge origin/main     # Create merge commit

# Reset to remote state (CAUTION: loses local work)
git reset --hard origin/main
```

### 17.6 Corrupted Repository Recovery

Repository corruption is rare but can happen due to hardware failures or interrupted operations.

#### Detecting Corruption

```bash
# Check repository integrity
git fsck --full
git fsck --strict

# Check specific object
git cat-file -t <object-hash>
git cat-file -p <object-hash>

# Verify pack files
git verify-pack -v .git/objects/pack/pack-*.idx
```

#### Recovery Strategies

```bash
# Method 1: Clone fresh copy and port changes
git clone https://github.com/user/repo.git repo-fresh
cd repo-fresh
# Copy any uncommitted work from corrupted repo

# Method 2: Rebuild from known good state
git reset --hard <known-good-commit>
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Method 3: Recover from backup
cp -r /backup/repo/.git .git
git status

# Method 4: Partial recovery
git unpack-objects < .git/objects/pack/pack-*.pack
git fsck --full  # Check what's recoverable
```

### 17.7 Performance Issues

Slow Git operations impact productivity and indicate repository health problems.

#### Diagnosing Performance

```bash
# Measure operation times
time git status
time git log --oneline -100
time git fetch origin

# Repository size analysis
du -sh .git
git count-objects -vH

# Find performance bottlenecks
git config --global core.preloadindex true
git config --global core.fscache true
```

#### Optimization Techniques

```bash
# Aggressive cleanup
git gc --aggressive --prune=now

# Repack repository
git repack -ad

# Optimize configuration for large repos
git config core.preloadindex true
git config core.fscache true
git config gc.auto 256

# Use partial clone for large repositories
git clone --filter=blob:none https://github.com/user/large-repo.git
git clone --depth 1 https://github.com/user/repo.git  # Shallow clone

# Enable sparse checkout
git config core.sparseCheckout true
echo "src/" > .git/info/sparse-checkout
git read-tree -m -u HEAD
```

### 17.8 Commit and History Problems

Issues with commit history require careful handling to avoid disrupting team workflows.

#### Fixing Commit Messages

```bash
# Fix last commit message
git commit --amend -m "Corrected commit message"

# Fix older commit messages (creates new commits)
git rebase -i HEAD~5
# Change 'pick' to 'reword' for commits to fix

# Fix commit messages in already pushed commits
# WARNING: This rewrites history
git rebase -i HEAD~5
# After fixing:
git push --force-with-lease origin feature-branch
```

#### Splitting and Combining Commits

```bash
# Split large commit
git rebase -i HEAD~3
# Change 'pick' to 'edit' for commit to split
git reset HEAD~1        # Uncommit but keep changes
git add -p             # Stage parts separately
git commit -m "First part"
git add .
git commit -m "Second part"
git rebase --continue

# Combine commits (squash)
git rebase -i HEAD~3
# Change 'pick' to 'squash' for commits to combine
# Edit combined commit message when prompted
```

#### Removing Sensitive Data

```bash
# Remove passwords/keys from history
git filter-repo --replace-text replacements.txt

# Contents of replacements.txt:
# password123==>***REMOVED***
# api_key_here==>***REMOVED***

# Alternative using BFG
java -jar bfg.jar --replace-text replacements.txt repo.git

# For recent commits only
git rebase -i HEAD~5
# Use 'edit' to modify commits, then:
git commit --amend
git rebase --continue
```

### 17.9 Branch and Tag Issues

Problems with branch management and tagging can disrupt release workflows.

#### Branch Recovery

```bash
# Recover accidentally deleted branch
git reflog --all | grep branch-name
git branch recovered-branch <commit-hash>

# Fix detached HEAD state
git branch temp-branch    # Create branch from current commit
git switch main          # Go to main branch
git merge temp-branch    # Merge detached work
git branch -d temp-branch # Clean up

# Recover from forced branch deletion
git fsck --unreachable | grep commit
git show <commit-hash>   # Verify it's the right commit
git branch recovered <commit-hash>
```

#### Tag Problems

```bash
# Fix tag on wrong commit
git tag -d v1.0.0                    # Delete local tag
git push origin --delete v1.0.0     # Delete remote tag
git tag -a v1.0.0 correct-commit-hash -m "Version 1.0.0"
git push origin v1.0.0              # Push corrected tag

# Recover deleted tag
git reflog --all | grep v1.0.0
git tag v1.0.0 <commit-hash>
```

### 17.10 Emergency Recovery Procedures

When things go very wrong, these nuclear options can save your project.

#### Complete Repository Reset

```bash
# DANGER: This loses ALL local changes
git fetch origin
git reset --hard origin/main
git clean -fd

# Verify clean state
git status  # Should show "working tree clean"
```

#### Repository Backup and Restore

```bash
# Create complete backup
tar -czf repo-backup-$(date +%Y%m%d).tar.gz .git

# Restore from backup
rm -rf .git
tar -xzf repo-backup-20240125.tar.gz

# Alternative: Clone fresh and merge work
git clone https://github.com/user/repo.git repo-fresh
cd repo-fresh
# Manually copy important files from broken repo
```

This comprehensive troubleshooting guide provides solutions for the vast majority of Git problems you'll encounter. Remember: Git is designed to preserve data, so most "lost" work can be recovered with the right commands and patience.

## 18. Best Practices and Performance

Mastering Git requires not just knowing the commands, but understanding how to use them effectively in team environments. This section covers battle-tested practices that ensure scalable, maintainable, and secure Git workflows.

### 18.1 Commit Message Excellence

Well-crafted commit messages are the foundation of maintainable project history. They serve as documentation, debugging aids, and collaboration tools.

#### Conventional Commits Format

```bash
# Standard format
type(scope): brief description

Optional longer explanation of what changed and why

- Key change 1
- Key change 2
- Breaking change notes

Closes #123
Co-authored-by: Jane Doe <jane@example.com>
```

#### Commit Types and Usage

```bash
# feat: New features
git commit -m "feat(auth): add OAuth2 Google authentication

Implements secure login via Google OAuth2 with automatic
user profile creation and role assignment.

- Add Google OAuth2 strategy
- Create user profile auto-population
- Implement role-based permissions
- Add comprehensive integration tests

Closes #45
Relates to #32"

# fix: Bug fixes
git commit -m "fix(api): resolve memory leak in data processing

Memory usage was growing unbounded due to unclosed database
connections in the batch processing module.

- Close database connections properly
- Add connection pool monitoring
- Implement graceful shutdown handling
- Add memory usage tests

Fixes #156"

# docs: Documentation changes
git commit -m "docs(contributing): add code review guidelines

- Define review criteria and process
- Add examples of good/bad feedback
- Include response time expectations
- Link to style guide and templates"

# style: Formatting changes (no logic change)
git commit -m "style(components): apply consistent indentation

- Fix mixed tabs/spaces in React components
- Apply Prettier formatting rules
- Update .editorconfig for consistency"

# refactor: Code restructuring without feature changes
git commit -m "refactor(utils): extract validation logic to separate module

Improves testability and reusability without changing functionality.

- Move validation functions to utils/validation.js
- Add comprehensive unit tests
- Update imports across affected files
- Maintain backward compatibility"

# test: Adding or updating tests
git commit -m "test(auth): add edge cases for token validation

- Test expired tokens
- Test malformed tokens  
- Test missing authorization headers
- Add performance benchmarks"

# chore: Maintenance tasks
git commit -m "chore(deps): update development dependencies

- Update Jest to v29.5.0
- Update ESLint to v8.40.0
- Update Prettier to v2.8.8
- Fix deprecation warnings"
```

#### Advanced Commit Message Techniques

```bash
# Breaking changes annotation
git commit -m "feat(api): redesign user authentication endpoint

BREAKING CHANGE: The /auth endpoint now requires email instead of username

- Replace username field with email in request body
- Update response format to include user profile
- Add backward compatibility for 6 months
- Update API documentation and migration guide

Closes #89"

# Co-authorship attribution
git commit -m "feat(dashboard): implement real-time notifications

Co-authored-by: Alice Developer <alice@company.com>
Co-authored-by: Bob Engineer <bob@company.com>"

# Reference multiple issues
git commit -m "fix(security): patch XSS vulnerability in comment system

Fixes #234
Closes #235
Relates to #189
See also #201"
```

### 18.2 Branch Naming and Organization

Consistent branch naming enables automation, improves collaboration, and maintains clean repository structure.

#### Hierarchical Branch Naming

```bash
# Feature development
feature/user-authentication
feature/payment-integration
feature/admin-dashboard
feature/mobile-responsive-design

# Bug fixes
bugfix/login-timeout-error
bugfix/memory-leak-in-parser
bugfix/broken-email-validation

# Hotfixes (critical production issues)
hotfix/security-patch-cve-2024-001
hotfix/payment-processing-failure
hotfix/database-connection-timeout

# Release preparation
release/v2.1.0
release/2024-q1-sprint-3

# Experimental work
experiment/new-caching-algorithm
experiment/microservice-architecture
experiment/performance-optimization

# Personal/developer branches
username/spike-graphql-integration
alice/refactor-authentication-module
bob/investigate-performance-issue

# Documentation
docs/api-reference-update
docs/deployment-guide
docs/contributing-guidelines
```

#### Advanced Branch Organization

```bash
# Environment-specific branches
environment/staging
environment/production
environment/development

# Client-specific features (for agency/consulting work)
client/acme-corp/custom-dashboard
client/beta-company/integration-module

# Version-specific maintenance
maintenance/v1.x
maintenance/v2.x
support/legacy-ie-compatibility

# Integration branches
integration/third-party-api
integration/payment-gateway
integration/analytics-platform
```

### 18.3 Security Best Practices

Security in Git workflows protects intellectual property, prevents data breaches, and maintains compliance standards.

#### Sensitive Data Protection

```bash
# Comprehensive .gitignore for sensitive data
cat > .gitignore << 'EOF'
# Environment variables and secrets
.env*
!.env.example
!.env.template

# API keys and credentials
**/config/secrets.yml
**/config/database.yml
**/config/credentials/*
*.pem
*.key
*.crt
*.p12
*.pfx

# IDE and system files
.vscode/settings.json
.idea/workspace.xml
*.swp
*.swo
.DS_Store
Thumbs.db

# Build outputs and caches
node_modules/
dist/
build/
.cache/
.next/
.nuxt/

# Logs and temporary files
*.log
logs/
tmp/
temp/
*.tmp

# Database files
*.sqlite
*.sqlite3
*.db

# OS-specific
*.pid
*.seed
*.pid.lock
EOF

# Pre-commit hook for secret detection
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Check for potential secrets

echo "🔍 Scanning for potential secrets..."

# Patterns to detect
SECRET_PATTERNS=(
    "password\s*=\s*['\"][^'\"]*['\"]"
    "api[_-]?key\s*=\s*['\"][^'\"]*['\"]"
    "secret\s*=\s*['\"][^'\"]*['\"]"
    "token\s*=\s*['\"][^'\"]*['\"]"
    "private[_-]?key"
    "BEGIN\s+(RSA\s+)?PRIVATE\s+KEY"
    "[0-9a-f]{32}"  # 32-char hex strings
    "[A-Za-z0-9+/]{40}"  # Base64 strings
)

for pattern in "${SECRET_PATTERNS[@]}"; do
    if git diff --cached | grep -qiE "$pattern"; then
        echo "❌ Potential secret detected: $pattern"
        echo "Please remove secrets before committing"
        exit 1
    fi
done

echo "✅ No secrets detected"
EOF

chmod +x .git/hooks/pre-commit
```

#### GPG Commit Signing

```bash
# Generate GPG key
gpg --full-generate-key

# List GPG keys
gpg --list-secret-keys --keyid-format LONG

# Configure Git to use GPG key
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# Export public key for GitHub/GitLab
gpg --armor --export YOUR_KEY_ID

# Sign specific commit
git commit -S -m "feat: add secure payment processing"

# Verify signed commits
git log --show-signature
git verify-commit HEAD
```

#### Access Control and Permissions

```bash
# Repository-level security (via hosting platform)
# - Branch protection rules
# - Required reviews before merge
# - Restrict force pushes
# - Require signed commits
# - Enable dependency vulnerability alerts

# Local security measures
# Disable http.sslVerify only for development (never production)
git config --global http.sslVerify true

# Use credential helpers securely
git config --global credential.helper "cache --timeout=3600"  # 1 hour timeout

# Configure SSH with security best practices
cat > ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentitiesOnly yes
    IdentityFile ~/.ssh/id_ed25519
    AddKeysToAgent yes
    UseKeychain yes  # macOS only
EOF
```

### 18.4 Performance Optimization

Optimized Git repositories improve developer productivity and reduce infrastructure costs.

#### Repository-Level Optimizations

```bash
# Comprehensive performance configuration
git config --global core.preloadindex true      # Faster index operations
git config --global core.fscache true           # Cache file system calls
git config --global gc.auto 256                 # More frequent cleanup
git config --global pack.threads 0              # Use all CPU cores
git config --global pack.deltaCacheSize 2047m   # Larger delta cache
git config --global pack.packSizeLimit 2g       # Larger pack files
git config --global pack.windowMemory 256m      # More memory for packing

# Network optimizations
git config --global http.postBuffer 524288000   # 500MB buffer
git config --global http.lowSpeedLimit 1000     # 1KB/s minimum
git config --global http.lowSpeedTime 300       # 5 minute timeout

# Enable parallel operations
git config --global fetch.parallel 4            # Parallel fetch operations
git config --global submodule.fetchJobs 4       # Parallel submodule fetch
```

#### Large Repository Strategies

```bash
# Partial clone (Git 2.19+)
git clone --filter=blob:none https://github.com/large/repo.git
git clone --filter=tree:0 https://github.com/large/repo.git

# Shallow clone with limited history
git clone --depth 50 https://github.com/repo.git

# Sparse checkout for monorepos
git config core.sparseCheckout true
echo "frontend/" > .git/info/sparse-checkout
echo "shared/" >> .git/info/sparse-checkout
git read-tree -m -u HEAD

# Maintenance automation
git config --global maintenance.auto true
git config --global maintenance.strategy incremental

# Manual repository maintenance
git maintenance run --auto        # Auto maintenance
git maintenance run --task=gc     # Garbage collection
git maintenance run --task=commit-graph  # Optimize commit graph
```

#### Development Workflow Optimizations

```bash
# Optimize daily workflows
# Efficient status checking
git config --global alias.s "status --short --branch"

# Fast branch switching with stash
git config --global alias.sw "!f() { git stash push -u -m 'auto-stash' && git switch \$1 && git stash pop; }; f"

# Quick commit with verification
git config --global alias.qc "!f() { git add . && git commit -m \"\$1\" && git push; }; f"

# Optimized log viewing
git config --global alias.l "log --oneline --graph --decorate -10"
git config --global alias.la "log --oneline --graph --decorate --all -10"

# Efficient diff viewing
git config --global alias.d "diff --word-diff=color"
git config --global alias.ds "diff --staged --word-diff=color"
```

### 18.5 Team Collaboration Standards

Effective team practices ensure consistent quality and smooth collaboration across diverse development teams.

#### Code Review Excellence

```bash
# Automated quality checks before review
cat > .github/workflows/code-quality.yml << 'EOF'
name: Code Quality

on: [pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Type checking
      run: npm run type-check
    
    - name: Security audit
      run: npm audit --audit-level moderate
EOF

# CODEOWNERS for automatic review assignment
cat > .github/CODEOWNERS << 'EOF'
# Global owners
* @team-leads

# Frontend code
src/components/ @frontend-team
src/styles/ @frontend-team @design-team

# Backend code
src/api/ @backend-team
src/database/ @backend-team @dba-team

# Infrastructure
.github/ @devops-team
docker/ @devops-team
k8s/ @devops-team

# Documentation
docs/ @documentation-team
*.md @documentation-team

# Security-sensitive files
src/auth/ @security-team
src/crypto/ @security-team
EOF

# Pull request template
cat > .github/PULL_REQUEST_TEMPLATE.md << 'EOF'
## Summary
Brief description of changes

## Changes Made
- [ ] Feature implementation
- [ ] Bug fixes
- [ ] Documentation updates
- [ ] Test coverage

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance impact assessed

## Breaking Changes
- [ ] No breaking changes
- [ ] Breaking changes documented below

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No merge conflicts
EOF
```

#### Release Management

```bash
# Semantic versioning automation
cat > .github/workflows/release.yml << 'EOF'
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Semantic Release
      uses: cycjimmy/semantic-release-action@v3
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
EOF

# Release configuration
cat > .releaserc.yml << 'EOF'
branches:
  - main
  - name: beta
    prerelease: true

plugins:
  - "@semantic-release/commit-analyzer"
  - "@semantic-release/release-notes-generator"
  - "@semantic-release/changelog"
  - "@semantic-release/npm"
  - "@semantic-release/github"
  - "@semantic-release/git"

preset: "conventionalcommits"

releaseRules:
  - type: "feat"
    release: "minor"
  - type: "fix"
    release: "patch"
  - type: "perf"
    release: "patch"
  - type: "docs"
    release: false
  - scope: "no-release"
    release: false
EOF
```

### 18.6 Workflow Automation

Automation reduces manual errors, ensures consistency, and frees developers to focus on creative work.

#### Git Hooks Automation

```bash
# Shared hooks setup script
cat > scripts/setup-hooks.sh << 'EOF'
#!/bin/bash
# Setup shared Git hooks

HOOKS_DIR=".githooks"
GIT_HOOKS_DIR=".git/hooks"

# Create hooks directory if it doesn't exist
mkdir -p "$HOOKS_DIR"

# Configure Git to use shared hooks
git config core.hooksPath "$HOOKS_DIR"

# Make hooks executable
chmod +x "$HOOKS_DIR"/*

echo "✅ Git hooks configured successfully"
EOF

# Comprehensive pre-push validation
cat > .githooks/pre-push << 'EOF'
#!/bin/sh
# Comprehensive pre-push validation

set -e

echo "🚀 Running pre-push validation..."

# Check branch name
branch=$(git rev-parse --abbrev-ref HEAD)
if [[ ! $branch =~ ^(main|develop|feature/|bugfix/|hotfix/|release/) ]]; then
    echo "❌ Invalid branch name: $branch"
    echo "Use: feature/, bugfix/, hotfix/, or release/ prefix"
    exit 1
fi

# Prevent direct push to protected branches
if [ "$branch" = "main" ] || [ "$branch" = "develop" ]; then
    echo "❌ Direct push to $branch is not allowed"
    echo "Create a pull request instead"
    exit 1
fi

# Run tests
if [ -f package.json ]; then
    echo "🧪 Running tests..."
    npm test || exit 1
fi

# Check for merge conflicts markers
if git grep -l "<<<<<<< HEAD" -- '*.js' '*.jsx' '*.ts' '*.tsx' 2>/dev/null; then
    echo "❌ Merge conflict markers found"
    exit 1
fi

# Verify no debug statements
if git diff origin/main...HEAD --name-only | xargs grep -l "console.log\|debugger\|TODO" 2>/dev/null; then
    echo "⚠️  Debug statements or TODOs found"
    echo "Consider removing before pushing"
fi

echo "✅ Pre-push validation passed"
EOF

chmod +x .githooks/pre-push
```

#### Continuous Integration Integration

```bash
# Advanced CI/CD pipeline
cat > .github/workflows/ci-cd.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      if: matrix.node-version == '18'

  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Run security audit
      run: npm audit --audit-level high
    
    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build-and-deploy:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install and build
      run: |
        npm ci
        npm run build
    
    - name: Deploy to staging
      run: |
        # Add deployment script here
        echo "Deploying to staging..."
EOF
```

### 18.7 Monitoring and Metrics

Understanding repository health and team productivity helps optimize development processes.

#### Repository Health Monitoring

```bash
# Repository statistics script
cat > scripts/repo-stats.sh << 'EOF'
#!/bin/bash
# Generate repository health report

echo "📊 Repository Health Report"
echo "=========================="
echo

echo "Repository Size:"
echo "  .git directory: $(du -sh .git | cut -f1)"
echo "  Working tree: $(du -sh --exclude=.git . | cut -f1)"
echo

echo "Commit Statistics (last 30 days):"
echo "  Total commits: $(git rev-list --count --since="30 days ago" HEAD)"
echo "  Contributors: $(git shortlog --since="30 days ago" -sn | wc -l)"
echo "  Files changed: $(git diff --name-only HEAD@{30.days.ago}..HEAD | wc -l)"
echo

echo "Branch Information:"
echo "  Local branches: $(git branch | wc -l)"
echo "  Remote branches: $(git branch -r | wc -l)"
echo "  Merged branches: $(git branch --merged main | grep -v main | wc -l)"
echo "  Unmerged branches: $(git branch --no-merged main | wc -l)"
echo

echo "Top Contributors (last 30 days):"
git shortlog --since="30 days ago" -sn | head -5
echo

echo "Largest Files:"
git rev-list --objects --all | \
git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
sed -n 's/^blob //p' | \
sort -nk2 | \
tail -5 | \
while read size name; do
    echo "  $(numfmt --to=iec $size) $name"
done
EOF

chmod +x scripts/repo-stats.sh
```

These comprehensive best practices ensure your Git workflows scale effectively, maintain security, and support productive team collaboration. Regular review and adaptation of these practices keeps your development process optimized for changing team needs and project requirements.
