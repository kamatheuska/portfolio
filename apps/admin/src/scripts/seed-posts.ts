import type { SanitizedConfig } from "payload";

import payload from "payload";
import sharp from "sharp";

// Local development seed: 5 published posts with generated hero images.
// Re-running replaces posts with the same slugs (and their seeded hero images).
// Run with: pnpm payload seed-posts

type TextNode = {
    type: "text";
    text: string;
    format: number;
    version: 1;
    detail: 0;
    mode: "normal";
    style: "";
};

function text(value: string, format = 0): TextNode {
    return { type: "text", text: value, format, version: 1, detail: 0, mode: "normal", style: "" };
}

function element(type: string, children: unknown[], extra: Record<string, unknown> = {}) {
    return { type, children, direction: "ltr", format: "", indent: 0, version: 1, ...extra };
}

function p(...children: (string | TextNode)[]) {
    return element(
        "paragraph",
        children.map(c => (typeof c === "string" ? text(c) : c)),
        { textFormat: 0, textStyle: "" },
    );
}

function h2(value: string) {
    return element("heading", [text(value)], { tag: "h2" });
}

function ul(...items: string[]) {
    return element(
        "list",
        items.map((item, i) => element("listitem", [text(item)], { value: i + 1 })),
        { listType: "bullet", start: 1, tag: "ul" },
    );
}

function quote(value: string) {
    return element("quote", [text(value)]);
}

function doc(...children: unknown[]) {
    return { root: element("root", children) };
}

const BOLD = 1;
const ITALIC = 2;
const CODE = 16;

type SeedPost = {
    title: string;
    slug: string;
    excerpt: string;
    tags: string[];
    colors: [string, string];
    daysAgo: number;
    body: ReturnType<typeof doc>;
};

