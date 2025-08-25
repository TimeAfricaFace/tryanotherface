# Try Another Face (TAF) - Technical Specifications

## 🏗️ System Architecture

### Frontend Architecture
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Input, Modal)
│   ├── layout/          # Layout components (Navigation, Layout)
│   ├── auth/            # Authentication components
│   ├── onboarding/      # Onboarding flow components
│   └── reflections/     # Reflection-related components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── contexts/            # React context providers
├── lib/                 # External service integrations
├── theme/               # Design system and theming
│   ├── elements.ts      # Cultural elemental wisdom integration
│   └── colors.ts        # Sacred color system
├── types/               # TypeScript type definitions
└── router/              # Application routing
```

### Backend Architecture (Supabase)
```
Database Tables:
├── profiles             # User profiles with elemental identity
├── reflections          # User posts with media support
├── comments             # Comment system
├── likes                # Like/reaction system
├── jobs                 # Job postings
├── skills               # User skills and endorsements
├── housing_listings     # Housing rental/sale listings
└── admin_reports        # Content moderation

Storage Buckets:
├── media/               # User-uploaded media (images, videos, audio)
└── avatars/             # Profile pictures
```

## 🔧 Technology Stack Details

### Core Technologies
- **React**: 18.3.1 (Latest stable)
- **TypeScript**: 5.5.3 (Strict mode enabled)
- **Vite**: 5.4.2 (Build tool and dev server)
- **TailwindCSS**: 3.4.1 (Utility-first CSS framework)

### UI/UX Libraries
- **Framer Motion**: 10.18.0 (Animations and transitions)
  - Enhanced with 3D transforms and perspective animations
  - Hardware-accelerated GPU optimizations
  - Glassmorphism and depth effects
- **Lucide React**: 0.344.0 (Icon library)
- **React Hook Form**: 7.49.2 (Form handling)
- **Yup**: 1.4.0 (Schema validation)
- **React Dropzone**: 14.2.3 (File upload handling)

### Backend Services
- **Supabase**: 2.39.0 (Database, Auth, Storage)
- **Stripe**: 2.4.0 (Payment processing)

### Development Tools
- **ESLint**: 9.9.1 (Code linting)
- **Vitest**: 1.1.0 (Unit testing)
- **Cypress**: 13.6.2 (E2E testing)
- **React Testing Library**: 14.1.2 (Component testing)

## 📊 Database Schema Specifications

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  element element_type NOT NULL, -- 'fire', 'water', 'air', 'earth'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Reflections Table
```sql
CREATE TABLE reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_text TEXT NOT NULL,
  media_urls JSONB, -- Array of media file URLs
  element element_type NOT NULL,
  visibility visibility_type DEFAULT 'public', -- 'public', 'private'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Security Policies (RLS)
```sql
-- Profiles: Public read, own profile write
CREATE POLICY "Public profiles viewable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Reflections: Public read for public posts, own posts write
CREATE POLICY "Public reflections viewable" ON reflections 
  FOR SELECT USING (visibility = 'public' OR author_id = auth.uid());
CREATE POLICY "Users can manage own reflections" ON reflections 
  FOR ALL USING (auth.uid() = author_id);
```

## 🎨 Design System Specifications

### Modern 3D Design System
```css
/* 3D Design Tokens */
:root {
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-bg-dark: rgba(0, 0, 0, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --backdrop-blur: blur(20px);
  
  /* 3D Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* 3D Transforms */
  --transform-3d: perspective(1000px);
  --rotate-x: rotateX(-5deg);
  --rotate-y: rotateY(5deg);
  --translate-z: translateZ(10px);
}
```

