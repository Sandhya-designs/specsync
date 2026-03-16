# Frontend Setup Guide

## Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
cd c:\MERN\frontend
npm install
```

### Step 2: Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend URL:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

### Step 4: Login
Use demo credentials from the backend signup or create new account:
- **Email:** admin@specsync.com
- **Password:** Demo123!

---

## Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── Alerts.jsx    # Error/Success/Warning messages
│   │   │   ├── Header.jsx    # Navigation header
│   │   │   ├── Footer.jsx    # Footer section
│   │   │   ├── FormElements.jsx # Form components
│   │   │   ├── UIElements.jsx   # UI utilities
│   │   │   └── ProtectedRoute.jsx
│   │   └── dashboard/
│   │       └── DashboardComponents.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx     # Authentication
│   │   ├── SignupPage.jsx
│   │   ├── DashboardPage.jsx # Main dashboard
│   │   ├── ProjectsPage.jsx  # Project management
│   │   ├── RequirementsPage.jsx
│   │   ├── FeaturesPage.jsx
│   │   ├── TestCasesPage.jsx
│   │   ├── DriftReportPage.jsx
│   │   └── AnalyticsPage.jsx
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication state
│   │   └── AppContext.jsx     # Application state
│   ├── services/
│   │   ├── api.js             # Axios configuration
│   │   ├── authService.js
│   │   ├── projectService.js
│   │   ├── requirementService.js
│   │   ├── featureService.js
│   │   ├── testCaseService.js
│   │   ├── driftService.js
│   │   └── analyticsService.js
│   ├── utils/
│   │   ├── tokenUtils.js      # JWT management
│   │   └── formatters.js      # Data formatters
│   ├── App.jsx                # Main router
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## Development Workflow

### 1. Create New Page Component
```javascript
// src/pages/NewPage.jsx
import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';

export const NewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
};
```

### 2. Add Route in App.jsx
```javascript
<Route
  path="/newpage"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

### 3. Create Service Layer
```javascript
// src/services/newService.js
import api from './api';

export const newService = {
  getAll: async () => {
    return api.get('/endpoint');
  },
  create: async (data) => {
    return api.post('/endpoint', data);
  },
};
```

### 4. Use in Component
```javascript
import { newService } from '../services/newService';

const [data, setData] = useState([]);

useEffect(() => {
  const fetch = async () => {
    const result = await newService.getAll();
    setData(result);
  };
  fetch();
}, []);
```

---

## Styling Guide

### Tailwind CSS Classes

**Spacing:**
```html
<div className="p-4 m-2 gap-6">Content</div>
```

**Colors:**
```html
<div className="text-primary bg-blue-100">Primary color</div>
<div className="text-secondary">Secondary color</div>
```

**Cards:**
```html
<div className="card">Content in card</div>
```

**Buttons:**
```html
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-danger">Danger Button</button>
```

**Responsive Grid:**
```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

---

## API Integration

### Making API Calls

**Example 1: Fetch Projects**
```javascript
import { projectService } from '../services/projectService';