const posts: SeedPost[] = [
    {
        title: "Why I Moved My Portfolio to a Headless CMS",
        slug: "why-i-moved-my-portfolio-to-a-headless-cms",
        excerpt:
            "Hard-coded content was fine until it wasn't. Here's what changed when I split the admin from the site.",
        tags: ["payload", "cms", "architecture"],
        colors: ["#0f172a", "#6366f1"],
        daysAgo: 2,
        body: doc(
            p(
                "For years my portfolio was a single repository with content baked straight into the templates. The home page heading was a string in a component, the social links were an array in a constants file, and the handful of articles I had written lived as Markdown files next to the code. It worked, and for a long time I would have told you it was the right call. There was no database to back up, no server to patch and nothing that could go down at three in the morning.",
            ),
            p(
                "The problem was never the technology. The problem was friction. Every typo fix meant opening an editor, making a commit, pushing it, waiting for a build and checking the deploy. That loop takes maybe ten minutes, but ten minutes is exactly long enough to make you put things off. I noticed that I had a folder of half-written drafts that never shipped, and the reason was not that they were bad. It was that publishing felt like releasing software.",
            ),
            h2("The breaking point"),
            p(
                "Writing a blog post should feel like ",
                text("writing", ITALIC),
                ", not like shipping a release. When I wanted to add a hero image to an old post, I had to resize it by hand, drop it into the public folder, reference it with the right path and hope I had not broken the build. When I wanted to reorder the links on the home page, I had to find the array, edit it and redeploy. None of these tasks were hard. All of them were annoying enough that I simply stopped doing them.",
            ),
            p(
                "At some point I realised that I was treating my own content like configuration. Configuration belongs in version control. Content belongs somewhere you can edit it in a browser, preview it, save a draft and come back to it on your phone while waiting for a train.",
            ),
            h2("What I actually needed"),
            p(
                "Before choosing a tool I wrote down the requirements, and the list was refreshingly short. I did not need a page builder, a plugin marketplace or a multi-tenant permissions model. I needed a few specific things, and I needed them to be boring:",
            ),
            ul(
                "A real editor with drafts, so unfinished posts never leak onto the site",
                "Structured fields for things like excerpts, tags and SEO metadata",
                "Media uploads that end up on a CDN without manual resizing",
                "An API the static site can read at build time",
                "Something I can self-host cheaply and understand end to end",
            ),
            p(
                "That last point ruled out most hosted options. I am happy to pay for software, but I wanted to own the data and be able to run the whole thing locally with a single command.",
            ),
            h2("Why Payload"),
            p(
                "I ended up with ",
                text("Payload", BOLD),
                ". It is a TypeScript-first CMS that runs inside a Next.js app, and the thing that sold me is that the schema is code. A collection is a plain object that describes its fields, its access rules and its hooks. That means my content model lives in the same repository as everything else, it is reviewed in the same pull requests, and it produces generated TypeScript types that the front end can import.",
            ),
            p(
                "It also meant that the parts I cared about were not hidden behind a GUI. Drafts are one flag on the collection. Access control is a function that receives the request and returns a boolean. Running a script against the database is a matter of exporting a function and registering it in the config. Nothing about it feels magical, which is exactly what I want from infrastructure I plan to maintain on weekends.",
            ),
            quote("The best CMS for a personal site is the one you can read the source of in an afternoon."),
            h2("The architecture"),
            p(
                "The final setup splits the project into two apps that share a monorepo but never share a runtime. The admin is a Payload instance backed by SQLite. The landing site is built with Astro and has no idea a database exists. At build time it calls the admin API with a read-only user, renders every page to static HTML and ships the result to Cloudflare Pages.",
            ),
            ul(
                "Content lives in Payload, backed by a single SQLite file",
                "The landing site is built with Astro and fetches content at build time",
                "Publishing a post triggers a Cloudflare Pages rebuild automatically",
                "Media is stored in Cloudinary and served from its CDN",
            ),
            p(
                "The nice property of this split is that the public site keeps every advantage it had before. It is still just HTML on a CDN. If the admin goes down, nobody visiting the site notices. The admin only has to be up when I am actually writing, and even then a restart costs me nothing but a few seconds.",
            ),
            h2("What got better"),
            p(
                "The obvious win is speed. Fixing a typo now takes about as long as it takes to notice it. But the more interesting change was behavioural. Because drafts are cheap, I started keeping a lot more of them. Because the editor is in the browser, I write in small sessions instead of waiting for a free evening. And because the excerpt and meta description are separate fields with length limits, I actually fill them in, which has made the post listings and social cards look far more consistent.",
            ),
            p(
                "There were also some quiet improvements on the engineering side. The generated types caught several places where the front end assumed a field was always present when it was actually optional. Moving images to a CDN shrank the repository dramatically. And having a single place that owns the content made it trivial to add features like tags later on.",
            ),
            h2("What got worse"),
            p(
                "It would be dishonest to pretend there are no costs. There is now a server to run, a database to back up and migrations to keep in sync. A local setup requires environment variables that did not exist before. And the build is no longer self-contained: if the admin API is unreachable during a deploy, the landing build fails. I mitigated most of that with a careful deploy script and by keeping the admin deliberately small, but the complexity is real and worth acknowledging.",
            ),
            h2("Would I do it again?"),
            p(
                "Yes, without hesitation, but with a caveat. If you write once a year, Markdown files in a repository are perfectly fine and probably better. The moment content starts changing more often than code, though, the calculus flips. For me that moment came when I realised I was avoiding my own website. A headless CMS did not make me a better writer, but it removed every excuse I had for not writing, and that turned out to be what mattered.",
            ),
        ),
    },
    {
        title: "A Practical Guide to Lexical Rich Text",
        slug: "a-practical-guide-to-lexical-rich-text",
        excerpt: "Lexical stores content as a JSON tree. Rendering it yourself is easier than you'd think.",
        tags: ["lexical", "typescript"],
        colors: ["#022c22", "#10b981"],
        daysAgo: 9,
        body: doc(
            p(
                "Rich text is one of those things that looks simple from the outside and turns out to be a small universe once you open the box. When I moved my blog into Payload, the body of every post became a ",
                text("Lexical", BOLD),
                " editor state, and the first question I had was how to turn that into HTML on a static site that does not run any of Payload's code.",
            ),
            p(
                "Payload ships converters for this, and they are good. But my landing site is an Astro project that only fetches JSON at build time, and I did not want to pull the editor's dependency tree into it just to render paragraphs. So I wrote my own serializer. It ended up being about a hundred lines, and writing it taught me more about Lexical than any documentation page.",
            ),
            h2("What Lexical actually stores"),
            p(
                "A Lexical document is a tree. At the top there is a ",
                text("root", CODE),
                " node, and below it there are block-level nodes such as paragraphs, headings, lists and quotes. Those contain inline nodes, most commonly text, but also links and line breaks. Every node has a ",
                text("type", CODE),
                " string and a ",
                text("version", CODE),
                " number, and element nodes carry a ",
                text("children", CODE),
                " array.",
            ),
            p(
                "That is the whole mental model. There is no HTML hiding inside the JSON, no Markdown, and no implicit structure. If something is bold, it is because a text node says so. If a list is numbered, it is because the list node has a ",
                text("listType", CODE),
                " of number. The format is verbose, but it is entirely explicit, and explicit formats are a pleasure to write code against.",
            ),
            h2("Walking the tree"),
            p(
                "Rendering is a recursive walk. A function receives a node, looks at its type and returns a string. Element nodes wrap the result of rendering their children; leaf nodes return their own content. A small recursive ",
                text("serializeNode", CODE),
                " function with a switch on ",
                text("node.type", CODE),
                " covers nearly everything a blog needs.",
            ),
            ul(
                "paragraph becomes a p element",
                "heading reads its tag field and becomes h1 through h6",
                "list checks listType and becomes ul or ol, with listitem children",
                "quote becomes a blockquote",
                "link and autolink read their fields and become anchors",
                "upload resolves the related media document and becomes an img",
            ),
            p(
                "The default branch is important. When the serializer meets a node type it does not recognise, it renders the node's children instead of dropping them. That way a new feature in the editor degrades gracefully into plain text rather than silently swallowing content, which is the kind of bug you only notice months later.",
            ),
            quote("Own your rendering and you own your markup."),
            h2("Text formats are a bitmask"),
            p(
                "The part that surprised me most was formatting. Bold, italic and inline code are not separate nodes; they are bits on the text node's ",
                text("format", CODE),
                " field. Bold is 1, italic is 2, strikethrough is 4, underline is 8 and code is 16. A word that is both bold and italic has a format of 3.",
            ),
            p(
                "Once you know that, the implementation is a loop. You escape the text, then for every flag that is set you wrap the result in the matching tag. The order matters only aesthetically, since browsers do not care whether strong wraps em or the other way round, but keeping it consistent makes snapshot tests stable.",
            ),
            h2("Escaping is not optional"),
            p(
                "Because I am building HTML strings by hand, every piece of user content has to be escaped before it is concatenated. That includes the obvious text content, but also attribute values such as link URLs and image alt text. It is tempting to skip this because the only author is me, but the day you paste a code sample containing angle brackets is the day you will be grateful you did not.",
            ),
            p(
                "Links deserve one more check. Lexical supports internal links that point at other documents rather than URLs. My site does not resolve those yet, so the serializer renders them with a placeholder href instead of trusting whatever happens to be in the field.",
            ),
            h2("Uploads and relationships"),
            p(
                "Images embedded in the body are upload nodes, and their ",
                text("value", CODE),
                " is either the related media document or just its ID, depending on the depth of the API request. Fetching posts with enough depth means the media object arrives already populated, so the serializer can read its URL, dimensions and alt text directly. Including width and height in the output lets the browser reserve space before the image loads, which avoids layout shift for free.",
            ),
            h2("Testing the serializer"),
            p(
                "A serializer is the ideal candidate for unit tests because it is a pure function from JSON to string. I keep a few fixtures that cover each node type, plus a couple of nasty ones: deeply nested lists, text with every format flag set and content that contains HTML special characters. If a future Lexical version changes the shape of a node, those tests fail loudly instead of the blog quietly rendering empty paragraphs.",
            ),
            h2("When not to do this"),
            p(
                "Writing your own renderer makes sense when your front end is a different framework, when you want precise control over the markup, or when bundle size matters. If your site is already a Next.js app running alongside Payload, the official converters will save you time and handle edge cases you have not thought of yet. As usual, the right answer depends on how much of the problem you want to own. For a static blog with a small set of node types, owning it turned out to be both easy and satisfying.",
            ),
        ),
    },
    {
        title: "Debouncing Deploys from CMS Hooks",
        slug: "debouncing-deploys-from-cms-hooks",
        excerpt:
            "Saving five documents shouldn't trigger five builds. A tiny debounce in an afterChange hook fixes that.",
        tags: ["payload", "cloudflare", "devops"],
        colors: ["#431407", "#f97316"],
        daysAgo: 18,
        body: doc(
            p(
                "A static site has one big advantage and one big inconvenience. The advantage is that it is fast, cheap and nearly impossible to take down. The inconvenience is that it never changes on its own. Every time published content changes in the CMS, somebody has to rebuild the site, and if that somebody is a human, it will eventually be forgotten.",
            ),
            p(
                "So the goal was simple: when I publish or update a post, the site should rebuild itself. Cloudflare Pages exposes an API endpoint that starts a new deployment, and Payload lets you run code after any document changes. Connecting the two looked like a ten-line job. It was, at first, and then it was not.",
            ),
            h2("The naive version"),
            p(
                "The first implementation was an ",
                text("afterChange", CODE),
                " hook that called the deploy endpoint directly. Save a post, a build starts. Delete a post, a build starts. It worked perfectly for the exact scenario I tested, which was editing one document at a time.",
            ),
            p(
                "Then I reordered the links on my home page. That is five documents, and five saves in quick succession. Cloudflare dutifully queued five builds. The first four were wasted work, each one cancelled or superseded by the next, and the dashboard turned into a wall of identical deployments. The same thing happened when I uploaded several images or ran a seed script locally with the deploy credentials still in my environment.",
            ),
            h2("Coalescing changes"),
            p(
                "The fix is a classic debounce. Instead of deploying immediately, each change schedules a deploy a few seconds into the future. If another change arrives before the timer fires, the timer is reset. A burst of edits therefore produces exactly one deployment, triggered shortly after the last edit.",
            ),
            p(
                "Keeping a single timer at module scope is enough, because the admin runs as a single process. Every hook shares the same timer, regardless of which collection triggered it. That detail matters: editing a post and then updating a global setting should still result in one build, not two.",
            ),
            quote("The cheapest build is the one you never start."),
            h2("Only rebuild what the public can see"),
            p(
                "Posts in my CMS have drafts enabled, which introduced a subtler problem. Saving a draft also fires the change hook, but drafts are invisible on the public site, so rebuilding for them is pure waste. Worse, autosave can fire the hook every few seconds while I am typing.",
            ),
            p(
                "The hook therefore checks the document's status before scheduling anything. A change matters if the new version is published, or if the previous version was published. That second condition is easy to miss. Unpublishing a post turns it back into a draft, and the site still needs to rebuild so the post disappears.",
            ),
            ul(
                "Only fire for changes that affect published documents",
                "Treat unpublishing as a change to published content",
                "Handle deletes with the same rule as updates",
                "Coalesce everything into a single timer shared across collections",
            ),
            h2("Environments and escape hatches"),
            p(
                "Local development needed its own guard. I want the hook code to run locally so it gets exercised, but I definitely do not want my laptop deploying production. The hook reads an ",
                text("APP_ENV", CODE),
                " variable and logs what it would have done instead of calling the API when it is not running in production.",
            ),
            p(
                "Scripts got a separate escape hatch. Payload passes a context object through every operation, so seed and migration scripts set a ",
                text("skipDeploy", CODE),
                " flag that the hook respects. That keeps bulk operations from scheduling anything at all, even in production, which is exactly what you want when you are importing a hundred documents.",
            ),
            h2("Letting short-lived processes exit"),
            p(
                "One bug took me longer to find than I would like to admit. After adding the debounce, my CLI scripts started hanging for several seconds after they finished. The pending timer was keeping the Node.js event loop alive. Calling ",
                text("unref()", CODE),
                " on the timer tells Node that it should not block process exit, which fixed the hang without affecting the long-running server.",
            ),
            h2("Logging that earns its keep"),
            p(
                "Deploy triggers fail in boring ways: an expired token, a renamed project, a missing permission. Because the call happens in the background, a failure is invisible unless it is logged well. The hook logs when it schedules a deploy, when it skips one and why, and the full error payload when Cloudflare rejects the request. Tokens are truncated to their first few characters so the logs are useful without leaking secrets.",
            ),
            p(
                "When credentials are missing entirely, the hook logs a single message saying the trigger is disabled and then stays quiet. Repeating that warning on every save would just train me to ignore the logs.",
            ),
            h2("Was it worth it?"),
            p(
                "The final hook is around a hundred lines including logging, and it has quietly done its job ever since. The dashboard shows one build per editing session instead of one per click, I never forget to redeploy, and local work never touches production. It is a good reminder that the interesting part of automation is rarely the happy path. It is deciding what should not happen, and making sure it does not.",
            ),
        ),
    },
    {
        title: "Storing Payload Media in Cloudinary",
        slug: "storing-payload-media-in-cloudinary",
        excerpt:
            "Writing a custom cloud storage adapter in under 200 lines, and the error handling that made it debuggable.",
        tags: ["payload", "cloudinary", "media"],
        colors: ["#1e1b4b", "#ec4899"],
        daysAgo: 31,
        body: doc(
            p(
                "By default, Payload stores uploads on the local filesystem next to the application. That is convenient for development and fine for a lot of production setups, but it did not suit mine. My admin runs in a container that I rebuild and replace on every deploy, and the public site is served from a CDN that has no access to that container at all. Images needed to live somewhere else.",
            ),
            p(
                "I chose Cloudinary because its free tier is generous, its CDN is fast, and it can transform images on the fly through the URL. Payload has an official cloud storage plugin that accepts adapters for different providers, but there was no maintained Cloudinary adapter that matched the current version. So I wrote one.",
            ),
            h2("The shape of an adapter"),
            p(
                "Payload's cloud storage plugin accepts any adapter that knows how to upload, delete and generate a URL. Cloudinary fits that shape nicely. An adapter is a function that returns an object with a handful of methods, and each one receives just enough information to do its job:",
            ),
            ul(
                "handleUpload receives the file buffer and filename and stores it remotely",
                "handleDelete receives a filename and removes the remote file",
                "generateURL returns the public URL for a stored file",
                "staticHandler serves files when requests go through Payload instead of the CDN",
            ),
            p(
                "Because I configured the plugin to return the Cloudinary URL directly, the static handler is rarely used. Browsers fetch images straight from the CDN, and Payload never has to proxy the bytes.",
            ),
            h2("One source of truth for IDs"),
            p(
                "The first real problem was identity. Payload keeps the filename with its extension, such as ",
                text("hero.png", CODE),
                ", as the key for a media document. Cloudinary identifies assets by a public ID that does not include the extension. If upload, delete and URL generation each derive the ID slightly differently, things work until they suddenly do not: deletes miss their target and leave orphaned files, or URLs point at assets that do not exist.",
            ),
            p(
                "The fix was to move that derivation into a single small function that every method calls. It prefixes a folder, strips the extension and nothing else. Deriving the ID in one place avoids a whole class of mismatches, and it made the rest of the adapter almost trivial.",
            ),
            h2("Uploading from a buffer"),
            p(
                "Payload hands the adapter an in-memory buffer rather than a file path, so the upload uses Cloudinary's streaming API. I wrap the stream in a promise that resolves with the upload result or rejects with the error. Setting the resource type to auto lets Cloudinary accept images, videos and PDFs without extra configuration.",
            ),
            p(
                "I also disabled overwriting. If two uploads ever produce the same public ID, I would much rather see an error than silently replace an image that is already used by a published post. Payload already appends a suffix to duplicate filenames, so in practice this rarely triggers, but it is a cheap safety net.",
            ),
            quote("A storage adapter is only as good as its error messages."),
            h2("Errors worth reading"),
            p(
                "The part that took the most iteration was error handling. The Cloudinary SDK rejects with plain objects rather than Error instances, and sometimes the useful information is nested one level deeper under an error key. Logged naively, these showed up as an unhelpful object with no stack trace and no obvious cause.",
            ),
            p(
                "Flattening them into named fields, such as the error name, message and HTTP status, made the logs readable. Adding a hint per HTTP status made them actionable. A 401 now says the credentials were rejected and to check that the key belongs to the configured cloud. A 404 says the cloud name is probably wrong. A 420 says I hit a rate limit. Every one of those hints exists because I personally hit that error and spent too long figuring out what it meant.",
            ),
            h2("Logging without leaking"),
            p(
                "Every failure log also includes context about the configuration: the cloud name, the first few characters of the API key and its length, and whether a secret is set at all. That is enough to spot a typo or a missing variable at a glance without ever writing the secret to disk. It sounds like a small thing, but it turned a class of deploy-day problems from twenty minutes of guessing into a single log line.",
            ),
            h2("Migrating existing media"),
            p(
                "Switching storage on a live project means existing documents still point at local files. Payload stores a URL on each media document, so the migration uploaded every existing file to Cloudinary and then updated the stored filenames and URLs. I ran it once against a copy of the production database, checked that every image on the site still loaded, and only then ran it for real.",
            ),
            h2("Lessons learned"),
            p(
                "Writing a storage adapter is mostly glue, and glue code lives or dies by how it behaves when something goes wrong. The happy path was done in an hour. Making failures obvious, consistent and safe to log took the rest of the week, and it is the part I am most glad I spent time on. If you are writing your own adapter, start with the ID function, add the error flattening early and test the delete path as carefully as the upload path. Orphaned files are easy to create and annoying to find.",
            ),
        ),
    },
    {
        title: "Self-Hosting a Small App with Docker Compose",
        slug: "self-hosting-a-small-app-with-docker-compose",
        excerpt:
            "A single VPS, Docker Compose, log rotation and Dozzle: a boring setup that just keeps running.",
        tags: ["docker", "devops", "self-hosting"],
        colors: ["#082f49", "#0ea5e9"],
        daysAgo: 47,
        body: doc(
            p(
                "Not everything needs Kubernetes. Not everything needs a managed platform, an autoscaling group or a service mesh either. For a personal admin panel that one person uses a few times a week, a single container on a cheap virtual server is plenty, and the less there is to operate, the more likely it is to still be running a year from now.",
            ),
            p(
                "This post walks through the setup I use for my portfolio's admin. None of it is novel. That is the point. Every piece is a well-understood tool doing the one thing it is good at, and the whole system fits comfortably in my head.",
            ),
            h2("The server"),
            p(
                "The machine is the smallest plan my provider offers that comfortably runs a Node.js process: a couple of virtual CPUs and a few gigabytes of memory. It runs a stock Linux distribution with automatic security updates, Docker and nothing else. There is no reverse proxy running directly on the host and no hand-installed runtime. If the server disappeared tomorrow, I could recreate it in about fifteen minutes.",
            ),
            h2("Building the image"),
            p(
                "The application is built into a Docker image using a multi-stage Dockerfile. The first stage installs dependencies and builds the Next.js app; the final stage copies only the standalone output and the production dependencies into a slim base image. The result is small enough to move around without thinking about it.",
            ),
            p(
                "Rather than pushing to a registry, I build the image locally, save it as a compressed archive and copy it to the server over SSH. For a single server and a single developer, a registry is an extra account, an extra credential and an extra thing that can be down. An archive is just a file.",
            ),
            ul(
                "Build the image locally and ship it as an archive",
                "Run it with Docker Compose and a mounted SQLite volume",
                "Rotate logs so the disk never fills up",
                "Use Dozzle behind auth to tail logs from the browser",
            ),
            h2("Compose as the source of truth"),
            p(
                "Docker Compose describes everything that runs on the server: the admin container, its volume, its environment file and the log viewer. The production compose file lives in the repository, so the server's configuration is versioned alongside the code. Deploying a new version means loading the new image and running ",
                text("docker compose up -d", CODE),
                ", which replaces only the containers whose image or configuration changed.",
            ),
            p(
                "The database is a single SQLite file on a named volume. People are sometimes surprised by that choice, but for a CMS with one writer it is ideal. There is no database server to tune, backups are a file copy and local development uses exactly the same engine as production. Migrations run automatically when the container starts, so the schema is always in step with the code.",
            ),
            quote("Boring infrastructure is a feature you notice only when it is missing."),
            h2("One command to deploy"),
            p(
                "All of this is wrapped in a small shell script behind a Makefile target. The whole deploy is one ",
                text("make deploy", CODE),
                " away. The script builds the image, tags it, saves the archive, uploads it with the compose file, loads it on the server, restarts the stack and finally checks that the admin responds to a health request. If any step fails, the script stops and the previous container keeps running.",
            ),
            p(
                "Configuration for the deploy itself, such as the host and remote path, lives in an environment file that is checked in with safe defaults, with a local override file that is ignored by git. That way the repository documents every variable the deploy needs without ever containing my server's address.",
            ),
            h2("Logs that do not fill the disk"),
            p(
                "The first time a small server falls over, it is usually because the disk filled up, and the usual culprit is logs. Docker's default logging driver writes JSON files that grow forever. Setting a maximum size and a maximum number of files on each service caps the total space logs can use. It is two lines of configuration that prevent the single most common outage on small machines.",
            ),
            h2("Reading logs from a browser"),
            p(
                "SSHing into a server to run ",
                text("docker logs", CODE),
                " works, but it is not something I want to do from my phone. Dozzle is a tiny container that streams logs from other containers into a web interface. It has no database and needs only read access to the Docker socket. I run it behind its built-in authentication with a single user, so I can check what the admin is doing from anywhere.",
            ),
            p(
                "Because the application writes structured JSON logs, Dozzle renders them as searchable fields rather than walls of text. When a media upload fails or a deploy trigger is rejected, I can filter by level and see the exact error within seconds.",
            ),
            h2("Backups"),
            p(
                "The data that matters is the SQLite file and nothing else, since media lives in Cloudinary. A scheduled job copies the database using SQLite's own backup command, which is safe to run while the application is writing, and ships the copy off the server. I test restoring it every few months, because a backup you have never restored is really just a hopeful file.",
            ),
            h2("What I would add next"),
            p(
                "There are obvious improvements I have deliberately not made yet: uptime monitoring with alerts, a second region and zero-downtime deploys. Each of them is worthwhile for a product with users. For a personal admin panel, the current setup restarts in a few seconds and has needed my attention perhaps twice in a year. When it starts to need more than that, I will add more. Until then, boring wins.",
            ),
        ),
    },
];

