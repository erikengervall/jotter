export default {
  name: "firecrawl",
  description: "Clips a web page into a note with Firecrawl. Needs FIRECRAWL_API_KEY (free key at https://firecrawl.dev).",
  commands: {
    clip: {
      usage: "jot clip <url>",
      run: async ([url], ctx) => {
        if (!url) throw new Error("Usage: jot clip <url>");
        const firecrawl = ctx.firecrawl ?? (await createClient());
        const page = await firecrawl.scrape(url, { formats: ["markdown"], onlyMainContent: true, integration: "_jotter" });
        const title = page.metadata?.title || url;
        await ctx.addNote(page.markdown ?? "", { title, source: url });
        ctx.log(`Clipped ${title}`);
      },
    },
  },
};

async function createClient() {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY is not set. Get a free key at https://firecrawl.dev and export it.");
  const { default: Firecrawl } = await import("@mendable/firecrawl-js");
  return new Firecrawl({ apiKey });
}