### Enhanced Color System
```typescript
export const elementalWisdom = {
  fire: {
    // Visual Design
    primary: '#FF6B35',      // Sacred fire amber
    secondary: '#FF8E53',    // Solar energy
    accent: '#FFB366',       // Divine flame
    gradient: 'from-orange-500 to-red-500',
    glow: 'shadow-orange-500/25',
    glass: 'bg-orange-500/10 backdrop-blur-md',
    shadow3d: '0 20px 25px -5px rgba(255, 107, 53, 0.3)',
    
    // Cultural & Historical Foundations
    name: 'Fire',
    sanskrit: 'Agni',
    chinese: '火 (Huǒ)',
    direction: 'South',
    season: 'Summer',
    
    // Ancient Traditions
    traditions: {
      vedic: {
        deity: 'Agni - God of Fire and Divine Messenger',
        chakra: 'Manipura (Solar Plexus) - Personal Power',
        mantra: 'RAM',
        gemstone: 'Ruby, Carnelian, Fire Opal',
      },
      chinese: {
        organ: 'Heart and Small Intestine',
        emotion: 'Joy and Enthusiasm',
        virtue: 'Li (Ritual Propriety)',
      },
    },
    
    // Spiritual Practices
    practices: {
      meditation: 'Candle gazing (Trataka), Sun meditation',
      breathwork: 'Breath of Fire (Kapalabhati)',
      yoga: 'Power yoga, Sun salutations',
      ritual: 'Sacred fire ceremonies, candle magic',
    },
    
    // Life Path Guidance
    lifePath: {
      purpose: 'To ignite transformation and inspire others to embrace their authentic power',
      lesson: 'True strength comes from inner fire, not external validation',
      gift: 'The ability to transmute pain into wisdom and lead others through change',
    },
  },
  water: {
    primary: '#0EA5E9',      // Sky blue
    secondary: '#38BDF8',    // Light blue
    accent: '#7DD3FC',       // Very light blue
    gradient: 'from-blue-500 to-teal-500',
    glow: 'shadow-blue-500/25',
    glass: 'bg-blue-500/10 backdrop-blur-md',
    shadow3d: '0 20px 25px -5px rgba(14, 165, 233, 0.3)',
  },
  air: {
    primary: '#E0E7FF',      // Very light indigo
    secondary: '#C7D2FE',    // Light indigo
    accent: '#A5B4FC',       // Medium indigo
    gradient: 'from-indigo-200 to-blue-200',
    glow: 'shadow-indigo-500/25',
    glass: 'bg-indigo-200/20 backdrop-blur-md',
    shadow3d: '0 20px 25px -5px rgba(224, 231, 255, 0.4)',
  },
  earth: {
    primary: '#16A34A',      // Green
    secondary: '#22C55E',    // Light green
    accent: '#4ADE80',       // Very light green
    gradient: 'from-green-600 to-emerald-600',
    glow: 'shadow-green-500/25',
    glass: 'bg-green-500/10 backdrop-blur-md',
    shadow3d: '0 20px 25px -5px rgba(22, 163, 74, 0.3)',
  },
};
```

### Typography Scale
```css
/* Headers */
h1: font-size: 2.25rem, line-height: 120%, font-weight: bold
h2: font-size: 1.875rem, line-height: 120%, font-weight: bold
h3: font-size: 1.5rem, line-height: 120%, font-weight: semibold

/* Body Text */
body: font-size: 1rem, line-height: 150%, font-weight: normal
small: font-size: 0.875rem, line-height: 150%, font-weight: normal

/* Spacing System */
Base unit: 8px (0.5rem)
Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

### Component Specifications

#### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  element?: Element; // Applies sacred elemental theming with cultural context
  glass?: boolean; // Applies glassmorphism effect
  elevated?: boolean; // Applies 3D elevation
  loading?: boolean;
  disabled?: boolean;
}
```

#### Card Component
```typescript
interface CardProps {
  element?: Element; // Applies sacred elemental styling with cultural significance
  hoverable?: boolean; // Adds hover animations
  glass?: boolean; // Glassmorphism variant
  elevated?: boolean; // 3D elevated variant
  padding: 'sm' | 'md' | 'lg';
}
```

## 🔐 Security Specifications

### Authentication Flow
```typescript
// Multi-provider authentication support
const authProviders = [
  'google',     // Google OAuth 2.0
  'facebook',   // Facebook OAuth (optional)
  'email',      // Email/password
  'phone'       // SMS OTP (via Twilio)
];

// Session management
const sessionConfig = {
  jwt_expiry: 3600,              // 1 hour
  refresh_token_rotation: true,   // Automatic token refresh
  secure_email_change: true,      // Email verification required
};
```

### Data Validation
```typescript
// Input validation schemas
const reflectionSchema = yup.object({
  content_text: yup.string()
    .required('Content is required')
    .max(2000, 'Content too long'),
  visibility: yup.string()
    .oneOf(['public', 'private'])
    .required(),
  element: yup.string()
    .oneOf(['fire', 'water', 'air', 'earth'])
    .required('Sacred element required'),
  media_urls: yup.array()
    .of(yup.string().url())
    .max(5, 'Maximum 5 media files'),
});
```

### File Upload Security
```typescript
const fileUploadConfig = {
  maxFileSize: 50 * 1024 * 1024,  // 50MB
  allowedMimeTypes: [
    'image/jpeg', 'image/png', 'image/webp',
    'video/mp4', 'video/webm',
    'audio/mp3', 'audio/wav', 'audio/ogg'
  ],
  virusScanEnabled: true,
  contentModerationEnabled: true,
};
```

## 📱 Performance Specifications

### Bundle Size Targets
```
Initial Bundle: < 400KB gzipped (increased for 3D effects)
Route Chunks: < 100KB gzipped each
Image Assets: WebP format, responsive sizes
Video Assets: < 10MB, compressed for web
```

### Core Web Vitals Targets
```
First Contentful Paint (FCP): < 2.0s
Largest Contentful Paint (LCP): < 2.5s
First Input Delay (FID): < 100ms
Cumulative Layout Shift (CLS): < 0.1
```

