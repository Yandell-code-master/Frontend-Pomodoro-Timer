# AGENTS.md - Pomodoro Timer Frontend

## Project Overview

This is a vanilla JavaScript frontend for a Pomodoro Timer application. The project uses no build system, no package manager, and no TypeScript. It relies on ES6+ JavaScript, Bootstrap, and standard web technologies.

**Tech Stack:** HTML5, CSS3, Bootstrap 5, Vanilla JavaScript (ES6+)

**Backend:** Connects to a Railway-deployed backend service. Local development uses `localhost:8080` (backend) and `localhost:8000` (frontend).

---

## Build/Lint/Test Commands

This project has **no build system**. Files are served directly by any static file server.

### Running Locally

**Option 1: VS Code Live Server**
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**Option 2: Python HTTP Server**
```bash
python -m http.server 8000
```

**Option 3: Node.js http-server**
```bash
npx http-server . -p 8000
```

**Backend Requirement:** The backend must be running at `localhost:8080` for full functionality.

### Testing

There are **no automated tests** in this project. Manual testing is required:
1. Open `index.html` in a browser
2. Test timer start/pause/skip functionality
3. Test user authentication flows
4. Test API integration (requires backend)

### Code Quality

There is **no linter or formatter** configured. Manual code review is required.

---

## Code Style Guidelines

### JavaScript Conventions

**Indentation:** 4 spaces (no tabs)

**Variable Naming:** camelCase
```javascript
// Correct
let userName = "John";
const apiEndpoint = "/users/login";
let isAuthenticated = false;

// Avoid
let user_name = "John";
let UserName = "John";
```

**Constant Naming:** UPPER_SNAKE_CASE for true constants
```javascript
const MAX_RETRY_COUNT = 3;
const API_TIMEOUT_MS = 5000;
```

**Function Naming:** camelCase, descriptive verbs
```javascript
function getUserData() { }
function handleLoginResponse() { }
function renderGoogleButton() { }
```

**Boolean Variables:** Use `is`, `has`, `can`, or descriptive prefixes
```javascript
let isAuthenticated = true;
let hasPermission = false;
let canEdit = true;
```

### CSS Conventions

**Class Naming:** kebab-case, semantic and descriptive
```css
/* Correct */
.btn-iniciar { }
.contenedor-reloj { }
.task-display { }
.nav-configuration { }

/* Avoid */
.btnIniciar { }
.contenedorReloj { }
```

**BEM-like Pattern:** For complex components
```css
.task-display { }
.task-display__content { }
.task-display--highlighted { }
```

### HTML Conventions

**Attributes:** Double quotes for attributes
```html
<!-- Correct -->
<button id="btn-iniciar" class="btn btn-primary">Start</button>

<!-- Avoid -->
<button id='btn-iniciar' class="btn btn-primary">Start</button>
```

**IDs:** kebab-case
```html
<div id="create-task-container" class="task-create-container">
```

### JavaScript Patterns

**DOM Ready:** Use `DOMContentLoaded` event
```javascript
document.addEventListener("DOMContentLoaded", function() {
    // DOM is ready
});
```

**Async/Await:** Prefer over raw Promises
```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(API_URL + "users/" + userId);
        if (!response.ok) {
            throw new Error("SERVER_ERROR: " + response.status);
        }
        return await response.json();
    } catch (error) {
        handleError(error);
        throw error;
    }
}
```

**Error Handling Pattern:**
```javascript
try {
    // API call or operation
} catch (error) {
    if (error.message.startsWith("SERVER_ERROR")) {
        alert("Something went wrong with the server");
    } else {
        console.error("Unexpected error:", error);
        throw error; // Re-throw for unexpected errors
    }
}
```

**Fetch API Usage:**
```javascript
const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

if (!response.ok) {
    throw new Error("SERVER_ERROR: " + response.status);
}
```

### API Patterns

**Environment Configuration:** Use `window.ENV` object (defined in `js/env.js`)
```javascript
const API_URL = ENV.API_URL + "endpoint";
window.location.href = ENV.URL_FRONTEND + "page.html";
```

**Local Storage Keys:** kebab-case, clear naming
```javascript
localStorage.setItem("is-logged-in", "true");
localStorage.getItem("user-data");
```

**DTO Naming:** Use `DTO` suffix for data transfer objects
```javascript
const logInDTO = {
    email: emailInput.value,
    password: passwordInput.value
};
```

### Code Organization

**File Structure:**
```
/js                    # All JavaScript files (flat, no subdirectories)
/css                   # All CSS files
/resources             # Static assets (images, audio)
/index.html            # Main entry point
```

**JavaScript Files:** One concern per file
- `log-in.js` - Login functionality
- `add-task.js` - Task creation
- `iniciar-cronometro.js` - Timer controls
- `env.js` - Environment configuration

**No ES6 Modules:** All code uses global scope (traditional script loading)

### Security Considerations

- Never commit API keys or secrets
- Use environment variables for URLs (not keys)
- Validate user input before API calls
- Sanitize data from localStorage before use

### Common Patterns in This Codebase

**Google Identity Integration:**
```javascript
function renderGoogleButton() {
    const container = document.getElementById('google-button-container');
    google.accounts.id.renderButton(container, options);
}

window.onload = () => {
    setTimeout(renderGoogleButton, 10);
};
```

**JWT Decoding:**
```javascript
function decodeJWT(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
        atob(base64).split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join("")
    );
    return JSON.parse(jsonPayload);
}
```

---

## Working with This Codebase

### Adding New Features

1. Create a new JS file in `/js` (e.g., `new-feature.js`)
2. Add `<script src="js/new-feature.js"></script>` to the HTML file
3. Use the existing patterns and conventions

### Backend API Integration

API base URLs are configured in `js/env.js`:
- **Local:** `http://localhost:8080/`
- **Production:** `https://backend-pomodoro-timer-production.up.railway.app/`

### Responsive Design

This project uses:
- Bootstrap's responsive utilities
- CSS `clamp()` for fluid typography
- CSS custom properties for spacing
- Media queries at 500px, 423px, 505px, 277px, 229px breakpoints

### Audio Assets

Timer sound effects are in `/resources`:
```javascript
const buttonSound = new Audio('resources/ui-click-43196.mp3');
buttonSound.play();
```

---

## Version Information

- No package.json (no npm dependencies)
- No build tools (Vite, Webpack, etc.)
- No test framework
- No linter/formatter
- No TypeScript

This is a pure static frontend project suitable for GitHub Pages deployment.
