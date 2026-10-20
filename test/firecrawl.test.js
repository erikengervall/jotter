import { test } from "node:test";
import assert from "node:assert/strict";
import firecrawl from "../plugins/firecrawl.js";

test("jot clip scrapes the URL and saves it as a note", async () => {
  const calls = [];
  const notes = [];
  const lines = [];
  const ctx = {
    firecrawl: {
      scrape: async (url, options) => {
        calls.push({ url, options });
        return { markdown: "# Hello", metadata: { title: "Hello page" } };
      },
    },
    addNote: async (text, meta) => notes.push({ text, ...meta }),
    log: (line) => lines.push(line),
  };
  await firecrawl.commands.clip.run(["https://example.com"], ctx);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://example.com");
  assert.deepEqual(calls[0].options.formats, ["markdown"]);
  assert.equal(calls[0].options.integration, "_jotter");
  assert.deepEqual(notes, [{ text: "# Hello", title: "Hello page", source: "https://example.com" }]);
  assert.deepEqual(lines, ["Clipped Hello page"]);
});

test("jot clip names FIRECRAWL_API_KEY when it is missing", async () => {
  const saved = process.env.FIRECRAWL_API_KEY;
  delete process.env.FIRECRAWL_API_KEY;
  try {
    await assert.rejects(firecrawl.commands.clip.run(["https://example.com"], { addNote: async () => {}, log: () => {} }), /FIRECRAWL_API_KEY/);
  } finally {
    if (saved !== undefined) process.env.FIRECRAWL_API_KEY = saved;
  }
});
