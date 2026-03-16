# SpecSync Frontend

Production-ready React frontend for SpecSync - Software Requirement Drift Detection System.

## Tech Stack

- **React 18.2** - UI library
- **Vite** - Fast build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - React charting library
- **Lucide React** - Icon library
- **Context API** - State management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Header, Footer, Alerts, Forms)
│   └── dashboard/      # Dashboard-specific components
├── pages/              # Page components with full features
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProjectsPage.jsx
│   ├── RequirementsPage.jsx
│   ├── FeaturesPage.jsx
│   ├── TestCasesPage.jsx
│   ├── DriftReportPage.jsx
│   └── AnalyticsPage.jsx
├── context/            # React Context for state management
│   ├── AuthContext.jsx
│   └── AppContext.jsx
├── services/           # API service layer with Axios
│   ├── api.js          # Axios instance with interceptors
│   ├── authService.js
│   ├── projectService.js
│   ├── requirementService.js
│   ├── featureService.js
│   ├── testCaseService.js
│   ├── driftService.js
│   └── analyticsService.js
├── utils/              # Utility functions
│   ├── tokenUtils.js   # JWT token management
│   └── formatters.js   # Data formatting functions
├── App.jsx             # Main app with routing
├── main.jsx           # Entry point
└── index.css          # Global styles with Tailwind
```

## Features

### 1. Authentication
- ✅ User signup with role selection
- ✅ JWT-based login
- ✅ Token storage in localStorage
- ✅ Protected routes with automatic redirect
- ✅ Persistent authentication state

### 2. Dashboard
- ✅ Key performance metrics (4 stat cards)
- ✅ Drift risk meter with progress bar
- ✅ Quick action buttons
- ✅ Recent activity feed
- ✅ Drift summary
- ✅ Quick project access

### 3. Project Management
- ✅ Create new projects
- ✅ View all projects with pagination
- ✅ Project status tracking
- ✅ Edit/delete projects
- ✅ Project filtering

### 4. Requirement Management
- ✅ Create requirements with acceptance criteria
- ✅ Version history tracking
- ✅ Priority levels (Low, Medium, High, Critical)
- ✅ Version comparison
- ✅ Full CRUD operations

### 5. Feature Management
- ✅ Create features linked to requirements
- ✅ Orphan feature detection
- ✅ Status tracking (Planning → Released)
- ✅ Version implementation tracking
- ✅ Feature status dashboard

### 6. Test Case Management
- ✅ Create test cases with steps
- ✅ Link to features and requirements
- ✅ Test execution status tracking
- ✅ Priority and status management
- ✅ Test result recording

### 7. Drift Report
- ✅ 5 drift detection algorithms visualization:
  - Version Mismatch
  - Orphan Features
  - Implementation Gap
  - Testing Gap
  - Critical Risk
- ✅ Color-coded severity levels
- ✅ Drift score calculation
- ✅ Risk level assessment
- ✅ Detailed recommendations

### 8. Analytics Dashboard
- ✅ Volatility trend chart (Line chart)
- ✅ Status distribution (Pie chart)
- ✅ Priority distribution (Bar chart)
- ✅ Test coverage percentage
- ✅ Completion ratio
- ✅ Most modified requirements

## Installation

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Development

### Available Scripts

**Development Server:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
```

**Preview Build:**
```bash
npm run preview
```

## Component Architecture

### Common Components

**Layout:**
- `Header` - Navigation and user menu
- `Footer` - Footer section
- `ProtectedRoute` - Route protection
- `Layout` - Base layout wrapper

**Alerts:**
- `Spinner` - Loading indicator
- `ErrorMessage` - Error display
- `SuccessMessage` - Success notification
- `WarningMessage` - Warning notification

**Forms:**
- `FormGroup` - Form field wrapper
- `TextInput` - Text input field
- `TextArea` - Multi-line text input
- `Select` - Dropdown select
- `CheckboxGroup` - Checkbox group

**UI Elements:**
- `Modal` - Dialog modal
- `Breadcrumb` - Navigation breadcrumb
- `Pagination` - Data pagination
- `Badge` - Status badge

### Dashboard Components

- `StatCard` - Key metric display
- `RiskMeter` - Drift risk visualization
- `MetricBox` - Small metric display
- `QuickActions` - Action buttons grid
- `RecentActivity` - Activity timeline
- `DriftSummary` - Drift issue summary

## API Integration

### Service Layer Pattern

All API calls use a centralized service layer with Axios:

```javascript
// Example: Get all projects
const { projects, totalPages } = await projectService.getAllProjects(page, limit);

// Example: Create project
await projectService.createProject({ projectName, description, status });
```

### Authentication Interceptors

Axios automatically:
- Adds JWT token to all requests
- Handles 401 responses with logout
- Manages error responses

### Token Management

```javascript
// Token utilities
import { getToken, setToken, removeToken } from './utils/tokenUtils';

// Auto-saved to localStorage on login
// Auto-cleared on logout
```

## State Management

### AuthContext
- Global authentication state
- User data
- Login/signup/logout functions
- Loading and error states

### AppContext
- Selected project
- Selected requirement
- Selected feature
- Refresh triggers for data syncing

## Styling

### Tailwind CSS
- Custom color theme (primary: #0066cc, secondary: #00cc99)
- Responsive design (mobile-first)
- Dark mode ready
- Pre-defined utility classes

### Custom Classes

```css
.btn              /* Button base */
.btn-primary      /* Primary button */
.btn-secondary    /* Secondary button */
.btn-danger       /* Danger button */
.card             /* Card container */
.input            /* Input field */
.badge            /* Badge element */
.spinner          /* Loading spinner */
```

## Responsive Design

- Mobile: 1 column layouts
- Tablet: 2 column layouts
- Desktop: 3-4 column layouts
- All components are mobile-responsive

## Error Handling

- API errors display user-friendly messages
- Form validation with error messages
- Automatic redirect on 401 (unauthorized)
- Loading states during API calls
- Error dismissal buttons

## Performance

- Code splitting with React Router
- Lazy loading (if needed)
- Axios caching interceptors
- Optimized renders with hooks
- Minimal re-renders with Context API

## Security

- JWT tokens in localStorage
- HTTPS ready
- CORS configured
- XSS protection via React
- SQL injection prevention (backend)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Build for Production
```bash
npm run build
```

Outputs static files to `dist/` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

## Troubleshooting

### Port 3000 already in use
```bash
# Use different port
npm run dev -- --port 3001
```

### API connection errors
- Verify backend is running on `http://localhost:5000`
- Check `.env.local` API_URL configuration
- Check CORS settings in backend

### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit PR with description

## License

MIT License - See LICENSE file

---

**SpecSync Frontend v1.0.0** | Built with React + Vite + Tailwind CSS
