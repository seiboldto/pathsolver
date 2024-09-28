# Release

This document describes the current release workflow.

1. On the `dev` branch, update the version number in `package.json`.
2. Run `npm install` to update the version number everywhere else.
3. Update the `CHANGELOG.md` file.
4. Stage the changes and run `git commit -m "release: vX.Y.Z"`.
5. On the `main` branch, run `git merge dev`.
6. Create a tag for the current commit: `git tag -a "vX.Y.Z" -m "vX.Y.Z"`.
7. Push the changes.
8. Run `git push origin vX.Y.Z` to update the remote tags.
9. On the `dev` branch, run `git rebase main`.