function heroSvg(title: string, [from, to]: [string, string]) {
    const escaped = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  <circle cx="1350" cy="180" r="260" fill="#ffffff" fill-opacity="0.08"/>
  <circle cx="200" cy="820" r="340" fill="#ffffff" fill-opacity="0.06"/>
  <text x="120" y="480" font-family="sans-serif" font-size="64" font-weight="700" fill="#ffffff">${escaped}</text>
</svg>`;
}

export async function script(config: SanitizedConfig) {
    try {
        await seed(config);
    } catch (err) {
        payload.logger.error({ err }, "Seeding posts failed");
        process.exit(1);
    }
}

async function seed(config: SanitizedConfig) {
    await payload.init({ config });

    // Avoid triggering Cloudflare deploys while seeding
    const context = { skipDeploy: true };
    const startedAt = Date.now();

    payload.logger.info(
        {
            count: posts.length,
            database: process.env.DATABASE_URL,
            cloudinary: process.env.CLOUDINARY_CLOUD_NAME,
        },
        `Seeding ${posts.length} posts`,
    );

    for (const [index, post] of posts.entries()) {
        const step = `[${index + 1}/${posts.length}]`;
        payload.logger.info({ slug: post.slug }, `${step} Seeding "${post.title}"`);

        const existing = await payload.find({
            collection: "posts",
            where: { slug: { equals: post.slug } },
            depth: 0,
            limit: 1,
            context,
        });
        for (const doc of existing.docs) {
            await payload.delete({ collection: "posts", id: doc.id, context });
            payload.logger.info({ postId: doc.id }, `${step} Deleted existing post with same slug`);

            if (typeof doc.heroImage === "number") {
                const mediaId = doc.heroImage;
                try {
                    await payload.delete({ collection: "media", id: mediaId, context });
                    payload.logger.info({ mediaId }, `${step} Deleted previous hero image`);
                } catch (err) {
                    payload.logger.warn(
                        { mediaId, err },
                        `${step} Could not delete previous hero image, skipping`,
                    );
                }
            }
        }

        const png = await sharp(Buffer.from(heroSvg(post.title, post.colors)))
            .png()
            .toBuffer();
        payload.logger.info({ bytes: png.length }, `${step} Generated hero image`);

        const media = await payload.create({
            collection: "media",
            data: { alt: post.title },
            file: { data: png, mimetype: "image/png", name: `seed-${post.slug}.png`, size: png.length },
            context,
        });
        payload.logger.info({ mediaId: media.id, url: media.url }, `${step} Uploaded hero image`);

        const publishedAt = new Date(Date.now() - post.daysAgo * 24 * 60 * 60 * 1000).toISOString();

        const created = await payload.create({
            collection: "posts",
            data: {
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                heroImage: media.id,
                body: post.body as never,
                tags: post.tags,
                publishedAt,
                _status: "published",
            },
            context,
        });

        payload.logger.info(
            { postId: created.id, slug: created.slug, publishedAt, tags: post.tags },
            `${step} Created post "${post.title}"`,
        );
    }

    payload.logger.info({ durationMs: Date.now() - startedAt }, `Successfully seeded ${posts.length} posts!`);
    process.exit(0);
}
