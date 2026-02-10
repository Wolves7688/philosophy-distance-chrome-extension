const output = document.getElementById("output");

// Function to compute the Philosophy Number for the current tab
async function run() {
  // Query the active tab in the current window
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  // Send a message to the content script to start computation
  chrome.tabs.sendMessage(tab.id, { action: "compute" }, result => {
    // Handle case where content script is not injected (likely not a Wikipedia page)
    if (chrome.runtime.lastError) {
      output.className = "error";
      output.textContent = "Not a Wikipedia article.";
      return;
    }

    // Handle case where computation did not reach Philosophy or failed
    if (!result || result.steps === null) {
      output.className = "error";
      output.textContent = "Could not reach Philosophy.";
      return;
    }

    // Display the number of steps to reach Philosophy
    output.className = "number";
    output.textContent = result.steps;
  });
}

// Automatically run the computation whenever the popup is opened
document.addEventListener('DOMContentLoaded', run);