### Optimization Strategies
```typescript
// Code splitting by routes
const LazyFeedPage = lazy(() => import('./pages/FeedPage'));
const LazyProfilePage = lazy(() => import('./pages/ProfilePage'));

// 3D Animation optimization
const animation3D = {
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  perspective: 1000,
  transformStyle: 'preserve-3d',
};

// Image optimization
const imageOptimization = {
  formats: ['webp', 'jpeg'],
  sizes: [320, 640, 1024, 1280],
  quality: 80,
  lazyLoading: true,
};

// Database query optimization
const queryOptimization = {
  indexing: ['created_at', 'author_id', 'element', 'visibility'],
  pagination: { limit: 20, offset: 'cursor-based' },
  caching: { ttl: 300 }, // 5 minutes
};
```

## 🧪 Testing Specifications

### Unit Test Coverage Targets
```
Components: > 80% coverage
Hooks: > 90% coverage
Utilities: > 95% coverage
Critical paths: 100% coverage
```

### E2E Test Scenarios
```typescript
const e2eTestSuites = [
  'authentication-flow',      // Sign up, login, logout
  'onboarding-experience',    // Cinematic intro, element selection
  'reflection-lifecycle',     // Create, edit, delete reflections
  'community-interaction',    // Like, comment, share
  'job-board-workflow',       // Post job, apply, manage
  'housing-search',           // Create listing, search, contact
  'marketplace-purchase',     // Add to cart, checkout, payment
  'admin-moderation',         // Report content, moderate
];
```

### Performance Testing
```typescript
const performanceTests = {
  loadTesting: {
    concurrent_users: 100,
    duration: '5m',
    target_response_time: '< 2s',
  },
  stressTesting: {
    concurrent_users: 500,
    ramp_up_time: '2m',
    acceptable_error_rate: '< 1%',
  },
};
```

## 🔄 API Specifications

### Supabase API Endpoints
```typescript
// Reflections API
GET    /rest/v1/reflections          // List reflections with filters
POST   /rest/v1/reflections          // Create new reflection
PATCH  /rest/v1/reflections/:id      // Update reflection
DELETE /rest/v1/reflections/:id      // Delete reflection

// Profiles API
GET    /rest/v1/profiles/:id         // Get user profile
PATCH  /rest/v1/profiles/:id         // Update profile

// Storage API
POST   /storage/v1/object/media      // Upload media file
GET    /storage/v1/object/media/:id  // Get media file
DELETE /storage/v1/object/media/:id  // Delete media file
```

### Stripe API Integration
```typescript
// Payment processing
const stripeConfig = {
  mode: 'test',                    // Use test mode for development
  currency: 'usd',                 // Default currency
  payment_methods: ['card'],       // Supported payment methods
  webhook_events: [
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'customer.subscription.created',
  ],
};
```

## 📊 Monitoring & Analytics

### Application Metrics
```typescript
const metricsToTrack = {
  user_engagement: [
    'daily_active_users',
    'reflection_creation_rate',
    'comment_interaction_rate',
    'sacred_element_selection_distribution',
    'cultural_wisdom_engagement',
  ],
  performance: [
    'page_load_times',
    'api_response_times',
    'error_rates',
    'conversion_rates',
  ],
  business: [
    'user_registration_rate',
    'payment_success_rate',
    'job_application_rate',
    'housing_inquiry_rate',
  ],
};
```

### Error Tracking
```typescript
const errorTracking = {
  client_errors: {
    javascript_errors: true,
    network_failures: true,
    authentication_failures: true,
  },
  server_errors: {
    database_errors: true,
    api_failures: true,
    payment_failures: true,
  },
  alerting: {
    error_rate_threshold: '> 1%',
    response_time_threshold: '> 5s',
    notification_channels: ['email', 'slack'],
  },
};
```

## 🚀 Deployment Specifications

### Build Configuration
```typescript
// Vite build configuration
const buildConfig = {
  target: 'es2020',
  minify: 'terser',
  sourcemap: true,
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        supabase: ['@supabase/supabase-js'],
        ui: ['framer-motion', 'lucide-react'],
      },
    },
  },
};
```

### Environment Configuration
```bash
# Development
NODE_ENV=development
VITE_APP_ENV=development
VITE_API_URL=http://localhost:54321

# Staging
NODE_ENV=production
VITE_APP_ENV=staging
VITE_API_URL=https://staging-api.tryanotherface.com

# Production
NODE_ENV=production
VITE_APP_ENV=production
VITE_API_URL=https://api.tryanotherface.com
```

### CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    - Install dependencies
    - Run linting
    - Run unit tests
    - Run E2E tests
    - Build application
  deploy:
    - Deploy to staging (on main branch)
    - Run smoke tests
    - Deploy to production (on release tag)
```

---

**Technical Specifications Version**: 1.0 - Cultural Integration Complete
**Last Updated**: January 11, 2025 - Ancient Wisdom & Modern 3D Design
**Next Review**: February 11, 2025

*Integrating thousands of years of spiritual wisdom with cutting-edge technology*