const result = await projectService.getAllProjects(1, 10);
// Returns: { projects: [...], totalPages: 5 }
```

**Example 2: Create Project**
```javascript
await projectService.createProject({
  projectName: 'My Project',
  description: 'Project description',
  status: 'Active'
});
```

**Example 3: Error Handling**
```javascript
try {
  const result = await projectService.getProjectById(projectId);
} catch (error) {
  console.error('Failed:', error.message);
}
```

### Service Methods Available

**Projects:**
- `createProject(data)`
- `getAllProjects(page, limit)`
- `getProjectById(id)`
- `updateProject(id, data)`
- `deleteProject(id)`

**Requirements:**
- `createRequirement(data)`
- `getAllRequirements(projectId, page, limit)`
- `getRequirementById(id)`
- `updateRequirement(id, data)`
- `getVersionHistory(id)`
- `deleteRequirement(id)`

**Features:**
- `createFeature(data)`
- `getAllFeatures(projectId, page, limit)`
- `getFeatureById(id)`
- `updateFeature(id, data)`
- `deleteFeature(id)`

**Test Cases:**
- `createTestCase(data)`
- `getAllTestCases(projectId, featureId, page, limit)`
- `getTestCaseById(id)`
- `updateTestCase(id, data)`
- `deleteTestCase(id)`

**Drift:**
- `getAllDrift(projectId)`
- `getDriftByType(projectId, type)`

**Analytics:**
- `getAnalytics(projectId)`

**Auth:**
- `signup(userData)`
- `login(credentials)`
- `getCurrentUser()`

---

## Authentication Flow

### 1. Signup
```javascript
const { user, token } = await authService.signup({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'Developer'
});
// Token and user automatically stored in localStorage
```

### 2. Login
```javascript
const { user, token } = await authService.login({
  email: 'john@example.com',
  password: 'password123'
});
// Token and user automatically stored in localStorage
```

### 3. Using Auth Context
```javascript
import { useAuth } from '../context/AuthContext';

const { user, isAuthenticated, logout } = useAuth();

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
```

### 4. Token Management
```javascript
import { getToken, removeToken } from '../utils/tokenUtils';

const token = getToken(); // Get current token
removeToken(); // Clear token
```

---

## Component Examples

### Form Component
```javascript
<FormGroup label="Email Address" error={emailError}>
  <TextInput
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="user@example.com"
  />
</FormGroup>
```

### Modal Dialog
```javascript
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Create Project"
>
  <form onSubmit={handleCreate}>
    {/* Form content */}
  </form>
</Modal>
```

### Stat Card
```javascript
<StatCard
  title="Total Projects"
  value={42}
  icon={BarChart3}
  trend={5}
  trendLabel="from last month"
/>
```

---

## Testing the Frontend

### Test Endpoints
1. **Dashboard** - View all metrics
2. **Projects** - Create/view/edit projects
3. **Requirements** - Manage requirements with versions
4. **Features** - Track feature implementation
5. **Test Cases** - Create and manage test cases
6. **Drift Report** - View drift detection results
7. **Analytics** - Visualize project metrics

### Test Data Flow
1. Create project
2. Add requirements
3. Create features
4. Link features to requirements
5. Add test cases
6. Check drift report
7. View analytics

---

## Performance Tips

1. **Lazy Loading Images:** Use React lazy loading
2. **Code Splitting:** Routes are automatically split
3. **Memoization:** Use React.memo for expensive components
4. **API Caching:** Consider caching in services
5. **Bundle Size:** Monitor with `npm run build`

---

## Troubleshooting

### Issue: Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### Issue: API connection errors
- Verify backend is running (`npm run dev` in backend folder)
- Check backend runs on `http://localhost:5000`
- Verify `.env.local` has correct API URL

### Issue: Authentication not persisting
- Check browser localStorage is enabled
- Verify token is being saved: `localStorage.getItem('token')`

### Issue: Module not found errors
```bash
npm install
npm run dev
```

### Issue: Tailwind CSS not working
- Check `tailwind.config.js` content paths
- Restart dev server
- Clear browser cache

---

## Production Deployment

### Build for Production
```bash
npm run build
```

Creates optimized `dist/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build: `npm run build`
2. Create account on netlify.com
3. Drag and drop `dist/` folder

### Environment Variables for Production
Create `.env.production.local`:
```
VITE_API_URL=https://api.specsync.com/api
```

---

## Browser DevTools

### Network Tab
- Monitor API requests
- Check response times
- Verify status codes

### Console
- Check for errors
- Use `console.log` for debugging
- Monitor performance

### React DevTools
- Inspect component tree
- Check props and state
- Profile performance

---

## Useful Commands

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clear cache and reinstall
rm -rf node_modules package-lock.json && npm install

# Check for security vulnerabilities
npm audit
npm audit fix
```

---

**Frontend Setup Complete!** 🚀

Next: Start backend with `npm run dev` in the backend folder, then access `http://localhost:3000` in your browser.
