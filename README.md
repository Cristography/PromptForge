# 🧩 Prompt Manager

A lightweight web-based tool for organizing, editing, and using AI prompts. It comes with a collapsible side navigation, search, placeholder inputs, and one-click copy with toast notifications.

* * *

Live Demo: https://cristography.github.io/PromptForge/


* * *

## 🚀 Features

* **Category-based navigation**: Group prompts into expandable categories.
* **Search bar**: Quickly filter prompts by keyword.
* **Dynamic inputs**: Prompts with `{placeholders}` generate input fields automatically.
* **One-click copy**: Replace placeholders with your values and copy the final prompt.
* **Responsive design**: Works on desktop and mobile with a collapsible sidebar.
* **Toast notifications**: Get quick feedback when copying prompts.

* * *

## 📂 Project Structure

    prompt-manager/
    │── index.html # Main HTML file
    │── style.css # All styles (sidebar, layout, responsive tweaks)
    │── script.js # Handles navigation, search, inputs, copy, and toasts
    │── prompts.json # Prompt data (categories + prompts)
    │── README.md # Documentation

* * *

## 🛠️ How to Use

1. **Clone or download** this repository.
2. Make sure you have the following files in the same folder:
  * `index.html`
  * `style.css`
  * `script.js`
  * `prompts.json`
3. Open `index.html` in any modern browser (Chrome, Edge, Firefox). No server required.

* * *

## 📋 Prompt Format

`prompts.json` looks like this:

    [
      {
        "category": "Image Generation",
        "prompts": [
          {
            "title": "Creative Portrait",
            "template": "Generate a portrait of {character} in {style} style."
          },
          {
            "title": "Fantasy Landscape",
            "template": "Create a fantasy landscape with {elements} under {lighting}."
          }
        ]
      }
    ]

👉 Anything in `{braces}` becomes an input field in the main panel.

* * *

## 🎮 Controls

Click ▶ Category → expand to see prompts.

Click a prompt → placeholder inputs appear in the main area.

Fill in inputs → click Copy → final prompt goes to clipboard.

Search bar → filters prompts instantly.

On mobile, sidebar can be toggled and will auto-close when clicking outside.

* * *

## ⚡ Future Improvements

Save favorite prompts locally (localStorage).

Export/import prompt collections.

Dark mode toggle.

Drag-and-drop prompt reordering.

* * *

## 📜 License

MIT License — free to use, modify, and share.
