# Library Management System

A full-stack web application for managing library operations including books, movies, members, issues, returns, and fines with comprehensive reporting and analytics.

## 🎯 Quick Start Guide

### For First-Time Users

1. **Start the Backend:**
   ```bash
   cd backend
   npm start
   ```
   Wait for "MongoDB Connected" message.

2. **Start the Frontend:**
   Open a new terminal:
   ```bash
   cd frontend
   npm run dev
   ```
   Open http://localhost:5173 in your browser.

3. **Login:**
   - Admin: `adm` / `adm`
   - User: `user` / `user`

4. **Try These First:**
   - View Dashboard statistics
   - Search for books
   - View active book issues
   - Check reports and charts

## 📚 Tech Stack

### Why We Chose This Stack

**Our goal:** Build a modern, scalable, and user-friendly library management system with professional design and smooth user experience.

### Backend
- **Node.js** with **Express.js** (v4.18.2)
  - *Why:* Industry-standard, lightweight, and excellent for building RESTful APIs quickly
  - *Benefit:* Fast development with rich middleware ecosystem
  
- **MongoDB Atlas** (Cloud Database)
  - *Why:* NoSQL flexibility perfect for library data (books, members, issues)
  - *Benefit:* Cloud-hosted, automatic backups, scalable, no local setup needed
  
- **JWT** for authentication
  - *Why:* Stateless authentication ideal for modern web apps
  - *Benefit:* Secure, efficient, works seamlessly with React frontend
  
- **Mongoose** for database modeling
  - *Why:* Elegant MongoDB object modeling with built-in validation
  - *Benefit:* Clean code, schema validation, easy relationship management
  
- **bcryptjs** for password hashing
  - *Why:* Industry-standard password encryption
  - *Benefit:* Secure user credentials, prevents plain-text password storage

### Frontend
- **React** (v19.2.0) with **Vite** (v7.2.6)
  - *Why:* Latest React with lightning-fast Vite build tool
  - *Benefit:* Instant hot-reload during development, component-based architecture, future-proof
  
- **React Router DOM** for navigation
  - *Why:* Standard routing solution for React SPAs
  - *Benefit:* Smooth page transitions without full-page reloads, clean URLs
  
- **Axios** for API calls
  - *Why:* Promise-based HTTP client with interceptors
  - *Benefit:* Easy error handling, request/response transformation, cleaner than fetch
  
- **Recharts** for data visualization
  - *Why:* React-native charts library, composable and declarative
  - *Benefit:* Beautiful charts (pie, bar, line) for analytics dashboard
  
- **Tailwind CSS** for styling
  - *Why:* Utility-first CSS framework, highly customizable
  - *Benefit:* Rapid UI development, consistent design, small bundle size, no CSS conflicts

### Design Philosophy

**Professional & Modern:**
- Clean white backgrounds with subtle shadows
- Indigo/purple gradient accents for premium feel
- Smooth animations (fade-in, slide, scale effects)
- Responsive design (mobile, tablet, desktop)

**User Experience:**
- Staggered entrance animations for visual flow
- Hover effects with scale and shadow transitions
- Gradient text for headings
- Icon animations on hover (rotate, scale)
- Focus states on inputs (scale effect)

**Performance:**
- CSS transforms (GPU-accelerated)
- Optimized animation durations (200-300ms)
- Lazy loading ready
- Efficient component re-renders

## 🔧 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)
- **MongoDB Atlas Account** (already configured)

## 📁 Project Structure

```
library-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── memberController.js
│   │   ├── issueController.js
│   │   ├── fineController.js
│   │   ├── reportController.js
│   │   ├── userController.js
│   │   └── issueRequestController.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/                   # Database schemas
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Member.js
│   │   ├── Issue.js
│   │   ├── Fine.js
│   │   └── IssueRequest.js
│   ├── routes/                   # API endpoints
│   ├── server.js                # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   └── layout/
│   │   │       ├── Sidebar.jsx
│   │   │       └── Navbar.jsx
│   │   ├── context/             # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddBook.jsx
│   │   │   ├── ManageBooks.jsx
│   │   │   ├── BookSearch.jsx
│   │   │   ├── ManageMembers.jsx
│   │   │   ├── IssueBook.jsx
│   │   │   ├── FinePayment.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── IssueRequests.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   └── Login.jsx
│   │   ├── services/            # API service functions
│   │   │   ├── authService.js
│   │   │   ├── bookService.js
│   │   │   ├── memberService.js
│   │   │   ├── issueService.js
│   │   │   ├── fineService.js
│   │   │   ├── reportService.js
│   │   │   ├── userService.js
│   │   │   └── issueRequestService.js
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Installation & Setup

### Step 1: Navigate to Project Directory

```bash
cd "d:/Acxiom Consulting/library-management-system"
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

