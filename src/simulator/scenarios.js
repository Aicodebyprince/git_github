export const DEVELOPERS = {
  alex: {
    id: 'alex',
    name: 'Alex Rivera',
    role: 'Backend Engineer',
    avatar: '👨‍💻',
    color: '#818cf8',
    branch: 'login-feature',
    bio: 'Responsible for OAuth2 endpoints, JWT validation, and user database models.'
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Frontend Engineer',
    avatar: '👩‍💻',
    color: '#f472b6',
    branch: 'login-ui',
    bio: 'Designs responsive auth forms, password strength meters, and accessibility.'
  },
  mike: {
    id: 'mike',
    name: 'Mike Kowalski',
    role: 'Full-Stack Engineer',
    avatar: '🧑‍💻',
    color: '#38bdf8',
    branch: 'register-feature',
    bio: 'Builds user registration flow, email verification tokens, and welcome onboarding.'
  }
};

export const SCENARIOS = [
  {
    id: 1,
    stage: 1,
    title: 'Alex starts Login Feature',
    category: 'BRANCH STRATEGY',
    developer: DEVELOPERS.alex,
    company: 'ShopFlow Inc.',
    dilemma:
      'Alex has arrived on Monday morning to start the new Authentication Service. The production repo currently has only the initial baseline commit on main.',
    situation: 'What should Alex do before writing any application code?',
    question: 'What should Alex create before coding?',
    options: [
      {
        id: 'A',
        label: 'git push',
        cmd: 'git push origin main',
        isCorrect: false,
        dangerTitle: 'Unsafe Direct Push to Remote',
        dangerExplanation:
          'Running `git push` right now attempts to push uncommitted or unmodified state to the remote repository. Pushing directly to main without an isolated branch violates branch protection rules and risks breaking production for everyone.'
      },
      {
        id: 'B',
        label: 'git branch login-feature',
        cmd: 'git checkout -b login-feature',
        isCorrect: true,
        explanation:
          'Creating a feature branch (`git branch login-feature` or `git checkout -b login-feature`) isolates Alex’s experimental work from the production `main` branch. This guarantees `main` stays pristine and deployable at all times.'
      },
      {
        id: 'C',
        label: 'git revert',
        cmd: 'git revert HEAD',
        isCorrect: false,
        dangerTitle: 'Inappropriate History Inversion',
        dangerExplanation:
          '`git revert` creates a new commit that inverts previous changes. Alex hasn’t written or committed any code yet, so reverting would only undo existing repository setup.'
      },
      {
        id: 'D',
        label: 'git stash',
        cmd: 'git stash',
        isCorrect: false,
        dangerTitle: 'Empty Stash Operation',
        dangerExplanation:
          '`git stash` is used to temporarily shelve uncommitted dirty working directory changes. Because Alex hasn’t touched any files yet, running stash is a no-op that doesn’t set up a working environment.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'login-feature'],
      highlightBranch: 'login-feature',
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c1', label: 'login-feature', branch: 'login-feature', type: 'branch-head', hash: '8a12d4f' }
      ]
    }
  },
  {
    id: 2,
    stage: 2,
    title: 'Sarah starts Login UI Work',
    category: 'TEAM ISOLATION',
    developer: DEVELOPERS.sarah,
    company: 'ShopFlow Inc.',
    dilemma:
      'Sarah Chen joins the sprint to build the login forms and styling. Alex is actively writing API logic on `login-feature`.',
    situation:
      'Sarah is ready to start coding the React login form. How should she structure her branch workspace?',
    question: 'Should Sarah work directly on Alex\'s branch?',
    options: [
      {
        id: 'A',
        label: 'Yes, collaborate directly on login-feature',
        cmd: 'git checkout login-feature',
        isCorrect: false,
        dangerTitle: 'Collision & Merge Conflicts Risk',
        dangerExplanation:
          'Having multiple engineers commit and push concurrently to the same unstable branch causes race conditions, constant merge conflict interruptions, and makes it impossible to isolate which developer broke a test.'
      },
      {
        id: 'B',
        label: 'No, create login-ui branch',
        cmd: 'git checkout -b login-ui',
        isCorrect: true,
        explanation:
          'Sarah creates her own isolated branch `login-ui`. In professional teams, each engineer or distinct functional component gets its own branch to allow independent iteration and clean code reviews.'
      },
      {
        id: 'C',
        label: 'git revert',
        cmd: 'git revert HEAD',
        isCorrect: false,
        dangerTitle: 'Destructive Action',
        dangerExplanation:
          '`git revert` is meant to cancel historical commits. It does not provide Sarah with a dedicated workspace for frontend UI development.'
      },
      {
        id: 'D',
        label: 'git clone',
        cmd: 'git clone git@github.com:shopflow/auth.git',
        isCorrect: false,
        dangerTitle: 'Redundant Full Clone',
        dangerExplanation:
          'Sarah already has the local repository checked out. Re-cloning the entire repository creates duplicate disk folders and fails to solve the branch isolation strategy.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'login-feature', 'login-ui'],
      highlightBranch: 'login-ui',
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c1', label: 'login-feature', branch: 'login-feature', type: 'commit', hash: '8a12d4f' },
        { id: 'c2', label: 'login-ui', branch: 'login-ui', type: 'branch-head', hash: '3c90f2b' }
      ]
    }
  },
  {
    id: 3,
    stage: 3,
    title: 'Mike starts Registration Feature',
    category: 'PARALLEL WORKSTREAMS',
    developer: DEVELOPERS.mike,
    company: 'ShopFlow Inc.',
    dilemma:
      'Mike Kowalski is tasked with building the User Registration pipeline. The login feature is still unfinished in its own branches.',
    situation:
      'Mike needs to develop registration without relying on unmerged or broken login code. What Git command should he execute?',
    question: 'What should Mike do?',
    options: [
      {
        id: 'A',
        label: 'git branch register-feature',
        cmd: 'git checkout -b register-feature main',
        isCorrect: true,
        explanation:
          'Mike branches off `main` to create `register-feature`. By branching from stable `main`, Mike avoids taking untested dependencies from Alex or Sarah and works completely in parallel.'
      },
      {
        id: 'B',
        label: 'git merge',
        cmd: 'git merge login-feature',
        isCorrect: false,
        dangerTitle: 'Premature Dependency Coupling',
        dangerExplanation:
          'Merging incomplete, unapproved work from `login-feature` into Mike’s branch pollutes the registration workstream with experimental code that may change or fail review.'
      },
      {
        id: 'C',
        label: 'git stash',
        cmd: 'git stash drop',
        isCorrect: false,
        dangerTitle: 'Irrelevant Stash Call',
        dangerExplanation:
          'Stashing or dropping stashes has no effect on starting a new feature branch and could lose existing saved work.'
      },
      {
        id: 'D',
        label: 'git reset',
        cmd: 'git reset --hard HEAD~1',
        isCorrect: false,
        dangerTitle: 'Destructive History Erasure',
        dangerExplanation:
          '`git reset --hard` erases commits and working tree modifications permanently. Mike would destroy local work instead of creating a branch.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'login-feature', 'login-ui', 'register-feature'],
      highlightBranch: 'register-feature',
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c1', label: 'login-feature', branch: 'login-feature', type: 'commit', hash: '8a12d4f' },
        { id: 'c2', label: 'login-ui', branch: 'login-ui', type: 'commit', hash: '3c90f2b' },
        { id: 'c3', label: 'register-feature', branch: 'register-feature', type: 'branch-head', hash: '9b71e41' }
      ]
    }
  },
  {
    id: 4,
    stage: 4,
    title: 'Alex finishes Login Backend',
    category: 'CODE REVIEW PROTOCOL',
    developer: DEVELOPERS.alex,
    company: 'ShopFlow Inc.',
    dilemma:
      'Alex finishes the authentication backend (JWT creation, bcrypt hashing, OAuth routes) and passes local tests.',
    situation:
      'Alex wants his backend code to be integrated into the primary production `main` branch. What is the mandatory enterprise step?',
    question: 'What should happen before putting code into main?',
    options: [
      {
        id: 'A',
        label: 'Direct push to main',
        cmd: 'git push origin login-feature:main --force',
        isCorrect: false,
        dangerTitle: 'Unsafe Direct Push: Production Hazard',
        dangerExplanation:
          'Large software engineering companies rarely allow direct pushes to main. Direct pushes bypass CI automated testing, security vulnerability scanning, and peer review. A single bug could take down the checkout system.'
      },
      {
        id: 'B',
        label: 'Pull Request',
        cmd: 'gh pr create --title "feat: login backend service" --base main',
        isCorrect: true,
        explanation:
          'Alex opens a Pull Request (PR). This initiates automated CI/CD checks (unit tests, linters, security audits) and allows teammates to review the code for security bugs and architectural consistency.'
      },
      {
        id: 'C',
        label: 'Delete branch',
        cmd: 'git branch -D login-feature',
        isCorrect: false,
        dangerTitle: 'Catastrophic Data Loss',
        dangerExplanation:
          'Deleting the branch before merging would erase all of Alex’s work from the Git reflog, throwing away days of engineering progress!'
      },
      {
        id: 'D',
        label: 'git stash',
        cmd: 'git stash save "login backend"',
        isCorrect: false,
        dangerTitle: 'Stashing Finished Code',
        dangerExplanation:
          'Stashing shelters working files locally on Alex’s computer. Teammates cannot review or deploy stashed code.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'login-feature', 'login-ui', 'register-feature'],
      highlightBranch: 'login-feature',
      hasPR: true,
      prTitle: 'PR #101: feat(auth): Login Backend API',
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c1', label: 'feat(api): auth routes', branch: 'login-feature', type: 'commit', hash: '8a12d4f' },
        { id: 'c1b', label: 'PR #101 [Reviewing]', branch: 'login-feature', type: 'pr', hash: 'pr-101' },
        { id: 'c2', label: 'login-ui', branch: 'login-ui', type: 'commit', hash: '3c90f2b' },
        { id: 'c3', label: 'register-feature', branch: 'register-feature', type: 'commit', hash: '9b71e41' }
      ]
    }
  },
  {
    id: 5,
    stage: 5,
    title: 'Sarah finishes Login UI',
    category: 'BRANCH INTEGRATION',
    developer: DEVELOPERS.sarah,
    company: 'ShopFlow Inc.',
    dilemma:
      'Sarah completes the frontend form components on `login-ui`. The UI must connect with Alex’s backend endpoints before shipping as one complete feature.',
    situation:
      'Sarah needs to combine her frontend work with Alex’s backend code so both can be validated together. What should happen first?',
    question: 'What should happen first?',
    options: [
      {
        id: 'A',
        label: 'Merge login-ui into login-feature',
        cmd: 'git checkout login-feature && git merge login-ui',
        isCorrect: true,
        explanation:
          'Sarah merges `login-ui` into `login-feature`. This unites the backend and frontend into a single coherent login experience, allowing full integration testing before deploying to production.'
      },
      {
        id: 'B',
        label: 'Delete login-ui',
        cmd: 'git branch -D login-ui',
        isCorrect: false,
        dangerTitle: 'Premature Branch Deletion',
        dangerExplanation:
          'Deleting `login-ui` without merging destroys Sarah’s frontend code completely.'
      },
      {
        id: 'C',
        label: 'Revert login-ui',
        cmd: 'git revert HEAD',
        isCorrect: false,
        dangerTitle: 'Undoing UI Work',
        dangerExplanation:
          'Reverting would cancel Sarah’s UI commits, erasing all progress right when it is ready to ship.'
      },
      {
        id: 'D',
        label: 'Push directly to main',
        cmd: 'git push origin login-ui:main',
        isCorrect: false,
        dangerTitle: 'Incomplete Partial Deployment',
        dangerExplanation:
          'Pushing isolated frontend code straight to `main` without the supporting backend APIs will cause 404/500 runtime errors for end users on production.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'login-feature', 'register-feature'],
      highlightBranch: 'login-feature',
      mergedBranch: 'login-ui',
      isMergeAction: true,
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c1', label: 'feat(api): auth routes', branch: 'login-feature', type: 'commit', hash: '8a12d4f' },
        { id: 'c2', label: 'feat(ui): login form', branch: 'login-ui', type: 'commit', hash: '3c90f2b' },
        { id: 'c4', label: 'Merge login-ui -> login-feature', branch: 'login-feature', type: 'merge', hash: '5e44a10' },
        { id: 'c3', label: 'register-feature', branch: 'register-feature', type: 'commit', hash: '9b71e41' }
      ]
    }
  },
  {
    id: 6,
    stage: 6,
    title: 'Login Feature lands on Main',
    category: 'PRODUCTION RELEASE',
    developer: DEVELOPERS.alex,
    company: 'ShopFlow Inc.',
    dilemma:
      'The unified `login-feature` (backend + UI) passed all automated CI tests, end-to-end Cypress tests, and received 2 senior approvals on PR #101.',
    situation:
      'The Login feature is completely certified and ready for release. What should happen next?',
    question: 'What should happen next?',
    options: [
      {
        id: 'A',
        label: 'Merge login-feature into main',
        cmd: 'gh pr merge 101 --merge',
        isCorrect: true,
        explanation:
          'Merge `login-feature` into `main`! The certified, approved login feature becomes the official source of truth on `main`, triggering automated deployment to staging and production.'
      },
      {
        id: 'B',
        label: 'Delete main',
        cmd: 'git branch -D main',
        isCorrect: false,
        dangerTitle: 'Critical Catastrophe',
        dangerExplanation:
          'Deleting the `main` branch removes the central production baseline of the entire company, crashing CI/CD infrastructure.'
      },
      {
        id: 'C',
        label: 'git stash',
        cmd: 'git stash',
        isCorrect: false,
        dangerTitle: 'Stalling Release Pipeline',
        dangerExplanation:
          'Stashing does not publish or merge anything. It abandons the approved PR in purgatory.'
      },
      {
        id: 'D',
        label: 'Create new repository',
        cmd: 'git init shopflow-v2',
        isCorrect: false,
        dangerTitle: 'Monorepo Fragmentation',
        dangerExplanation:
          'Creating an entirely new repo resets git history, fractures codebase continuity, and breaks deployment links.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'register-feature'],
      highlightBranch: 'main',
      mergedBranch: 'login-feature',
      isMergeAction: true,
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c4', label: 'feat(login): complete auth flow', branch: 'main', type: 'merge', hash: '5e44a10' },
        { id: 'c3', label: 'register-feature', branch: 'register-feature', type: 'behind', hash: '9b71e41' }
      ]
    }
  },
  {
    id: 7,
    stage: 7,
    title: 'Mike\'s branch is behind main',
    category: 'HISTORY SYNCHRONIZATION',
    developer: DEVELOPERS.mike,
    company: 'ShopFlow Inc.',
    dilemma:
      'Because `login-feature` merged into `main`, Mike’s `register-feature` branch is now stale and behind `main`. Mike needs the new auth tokens that were just merged into main.',
    situation:
      'Mike needs to update his branch with the latest code from `main` without creating messy merge commit tangles. What should Mike do?',
    question: 'What should Mike do?',
    options: [
      {
        id: 'A',
        label: 'git rebase main',
        cmd: 'git checkout register-feature && git rebase origin/main',
        isCorrect: true,
        explanation:
          'Running `git rebase main` rewinds Mike’s registration commits, fast-forwards his branch to the new HEAD of `main`, and reapplies his commits on top. This maintains a clean, linear, conflict-free commit history.'
      },
      {
        id: 'B',
        label: 'git clone',
        cmd: 'git clone git@github.com:shopflow/auth.git',
        isCorrect: false,
        dangerTitle: 'Duplicated Working Copy',
        dangerExplanation:
          'Cloning downloads another copy of the repo to a new directory, leaving Mike’s branch out of date and un-rebased.'
      },
      {
        id: 'C',
        label: 'git revert',
        cmd: 'git revert HEAD',
        isCorrect: false,
        dangerTitle: 'Undoing Registration Work',
        dangerExplanation:
          '`git revert` reverses Mike’s own commits instead of pulling in the new work from `main`.'
      },
      {
        id: 'D',
        label: 'git stash',
        cmd: 'git stash',
        isCorrect: false,
        dangerTitle: 'No Upstream Sync',
        dangerExplanation:
          '`git stash` hides local uncommitted files but does nothing to synchronize with `main`.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'register-feature'],
      highlightBranch: 'register-feature',
      isRebaseAction: true,
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c4', label: 'feat(login): complete auth flow', branch: 'main', type: 'commit', hash: '5e44a10' },
        { id: 'c3_rebased', label: 'register-feature (rebased on main)', branch: 'register-feature', type: 'rebase-head', hash: '2a88f7c' }
      ]
    }
  },
  {
    id: 8,
    stage: 8,
    title: 'Mike finishes Registration',
    category: 'CODE QUALITY GATEWAY',
    developer: DEVELOPERS.mike,
    company: 'ShopFlow Inc.',
    dilemma:
      'Mike completes the registration logic on top of the rebased branch. His tests pass and verify compatibility with the login feature.',
    situation:
      'Mike is ready to land his registration code into `main`. How should it enter main?',
    question: 'How should it enter main?',
    options: [
      {
        id: 'A',
        label: 'Pull Request',
        cmd: 'gh pr create --title "feat(register): user registration service" --base main',
        isCorrect: true,
        explanation:
          'Opening a Pull Request is standard protocol. It allows Alex and Sarah to inspect the registration flow, triggers automated test matrices, and prevents unauthorized direct writes to production.'
      },
      {
        id: 'B',
        label: 'Delete branch',
        cmd: 'git branch -D register-feature',
        isCorrect: false,
        dangerTitle: 'Destructive Deletion',
        dangerExplanation:
          'Deleting the branch erases all of Mike’s registration code before it ever reaches production!'
      },
      {
        id: 'C',
        label: 'git reset',
        cmd: 'git reset --hard origin/main',
        isCorrect: false,
        dangerTitle: 'Overwriting Local Feature',
        dangerExplanation:
          'Hard resetting to `origin/main` discards Mike’s registration work and reverts him back to the baseline.'
      },
      {
        id: 'D',
        label: 'git stash',
        cmd: 'git stash save',
        isCorrect: false,
        dangerTitle: 'Hiding Code Locally',
        dangerExplanation:
          'Stashing does not publish a PR for team review or CI testing.'
      }
    ],
    graphState: {
      activeBranches: ['main', 'register-feature'],
      highlightBranch: 'register-feature',
      hasPR: true,
      prTitle: 'PR #102: feat(register): User Registration Flow',
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c4', label: 'feat(login): complete auth flow', branch: 'main', type: 'commit', hash: '5e44a10' },
        { id: 'c3_rebased', label: 'register-feature', branch: 'register-feature', type: 'commit', hash: '2a88f7c' },
        { id: 'pr102', label: 'PR #102 [Ready to Merge]', branch: 'register-feature', type: 'pr', hash: 'pr-102' }
      ]
    }
  },
  {
    id: 9,
    stage: 9,
    title: 'Mike has many messy commits',
    category: 'HISTORY HYGIENE',
    developer: DEVELOPERS.mike,
    company: 'ShopFlow Inc.',
    dilemma:
      'Mike made 8 rapid commits during development: "wip", "fix typo", "oops forgot file", "test again", "fix test", "clean up", "more wip", "ready". Committing this noise directly to main will clutter the git history forever.',
    situation:
      'How should the 8 messy WIP commits be merged into `main` to preserve a clean, professional commit log?',
    question: 'What should be used before merging?',
    options: [
      {
        id: 'A',
        label: 'Squash Merge',
        cmd: 'gh pr merge 102 --squash --body "feat(register): complete registration flow"',
        isCorrect: true,
        explanation:
          'Squash Merge compresses all 8 messy intermediate WIP commits into a single, clean, cohesive commit on `main`. The production git log remains readable, searchable with git bisect, and easy to rollback if needed.'
      },
      {
        id: 'B',
        label: 'git clone',
        cmd: 'git clone git@github.com:shopflow/auth.git',
        isCorrect: false,
        dangerTitle: 'Unrelated Git Command',
        dangerExplanation:
          'Cloning does not compress or clean up commits; it only creates another copy of the repo on disk.'
      },
      {
        id: 'C',
        label: 'git reset',
        cmd: 'git reset --mixed HEAD~8',
        isCorrect: false,
        dangerTitle: 'Unsynchronized Local Mutation',
        dangerExplanation:
          'Running a local reset does not solve the GitHub PR merge strategy and can desync remote branch tracking.'
      },
      {
        id: 'D',
        label: 'git checkout',
        cmd: 'git checkout main',
        isCorrect: false,
        dangerTitle: 'Branch Switch Only',
        dangerExplanation:
          'Switching branches without squashing leaves the 8 messy commits in the PR history.'
      }
    ],
    graphState: {
      activeBranches: ['main'],
      highlightBranch: 'main',
      isSquashAction: true,
      messyCommitsCount: 8,
      nodes: [
        { id: 'c0', label: 'Initial Project', branch: 'main', type: 'commit', hash: 'e3f19a0' },
        { id: 'c4', label: 'feat(login): complete auth flow', branch: 'main', type: 'commit', hash: '5e44a10' },
        { id: 'c_squashed', label: 'feat(register): complete registration flow', branch: 'main', type: 'squash', hash: '7d31b09' }
      ]
    }
  }
];
