console.log("Wiki Philosophy extension loaded");

// Target Wikipedia page for computing the 'Philosophy Number'
const TARGET = "Philosophy";

// Maximum number of hops to avoid infinite loops
const MAX_STEPS = 30;

/**
 * Extracts the first valid internal Wikipedia link from a given document.
 * @param {Document} doc - The DOM of the Wikipedia page to search.
 * @returns {string|null} - The href of the first valid internal link, or null if none found.
 */
function getFirstValidLink(doc) {
  const content = doc.querySelector("#mw-content-text"); // main article body
  if (!content) return null;

  const paragraphs = content.querySelectorAll("p"); // all paragraph elements

  for (const p of paragraphs) {
    const links = p.querySelectorAll("a[href^='/wiki/']"); // only internal wiki links

    for (const link of links) {
      const href = link.getAttribute("href");

      // Skip special pages like Help:, File:, Category:, etc.
      if (href.includes(":")) continue;

      return href; // Return the first valid internal link
    }
  }

  return null; // No valid link found
}

/**
 * Fetches a Wikipedia page by href and parses it into a DOM document.
 * @param {string} href - Relative URL of the Wikipedia page (e.g., '/wiki/Philosophy')
 * @returns {Document} - Parsed DOM of the fetched page
 */
async function fetchNextPage(href) {
  const url = `https://en.wikipedia.org${href}`;
  const res = await fetch(url);
  const text = await res.text();

  const parser = new DOMParser();
  return parser.parseFromString(text, "text/html"); // Convert HTML string to Document
}

/**
 * Computes the 'Philosophy Number' of the current Wikipedia page.
 * Follows the first valid link repeatedly until reaching TARGET or MAX_STEPS.
 * @returns {Object} - { steps: number of hops, path: array of page titles }
 */
async function computePhilosophyNumber() {
  let doc = document; // Start with current page
  let steps = 0;      // Number of hops so far
  const path = [];    // Track the sequence of page titles

  while (steps < MAX_STEPS) {
    const title = doc.getElementById("firstHeading")?.innerText;
    path.push(title);

    // Stop if target page reached
    if (title === TARGET) {
      return { steps, path };
    }

    const nextHref = getFirstValidLink(doc);
    if (!nextHref) break; // Stop if no further links

    // Fetch and parse the next page
    doc = await fetchNextPage(nextHref);
    steps++;
  }

  return { steps: null, path }; // Return null steps if target not reached
}

// Quick test: compute number for current page and log result
computePhilosophyNumber().then(result => {
  console.log("RESULT:", result);
});

/**
 * Listen for messages from the popup script.
 * Allows popup to request computation on the active tab.
 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "compute") {
    computePhilosophyNumber().then(result => {
      sendResponse(result); // Send result back to popup
    });
    return true; // Keeps the message channel open for async response
  }
});