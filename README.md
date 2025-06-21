# Incharge Website Chat Assistant Frontend

This is the public-facing frontend for the **Incharge AI Assistant** widget. It is designed to be embedded on external websites (like WordPress) and connects to the private backend hosted at `https://ai-assistant-platform-senp.onrender.com`.

## 🔍 Features

- Chat widget that can be embedded on any website via a script
- Conversational UI styled for modern websites
- Sends messages to `/api/incharge/ask` endpoint
- Connects to a secure backend via Render

## 🚀 Deployment

This frontend is deployed separately from the private backend. It is intended to be hosted under your public domain (e.g., `https://incharge-ai.com`).

## 🧩 Embedding the Widget

To embed the chat assistant on a website, add the following script tag:

```html
<script src="https://incharge-ai.com/widget.js" defer></script>
```
