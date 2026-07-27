# Milio for Raycast

![Milio project icon](assets/icon.png)

Milio is a local-first thought inbox for capturing ideas instantly and reviewing them later. It is designed for macOS and Raycast.

## Commands

- **Capture Thought** saves a text thought locally. Configure `⌘ ⇧ M` as its shortcut in Raycast Preferences.
- **Review Thoughts** shows all thoughts newest-first, grouped with unreviewed thoughts first.
- **Morning Review** opens the same unreviewed inbox for deliberate processing.

Review actions include marking reviewed or unreviewed, editing, copying, deleting one thought, and deleting all reviewed thoughts. Search and status filters are available from the review list.

## Privacy

Milio stores text locally through Raycast LocalStorage. It does not require an account, upload content, call external APIs, use analytics, use AI, or require network access. Voice capture, cloud sync, and integrations are not part of the MVP.

## Requirements

- macOS
- Raycast
- Node.js 22 or newer for development

## Development

```sh
npm install
npm run verify
```

Use `npm run dev` to load the extension in Raycast during development.

## Data safety

Stored data is versioned and validated before use. Failed writes keep the current form text available so a user can retry. Invalid stored data is reported instead of being silently overwritten.

## Release

Run `npm run verify`, complete the manual keyboard and offline QA checklist, then publish through the Raycast extension workflow. CI runs the same verification command for pushes to `main` and pull requests.

## Reporting problems

Use the issue templates for reproducible bugs and focused feature requests. For security concerns, follow [SECURITY.md](SECURITY.md). Never include real thought content or LocalStorage data in a public report.

## License

MIT. See [LICENSE](LICENSE).
