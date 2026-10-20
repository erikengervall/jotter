# jotter

A tiny command-line note taker you can extend with plugins.

> Demo repository for a Wildfire walkthrough. It is a real, working tool, kept deliberately small.

```bash
npm install -g github:erikengervall/jotter
jot add "Call the plumber on Tuesday"
jot list
jot count
```

### Clip a web page

```bash
export FIRECRAWL_API_KEY=fc-...   # free key at https://firecrawl.dev
jot clip https://example.com
```

Notes live in `~/.jotter/notes.json` (set `JOTTER_HOME` to move them).

## Plugins

Every file in `plugins/` adds commands to `jot`. The interface is one default export with a name and its commands; [PLUGINS.md](PLUGINS.md) documents it and lists the shipped plugins.

## Develop

```bash
npm install
npm test
```