**Installed Packages:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**Installed Packages:**
- react, react-dom
- react-router-dom
- axios
- recharts
- tailwindcss
- autoprefixer, postcss

### Step 4: Database Configuration

The backend is connected to **MongoDB Atlas**:

```
mongodb+srv://ranapsp317_db_user:QI6rqDezVfNPi5iQ@cluster0.on54qcp.mongodb.net/
```

**⚠️ Security Note:** For production, move credentials to `.env` file.

## ▶️ Running the Application

### Start Backend Server

Open terminal and run:

```bash
cd backend
npm start
```

**Expected Output:**
```
Server is running on port 5000
MongoDB Connected
```

- Backend URL: **http://localhost:5000**
- API Base: **http://localhost:5000/api**

### Start Frontend Development Server

Open a **NEW terminal** window and run:

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v7.2.6  ready in XXX ms

➜  Local:   http://localhost:5173/
```

- Frontend URL: **http://localhost:5173**

## 🔐 Default Login Credentials

### Admin Account
- **Username:** `adm`
- **Password:** `adm`
- **Access:** Full administrative privileges

### Regular User Account
- **Username:** `user`
- **Password:** `user`
- **Access:** Limited to viewing and requesting

## 📊 Pre-Seeded Data

The database includes:
- **50 Books** (Fiction, Non-Fiction, Reference, Biography)
- **25 Movies** (Action, Drama, Comedy, Thriller, Sci-Fi)
- **10 Members** with varying membership durations
- **2 Users** (1 Admin, 1 Regular User)

## 🎓 How to Use the Website

### Getting Started

1. **Login Screen:**
   - Enter username and password
   - Use demo credentials: `adm/adm` (admin) or `user/user` (regular user)
   - Click "Sign in" button
   - You'll be redirected to the Dashboard

2. **Navigation:**
   - **Sidebar (Left):** Main navigation menu with all features
   - **Navbar (Top):** Shows your username and logout button
   - **Mobile:** Click menu icon (☰) to open sidebar

3. **Dashboard Overview:**
   - See 4 stat cards: Total Books, Available Books, Active Members, Pending Fines
   - View active book issues table below
   - All numbers update in real-time

### Common User Workflows

#### 📖 Searching for Books
1. Click **"Search Books"** in sidebar
2. Type in search box (searches title, author, ISBN)
3. Browse results
4. View book details

#### 📝 Issuing a Book (Admin Only)
1. Click **"Issue Book"** in sidebar
2. Search for the book you want to issue
3. Select member from dropdown
4. Click **"Issue Book"**
5. Due date is set automatically (14 days)
6. Success! Book is now issued

#### 🔄 Returning a Book (Admin Only)
1. Go to **Dashboard** or **Issue Book** page
2. Find the book in **Active Issues** table
3. Click **"Return"** button
4. If overdue → Fine is automatically calculated (₹10/day)
5. Fine added to member's account

#### 💰 Processing Fines (Admin Only)
1. Click **"Fine Payment"** in sidebar
2. View all fines (unpaid/paid)
3. Click **"Pay"** button next to unpaid fine
4. Status changes to "Paid"
5. Transaction recorded

#### 📊 Viewing Reports
1. Click **"Reports"** in sidebar
2. Use tabs to switch between:
   - **Overdue Books:** See which books are late
   - **Popular Books:** Most borrowed books
   - **Fine Summary:** All fines breakdown
   - **Master Books/Movies/Members:** Complete lists
3. Data updates in real-time

#### 📈 Viewing Charts
1. Click **"Charts"** in sidebar
2. See visual analytics:
   - Pie chart: Book availability
   - Bar chart: Books by category
   - Line chart: Monthly trends
3. Charts are interactive (hover for details)

#### 👥 Managing Members (Admin Only)
1. Click **"Manage Members"** in sidebar
2. Click **"Add Member"** button
3. Fill in: Name, Email, Phone, Address
4. Select membership duration (6/12/24 months)
5. Click **"Add Member"**
6. To edit: Click pencil icon
7. To deactivate: Click toggle

#### 📚 Managing Books (Admin Only)
1. Click **"Manage Books"** under Admin section
2. Click **"Add Book"** button
3. Fill in book details:
   - ISBN (10 or 13 digits)
   - Title, Author
   - Type (Book/Movie - use radio buttons)
   - Category, Copies
4. Click **"Add Book"**
5. To edit: Click edit icon
6. To delete: Click delete icon

#### 🎬 Issue Requests Flow
**For Regular Users:**
1. Search for a book
2. Click **"Request Issue"**
3. Wait for admin approval

**For Admins:**
1. Click **"Issue Requests"** in sidebar
2. View pending requests
3. Click **"Approve"** or **"Reject"**
4. Add remarks (optional)
5. Request status updates automatically

### Tips for Best Experience

✨ **Navigation Tips:**
- Active page is highlighted in sidebar (indigo background)
- Hover over sidebar items to see slide animation
- Logo rotates on hover - try it!

🎨 **Visual Feedback:**
- Buttons scale when you click them
- Cards lift up on hover
- Input fields slightly grow when focused
- Smooth page transitions

📱 **Mobile Usage:**
- Tap menu icon (☰) to open sidebar
- Swipe or tap outside to close sidebar
- All features work on mobile
- Stat cards stack vertically

⚡ **Quick Actions:**
- Use search boxes to filter data
- Click stat cards to see details
- Tables are sortable and scrollable
- Charts are interactive (hover to see values)

🔐 **Security:**
- Session expires after inactivity
- Admin features are role-protected
- Passwords are encrypted
- Logout clears your session

## ✨ Features Guide

### 🎯 Admin Features

#### 1. Dashboard
- Total books, available books, active members
- Unpaid fines summary
- Active issues count
- Quick statistics overview

**Access:** `/admin/dashboard`

#### 2. Books Management
**Add Book:**
- Navigate to **Books** → **Add Book**
- Fill: ISBN, Title, Author, Type (radio), Category, Copies
- Click **Add Book**, then **Back to Books**

**Manage Books:**
- Search by title/author/ISBN
- Edit book details
- Delete books
- View availability status

**Access:** `/admin/books`, `/admin/add-book`

#### 3. Movies Management
- Add movies with title, director, genre, release year
- Search and filter movies
- Update movie information
- Delete movies

**Access:** `/admin/movies`

#### 4. Members Management
**Add Member:**
- Navigate to **Members** → **Manage Members**
- Fill: Name, Email, Phone, Address
- Select membership duration (6/12/24 months) via radio buttons
- Click **Add Member**, then **Back**

**Manage Members:**
- View all members
- Edit member details
- Activate/deactivate memberships

**Access:** `/admin/members`

#### 5. Issue Book
**Process:**
1. Search for book by title/author/ISBN
2. Select member from dropdown
3. System sets due date (14 days automatically)
4. Click **Issue Book**

**Return Book:**
1. View **Active Issues** section
2. Click **Return** for the book
3. If overdue → Fine calculated (₹10/day)
4. Fine added to member account

**Access:** `/admin/issue`

#### 6. Issue Requests
**Workflow:**
1. View pending requests
2. See book and member details
3. **Approve** or **Reject** request
4. Add remarks (optional)
5. Status updates automatically

**Access:** `/admin/issue-requests`

#### 7. Fine Payment
- View all fines (paid/unpaid)
- Click **Pay** to process payment
- Status changes to "Paid"
- Track payment history

**Access:** `/admin/fines`

#### 8. Reports
Navigate to **Reports** and use tabs:

**Overdue Books:** Books past due date with member details  
**Popular Books:** Most issued books with issue count  
**Fine Summary:** Complete breakdown of all fines  
**Master Books:** Complete inventory of all books  
**Master Movies:** Complete inventory of all movies  
**Master Members:** Complete list of all members  

**Access:** `/admin/reports`

#### 9. Charts & Analytics
Visual data representation:
- **Pie Chart:** Book status distribution
- **Bar Chart:** Books by category
- **Horizontal Bar:** Top 10 popular books
- **Grouped Bar:** Overall library statistics
- **Line Chart:** Monthly activity trends

**Access:** `/admin/charts`

#### 10. User Management
- Add new users (Admin/Regular)
- Edit user details and roles
- Delete users
- System prevents deleting last admin

**Access:** `/admin/users`

### 👤 Regular User Features
- View dashboard (read-only)
- Search books and movies
- Create issue requests
- View own issue history
- View own fines

## 📡 API Endpoints Reference

### Authentication
```
POST   /api/auth/register      Register new user
POST   /api/auth/login         Login user
POST   /api/auth/logout        Logout user
GET    /api/auth/me            Get current user info
```

### Books
```
GET    /api/books              Get all books
GET    /api/books/:id          Get book by ID
POST   /api/books              Add new book (Admin)
PUT    /api/books/:id          Update book (Admin)
DELETE /api/books/:id          Delete book (Admin)
GET    /api/books/search       Search books
```

### Movies
```
GET    /api/movies             Get all movies
GET    /api/movies/:id         Get movie by ID
POST   /api/movies             Add new movie (Admin)
PUT    /api/movies/:id         Update movie (Admin)
DELETE /api/movies/:id         Delete movie (Admin)
```

### Members
```
GET    /api/members            Get all members
GET    /api/members/:id        Get member by ID
POST   /api/members            Add new member (Admin)
PUT    /api/members/:id        Update member (Admin)
DELETE /api/members/:id        Delete member (Admin)
GET    /api/members/active     Get active members
```

### Issues
```
GET    /api/issues             Get all issues
POST   /api/issues             Issue a book (Admin)
POST   /api/issues/:id/return  Return a book (Admin)
GET    /api/issues/active      Get active issues
```

### Issue Requests
```
GET    /api/issue-requests     Get all requests
POST   /api/issue-requests     Create new request
PUT    /api/issue-requests/:id/approve   Approve request (Admin)
PUT    /api/issue-requests/:id/reject    Reject request (Admin)
```

### Fines
```
GET    /api/fines              Get all fines
PUT    /api/fines/:id/pay      Pay a fine (Admin)
```

### Reports
```
GET    /api/reports/overdue           Overdue books
GET    /api/reports/popular-books     Popular books
GET    /api/reports/fine-summary      Fine summary
```

### Users (Admin Only)
```
GET    /api/users              Get all users
POST   /api/users              Create new user
PUT    /api/users/:id          Update user
DELETE /api/users/:id          Delete user
```

### Dashboard
```
GET    /api/dashboard/stats    Get dashboard statistics
```

## 📋 Business Rules

### Book Issues
- Books must have available copies
- Members must have active membership
- Issue period: **14 days**
- Multiple books can be issued to one member

### Fines
- Late fee: **₹10 per day**
- Automatically calculated on return
- Must be paid before closure
- Tracked in fine history

### Memberships
- Durations: **6, 12, or 24 months**
- Active status required for issuing
- Can be renewed/extended
- Inactive members blocked from issuing

### User Roles
- **Admin:** Complete system access
- **User:** View, search, request only
- Minimum one admin required
- Role-based route protection

## 🔄 Development Workflow

### Adding New Features

**Backend:**
1. Create model in `models/`
2. Create controller in `controllers/`
3. Add route in `routes/`
4. Register route in `server.js`
5. Test with Postman

**Frontend:**
1. Create service function in `services/`
2. Create page component in `pages/`
3. Add route in `App.jsx`
4. Add navigation link in `Sidebar.jsx`

### Authentication Flow

1. User submits login → Backend validates credentials
2. Backend generates JWT token (7-day expiry)
3. Token stored in `localStorage`
4. Token sent in `Authorization` header with every request
5. Middleware verifies token → Grants/denies access

### Data Flow Pattern

```
MongoDB → Express API → Axios Service → React Component
```

**Response Structure:**
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

**Usage in Frontend:**
```javascript
const response = await serviceFunction();
const data = response.data; // Extract data
```

## 🎨 UI/UX Design Choices

### Animation System
**What We Added:**
- **Fade-in animations:** Smooth entrance for pages and cards
- **Staggered delays:** Cards appear sequentially (100ms, 200ms, 300ms, 400ms)
- **Hover lift effects:** Cards rise on hover (-translate-y-1)
- **Scale animations:** Buttons and icons grow/shrink on interaction
- **Rotate effects:** Icons rotate 3° on hover
- **Slide animations:** Sidebar items slide right on hover

**Why:**
- Creates a polished, professional feel
- Guides user attention naturally
- Makes the interface feel responsive
- Adds visual interest without overwhelming

### Color Scheme
**Primary Colors:**
- **Indigo-600:** Primary actions, active states
- **Purple-600:** Accent gradients
- **Gray-50:** Background
- **White:** Cards and containers

**Why:**
- Indigo/purple suggests trust and creativity
- High contrast for accessibility
- Modern, professional appearance
- Consistent with top library systems

### Typography & Spacing
**Responsive Padding:**
- Mobile (p-4): 16px
- Tablet (p-6): 24px
- Desktop (p-8): 32px

**Font Hierarchy:**
- Headings: Bold with gradient text
- Body: Regular gray-900/gray-600
- Small text: gray-500

**Why:**
- Breathing room improves readability
- Clear visual hierarchy
- Professional spacing standards

### Component Design

**Stat Cards:**
- Gradient icon backgrounds
- Large bold numbers
- Subtle shadows
- Hover lift + shadow increase

**Tables:**
- Clean borders (gray-200)
- Hover state (indigo-50)
- Avatar circles for members
- Status badges with colors

**Forms:**
- Input focus effects (scale + ring)
- Clear labels and placeholders
- Button press animations
- Error message styling

**Navigation:**
- Clean white sidebar
- Active state with scale
- Logo animation on hover
- Smooth transitions

### Accessibility Features
- Semantic HTML elements
- ARIA labels ready
- Keyboard navigation support
- High contrast ratios
- Focus visible states
- Screen reader friendly

## 🔮 Future Enhancements

- 📧 Email notifications for overdue books
- 📱 SMS alerts for members
- 🔖 Book reservation system
- 💳 Online payment gateway
- 📱 Mobile app (React Native)
- 🔍 Advanced search filters
- 📄 Export reports (PDF/Excel)
- 🏢 Multi-library support
- 🤖 AI-based book recommendations
- 📊 Advanced analytics dashboard
- 🌙 Dark mode theme
- 🌍 Multi-language support
- 📸 Book cover images
- ⭐ Rating and review system
- 📱 QR code scanning

## 📝 Notes for Developers

### Code Organization
- **Controllers:** Database operations and business logic
- **Routes:** API endpoint definitions with middleware
- **Services:** Axios functions for API calls
- **Pages:** React components for UI
- **Context:** Global state (authentication)

### Best Practices
- Always validate input data
- Use try-catch for error handling
- Include meaningful error messages
- Keep components small and focused
- Use semantic HTML and ARIA labels
- Follow RESTful API conventions

### Security Considerations
- JWT tokens expire in 7 days
- Passwords hashed with bcrypt
- Protected routes require authentication
- Admin routes require admin role
- CORS enabled for frontend origin

## 📞 Support

For issues or questions:

1. Check this README thoroughly
2. Review browser console for errors
3. Check terminal output for backend logs
4. Verify all dependencies installed
5. Ensure both servers are running

## 📄 License

This project is for educational/internal use at Acxiom Consulting.

## 🏆 Key Achievements

### Technical Excellence
✅ **Full-Stack Integration:** Seamless React + Express + MongoDB communication  
✅ **JWT Authentication:** Secure token-based auth with role management  
✅ **RESTful API:** Clean, documented API endpoints  
✅ **Real-time Updates:** Live data synchronization across components  
✅ **Error Handling:** Comprehensive try-catch with meaningful messages  

### User Experience
✅ **Professional Design:** Modern, clean interface with animations  
✅ **Responsive Layout:** Works on mobile, tablet, desktop  
✅ **Intuitive Navigation:** Clear sidebar and navbar structure  
✅ **Visual Feedback:** Hover effects, loading states, success messages  
✅ **Performance:** Fast page loads, optimized rendering  

### Features Implemented
✅ **Complete CRUD:** Books, Members, Issues, Fines, Users  
✅ **Advanced Search:** Filter by title, author, ISBN, category  
✅ **Reports System:** 6 different report types  
✅ **Data Visualization:** 5 chart types with Recharts  
✅ **Fine Calculation:** Automatic late fee computation  
✅ **Issue Requests:** Workflow with approval/rejection  
✅ **User Roles:** Admin vs Regular user access control  

### Development Best Practices
✅ **Modular Code:** Separated controllers, services, components  
✅ **Reusable Components:** Layout, forms, cards abstracted  
✅ **Context API:** Global auth state management  
✅ **Environment Config:** MongoDB credentials configurable  
✅ **Git Version Control:** Tracked with meaningful commits  

---

**Version:** 1.0.0  
**Last Updated:** December 6, 2025  
**Built with:** MERN Stack + Vite + Tailwind CSS + Recharts  
**Developed by:** Acxiom Consulting Team  
**Design Philosophy:** Modern, Professional, User-Friendly
