# Cerebrum CTO MCP Server

An MCP (Model Context Protocol) server that provides tools for the CERI (Cerebrum Engineering & Research Intelligence) agent.

## Features

### Tools

| Tool                | Description                            |
| ------------------- | -------------------------------------- |
| `codebase_search`   | Semantic search across the codebase    |
| `tech_debt_list`    | List and filter technical debt items   |
| `tech_debt_add`     | Add new technical debt to tracker      |
| `dependency_audit`  | Check for outdated/vulnerable packages |
| `performance_check` | Run Lighthouse and bundle analysis     |
| `memory_read`       | Read CTO memory files                  |
| `memory_update`     | Update CTO memory files                |

### Resources

| Resource                        | Description                    |
| ------------------------------- | ------------------------------ |
| `cerebrum://edtech-news`        | Latest EdTech news and trends  |
| `cerebrum://competitor-updates` | Competitor intelligence report |
| `cerebrum://neet-updates`       | NTA exam announcements         |

## Installation

```bash
cd mcp-servers/cerebrum-cto
npm install
npm run build
```

## Usage

### With Claude Code

Add to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "cerebrum-cto": {
      "command": "node",
      "args": ["./mcp-servers/cerebrum-cto/dist/index.js"],
      "env": {
        "CEREBRUM_PROJECT_ROOT": "/path/to/cerebrum-biology-academy"
      }
    }
  }
}
```

### Development

```bash
# Run in development mode with hot reload
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build
```

## Environment Variables

| Variable                | Description                     | Default         |
| ----------------------- | ------------------------------- | --------------- |
| `CEREBRUM_PROJECT_ROOT` | Path to the Cerebrum project    | `process.cwd()` |
| `NEWS_API_KEY`          | API key for news fetching       | -               |
| `GOOGLE_API_KEY`        | Google API for various services | -               |

## Tool Examples

### Search Codebase

```json
{
  "name": "codebase_search",
  "arguments": {
    "query": "authentication",
    "fileTypes": [".ts", ".tsx"],
    "maxResults": 5
  }
}
```

### List Tech Debt

```json
{
  "name": "tech_debt_list",
  "arguments": {
    "priority": "high",
    "status": "open"
  }
}
```

### Audit Dependencies

```json
{
  "name": "dependency_audit",
  "arguments": {
    "checkSecurity": true,
    "checkOutdated": true
  }
}
```

## Extending

### Adding New Tools

1. Create a new file in `src/tools/`
2. Export the tool function
3. Import and register in `src/index.ts`
4. Add to the `ListToolsRequestSchema` handler

### Adding New Resources

1. Create a new file in `src/resources/`
2. Export the fetch function
3. Import and register in `src/index.ts`
4. Add to the `ListResourcesRequestSchema` handler

## Architecture

```
cerebrum-cto/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── tools/
│   │   ├── codebase-search.ts
│   │   ├── tech-debt-tracker.ts
│   │   ├── dependency-auditor.ts
│   │   ├── performance-monitor.ts
│   │   └── memory-manager.ts
│   └── resources/
│       ├── edtech-news.ts
│       └── competitor-watch.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Future Enhancements

- [ ] Vector embeddings for true semantic search
- [ ] Real-time news API integration
- [ ] Automated competitor website scraping
- [ ] Lighthouse CI integration
- [ ] GitHub integration for PR analysis
- [ ] Slack notifications for alerts

## License

MIT
