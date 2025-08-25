# 🎭 Try Another Face (TAF) - Spiritual Awakening Platform

![TAF Logo](public/file_000000009c24624693dc549194d4cb7a.png)

A modern full-stack web application for spiritual discovery and authentic self-expression, integrating ancient elemental wisdom with cutting-edge technology. Built with React, TypeScript, Supabase, and deployed on Netlify.

**🌟 Live Demo**: [Try Another Face](https://your-netlify-url.netlify.app)

---

## 🌟 Features

### Core Functionality
- **Cinematic Onboarding**: Beautiful 3-scene introduction with skip option
- **Sacred Elemental Identity System**: Choose your spiritual path through ancient wisdom
  - **Fire (Agni)**: Sanskrit fire god, transformation and sacred activism
  - **Water (Jal)**: Cosmic ocean wisdom, emotional healing and intuition
  - **Air (Vayu)**: Divine breath, spiritual clarity and communication
  - **Earth (Prithvi)**: Mother Earth goddess, grounding and abundance
- **Cultural Integration**: Vedic, Chinese, Celtic, and Native American traditions
- **Reflections Feed**: Share text, images, videos, and audio with elemental filtering and modern 3D design
- **Multi-Provider Authentication**: Google OAuth, Facebook OAuth, Email + Password, Phone OTP
- **Mobile-First Responsive Design**: PWA-ready with intuitive navigation and 3D effects

### Community Features
- **Jobs & Skills Board**: Post jobs, showcase skills, apply for opportunities with modern 3D interface
- **Housing Listings**: Find/list accommodations with glassmorphism design
- **Marketplace**: Buy/sell goods and services with Stripe payments and 3D product cards
- **Settings Dashboard**: Complete user management with modern 3D design

### Technical Features
- **Real-time Updates**: Live feed updates and notifications
- **Media Storage**: Secure file uploads via Supabase Storage  
- **Advanced Security**: Row Level Security (RLS) and input validation
- **Performance Optimized**: <400KB initial bundle with 3D effects, lazy loading
- **Accessibility**: WCAG AA compliant design
- **Modern 3D Design**: Glassmorphism, elevated shadows, hardware-accelerated animations
- **Cultural Depth**: Ancient wisdom integrated with modern UX design

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **3D Design**: Framer Motion with hardware acceleration, CSS transforms, glassmorphism, cultural aesthetics
- **Spiritual Framework**: Ancient elemental wisdom (Sanskrit, Chinese, Celtic, Native traditions)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe (test mode)
- **Deployment**: Netlify with CI/CD
- **Testing**: Vitest, React Testing Library, Cypress
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account (test mode)
- Netlify account

### Environment Variables
Create a `.env` file:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_test_publishable_key
STRIPE_SECRET_KEY=your_stripe_test_secret_key

# Optional OTP Provider
VITE_TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

### Installation
```bash
# Clone the repository
git clone https://github.com/TryAnotherFace/tryanotherface.git
cd try-another-face

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### Database Setup
1. Create a new Supabase project
2. Run the migration file in `supabase/migrations/001_initial_schema.sql`
3. Set up OAuth providers in Supabase Auth settings
4. Create storage buckets: `media`, `avatars`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run cypress:open

# Run all tests
npm run test:all
```

## 📱 Key User Flows

### 1. New User Onboarding
1. **Cinematic Introduction**: 3-scene spiritual awakening story
2. **Authentication**: Choose from multiple sign-up options
3. **Sacred Element Selection**: Choose your spiritual path
   - Fire (Agni) - Transformation and sacred activism
   - Water (Jal) - Emotional healing and intuitive wisdom
   - Air (Vayu) - Spiritual clarity and divine communication
   - Earth (Prithvi) - Grounding and sustainable abundance
4. **Profile Creation**: Complete setup with bio and avatar

### 2. Creating Reflections
1. **Compose**: Write authentic thoughts with culturally-informed spiritual prompts
2. **Media Upload**: Attach images, videos, or audio
3. **Visibility**: Choose public or private sharing
4. **Sacred Element Tag**: Auto-tagged with user's elemental path and cultural context

### 3. Community Interaction
1. **Browse Feed**: Filter by sacred elements, no algorithmic manipulation
2. **Engage**: Like, comment, and share meaningful content
3. **Jobs/Housing**: Post opportunities or browse listings
4. **Marketplace**: Secure transactions via Stripe

## 🎨 Design System

### Sacred Color Palette with Cultural Significance
- **Fire (Agni)**: Deep amber/orange gradients (`#FF6B35`) - Sacred fire energy, transformation
- **Water (Jal)**: Teal/deep blue gradients (`#0EA5E9`) - Cosmic ocean wisdom, emotional healing
- **Air (Vayu)**: Soft blue/white gradients (`#E0E7FF`) - Divine breath, spiritual clarity
- **Earth (Prithvi)**: Deep green/ochre gradients (`#16A34A`) - Mother Earth abundance, grounding
- **3D Effects**: Glassmorphism, elevated shadows, perspective transforms

### Typography
- Headers: 120% line height, bold weights
- Body: 150% line height, readable sizing
- Maximum 3 font weights used

### Spacing
- Consistent 8px grid system
- Proper hierarchy and visual balance
- Intentional white space usage
- Enhanced depth perception with 3D layering

## 🔒 Security & Privacy

- **Authentication**: Supabase Auth with MFA support
- **Authorization**: Row Level Security on all tables
- **Data Validation**: Server-side input sanitization
- **File Uploads**: MIME type checking and size limits
- **Rate Limiting**: API endpoint protection
- **HTTPS Everywhere**: Encrypted connections only

## 🚀 Deployment

### Netlify Deployment
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Enable automatic deployments on push

### Build Settings
```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables (set in Netlify dashboard)
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_STRIPE_PUBLISHABLE_KEY
```

## 📊 Performance Targets

- **First Contentful Paint**: <2.5s (with 3D effects)
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms
- **Bundle Size**: <400KB gzipped (including 3D enhancements)

## 🛡️ Content Moderation

- **Reporting System**: Users can flag inappropriate content
- **Admin Dashboard**: Review and manage reports
- **Automated Filtering**: Basic content safety checks
- **Manual Review Queue**: Human moderation for complex cases

## 📈 Analytics & Monitoring

- **Privacy-First**: No third-party tracking
- **Self-Hosted Metrics**: Supabase analytics
- **Error Monitoring**: Built-in error boundaries
- **Performance Tracking**: Core Web Vitals monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in `/docs`
- Review the troubleshooting guide

## 🗺️ Roadmap

### V1 (Current)
- ✅ Core authentication and onboarding
- ✅ Reflections feed with elemental filtering  
- ✅ Basic jobs and housing modules
- ✅ Stripe payment integration
- ✅ Admin dashboard and moderation

### V2 (Future)
- [ ] Advanced elemental compatibility and spiritual matching
- [ ] Daily practices based on ancient traditions and seasonal cycles
- [ ] Spiritual teacher and mentor connection system
- [ ] Sacred geometry and mandala integration
- [ ] Real-time messaging
- [ ] Advanced search and discovery
- [ ] Mobile app (React Native)
- [ ] Video calling integration
- [ ] Blockchain-based spiritual achievements and growth tracking
- [ ] AI-powered spiritual guidance based on elemental wisdom and cultural traditions

---

**Try Another Face** - Discover your authentic self through ancient wisdom and modern technology.

*Honoring the sacred traditions of Fire (Agni), Water (Jal), Air (Vayu), and Earth (Prithvi) - bridging thousands of years of spiritual wisdom with cutting-edge digital experience.*