const { visit } = require("unist-util-visit");

function convertGitHubBlobToRawUrl(url) {
  if (
    url.startsWith("https") &&
    url.includes("github.com") &&
    url.includes("/blob/")
  ) {
    return url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/"); // Ersetzt das '/blob/' Segment
  }
  if (!url.startsWith("https") && url.startsWith("/")) {
    const newurl = `https://raw.githubusercontent.com${url}`.replace(
      "/blob/",
      "/",
    ); // Ersetzt das '/blob/' Segment
    return newurl;
  }
  return url;
}

/**
 * Ein Remark-Plugin, das spezielle Blöcke findet und Code von GitHub abruft.
 */
function remarkEmbedPlugin() {
  // @ts-ignore
  const unified = this;

  return async (tree) => {
    const nodesToFetch = [];
    visit(tree, ["leafDirective"], (node, _index, parent) => {
      if (node.name === "embed") {
        const url = node.attributes.url;
        const lang = node.attributes.lang || "markdown";
        const title = node.children[0]?.value || undefined;

        if (url) {
          nodesToFetch.push({ node, url, lang, title });
        }
      }
    });

    // 2. Führe alle Fetch-Operationen parallel aus und warte darauf
    await Promise.all(
      nodesToFetch.map(async ({ node, url, lang, title }) => {
        try {
          const rawUrl = convertGitHubBlobToRawUrl(url);
          const response = await fetch(rawUrl);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch code from ${rawUrl}: ${response.statusText}`,
            );
          }
          const codeContent = await response.text();

          if (lang === "markdown") {
            const embeddedTree = unified.parse(codeContent);
            Object.assign(node, {
              type: "root",
              children: embeddedTree.children,
              name: undefined,
              attributes: undefined,
            });
          } else {
            const urlArray = rawUrl.split("/main");
            const filename = urlArray[urlArray.length - 1];

            Object.assign(node, {
              type: "code",
              lang: lang,
              value: codeContent,
              children: undefined, // Code-Blöcke haben keine Kinder
              name: undefined,
              meta: `title="${title ? title : filename}"`,
            });
          }
        } catch (error) {
          console.error(
            `Error fetching GitHub code for URL ${url}:`,
            error.message,
          );
          // Ersetze durch einen Fehler-Kommentar im HTML
          Object.assign(node, {
            type: "html",
            value: `<!-- FAILED TO LOAD CODE FROM ${url} -->`,
            children: undefined,
            name: undefined,
            attributes: undefined,
          });
        }
      }),
    );
  };
}

module.exports = remarkEmbedPlugin;
