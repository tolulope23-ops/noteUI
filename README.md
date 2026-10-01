# Note App — User Interface

A simple note-taking web application that provides a user interface for creating, viewing, editing, and deleting notes through a RESTful backend API.

The frontend communicates with the **Note API** using JavaScript's `fetch()` API and provides a lightweight interface for managing notes.

## Features

* View all saved notes
* Create new notes
* Read individual notes
* Edit existing notes
* Delete notes
* Display note creation and update timestamps
* Real-time save button visibility based on user input
* REST API integration
* Responsive interface
* Font Awesome icons for UI actions

## Tech Stack

| Technology   | Purpose                               |
| ------------ | ------------------------------------- |
| HTML5        | Application structure                 |
| CSS3         | Styling and responsive layout         |
| JavaScript   | Application logic and API integration |
| Fetch API    | Communication with the backend        |
| Font Awesome | Interface icons                       |


## API Integration

The frontend uses the following API base URL during local development:

```javascript
const API_URL = "http://localhost:3000/api/v1/notes";
```

## How It Works

### Viewing Notes

When the application loads, it sends a `GET` request to the API:

```javascript
const response = await fetch(API_URL);
```
The returned notes are then rendered dynamically in the sidebar.

## Getting Started

### Prerequisites

You need:

* A modern web browser
* The Note API running locally or deployed
* A local development server such as VS Code Live Server

### 1. Clone the Repository

```bash
git clone https://github.com/tolulope23-ops/noteUI.git
```

Move into the project:

```bash
cd Note-UI
```

### 2. Configure the API

Open `script.js` and configure the API URL:

```javascript
const API_URL = "http://localhost:3000/api/v1/notes";
```

If the backend is deployed, replace the local URL with the deployed API URL.

### 3. Start the Frontend

Because the application uses browser-based JavaScript and communicates with an API, it is recommended to serve the project through a local development server.

For example, with VS Code Live Server:

1. Open the project in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The application will open in your browser.

## Backend Requirement

The frontend requires the Note API to be running.

The expected local backend URL is:

```text
http://localhost:3000
```

Make sure the backend is running before using the application.

The backend repository contains the API implementation and MongoDB integration.

## User Interface

The application provides:

* A notes sidebar containing existing notes
* A note editor for viewing and modifying content
* A save action for creating and updating notes
* A delete action for removing notes
* Timestamp information for notes

## Author

**Rachael Adeyemi**

Backend Developer focused on building reliable and maintainable APIs and software systems.

## License

This project is available for educational and portfolio purposes.
