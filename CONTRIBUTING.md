# Contributing

Milio favors simple, explicit code over generic architecture.

## Before you start

Read the [README](README.md), [security policy](SECURITY.md), and [code of conduct](CODE_OF_CONDUCT.md). Do not include real thought content, LocalStorage exports, credentials, or other personal data in issues, pull requests, screenshots, or logs.

- Use Zod schemas at every persisted-data boundary.
- Keep state, persistence, and thought mutations behind hooks.
- Do not create `utils` directories. Name modules after their domain or feature.
- Keep one React component per file.
- Keep files under 180 non-comment lines and functions focused.
- Do not add comments to explain code that can be made clear through naming and structure.
- Add tests before changing domain behavior or storage contracts.
- Do not add dependencies without a concrete runtime or verification need.

Before submitting a change, run:

```sh
npm run verify
```

Pull requests should explain the user-facing result, include regression tests for behavior or storage changes, and document any remaining manual Raycast verification.
