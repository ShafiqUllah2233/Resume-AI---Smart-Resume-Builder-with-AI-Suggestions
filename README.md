# AI-Powered Resume Builder

A full-stack MERN (MongoDB, Express.js, React, Node.js) application that helps users create professional resumes with AI-powered content suggestions.

![Resume Builder](https://via.placeholder.com/800x400?text=AI+Resume+Builder)

## ✨ Features

### User Features
- 📝 **Resume Creation**: Create professional resumes with a step-by-step wizard
- 🤖 **AI Suggestions**: Get AI-powered suggestions for experience bullet points, skills, and professional summary
- 📑 **Multiple Templates**: Choose from Modern, Classic, Minimal, Professional, and Creative templates
- 📥 **PDF Download**: Download your resume as a high-quality PDF
- 💾 **Auto-Save**: Changes are automatically saved as you type
- 📚 **Resume History**: Manage multiple resumes with version control

### Technical Features
- 🔐 JWT-based authentication
- 🔒 Password hashing with bcrypt
- 🚦 Rate limiting for API protection
- 📱 Responsive design (mobile-friendly)
- ⚡ Real-time preview

## 🛠 Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- React Router v6
- Zustand (State Management)
- React Hook Form
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Puppeteer (PDF Generation)
- OpenAI API (AI Suggestions)

## 📁 Project Structure

```
ai-resume-builder/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Zustand stores
│   │   ├── hooks/         # Custom hooks
│   │   └── App.js
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── config/            # Database config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── server.js          # Entry point
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd "AI Resume"
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Configure environment variables**

Server (.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
OPENAI_API_KEY=your-openai-api-key (optional)
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run the application**

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/logout | Logout user |

### Resumes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/resumes | Get all user resumes |
| GET | /api/resumes/:id | Get single resume |
| POST | /api/resumes | Create new resume |
| PUT | /api/resumes/:id | Update resume |
| DELETE | /api/resumes/:id | Delete resume |
| POST | /api/resumes/:id/duplicate | Duplicate resume |

### AI Suggestions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ai/experience-suggestions | Get experience bullet points |
| POST | /api/ai/skills-suggestions | Get skill suggestions |
| POST | /api/ai/summary-suggestions | Get professional summary |
| POST | /api/ai/ats-keywords | Get ATS keywords |

### PDF Generation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/pdf/generate/:id | Generate PDF for resume |
| GET | /api/pdf/preview/:id | Get HTML preview |

## 🎨 Available Templates

1. **Modern** - Clean, contemporary design with accent colors
2. **Classic** - Traditional, professional layout
3. **Minimal** - Simple, elegant with focus on content
4. **Professional** - Corporate-style for business roles
5. **Creative** - Unique design for creative roles

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- Protected routes
- CORS configuration

## 🤖 AI Integration

The application uses mock AI suggestions by default. To enable OpenAI:

1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add it to your `.env` file:
```env
OPENAI_API_KEY=your-api-key
```
3. Modify the AI controller to use OpenAI API

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for portfolio demonstration

---

**Note**: This is a portfolio project demonstrating full-stack MERN development skills. The AI features use mock data by default and can be connected to OpenAI for production use.
