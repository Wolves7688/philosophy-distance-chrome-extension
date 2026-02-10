# Philosophy Number Chrome Extension

## Description

The Philosophy Number Chrome extension calculates the "philosophy distance" for any Wikipedia article you visit. The philosophy distance is the number of clicks it takes to reach the Wikipedia article on "Philosophy" by following the first link in the main text of each article.

## How It Works

- When you visit a Wikipedia article, the extension analyzes the main content.
- It finds the first valid link in the article's main text.
- It follows that link recursively, counting the number of clicks until it reaches the "Philosophy" page.
- The extension then displays the philosophy distance in the browser toolbar.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (toggle switch in the top right).
4. Click "Load unpacked" and select the extension's directory.
5. The extension will appear in your toolbar.

## Usage

- Navigate to any Wikipedia article.
- Click the extension icon in the toolbar.
- The philosophy distance will be displayed.

## License

This project is licensed under the MIT License.

---

## Screenshot

![Philosophy Number Extension Screenshot](images/screenshot.png)