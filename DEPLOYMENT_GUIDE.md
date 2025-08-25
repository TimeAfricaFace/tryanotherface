# Try Another Face (TAF) - Complete Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Supabase Setup
- [ ] Create new Supabase project at https://supabase.com
- [ ] Note down project URL and anon key
- [ ] Run database migration from `supabase/migrations/20250811151639_velvet_harbor.sql`
- [ ] Create storage buckets: `media`, `avatars`
- [ ] Configure OAuth providers (Google, Facebook)

### 2. Stripe Configuration
- [ ] Create Stripe account (use test mode)
- [ ] Get publishable and secret keys
- [ ] Set up webhook endpoints for payment processing
- [ ] Configure product catalog for marketplace

### 3. Environment Variables
Update `.env` with actual values:
```env
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 📋 Step-by-Step Deployment

### Step 1: Supabase Database Setup

1. **Create Project**
   ```bash
   # Go to https://supabase.com/dashboard
   # Click "New Project"
   # Choose organization and set project name: "try-another-face"
   # Set database password and region
   ```

2. **Run Migration**
   ```sql
   -- Copy contents of supabase/migrations/20250811151639_velvet_harbor.sql
   -- Paste into Supabase SQL Editor
   -- Execute the migration
   ```

3. **Configure Storage**
   ```bash
   # In Supabase Dashboard > Storage
   # Create bucket: "media" (public)
   # Create bucket: "avatars" (public)
   # Set appropriate file size limits (50MB for media, 5MB for avatars)
   ```

4. **Setup OAuth Providers**
   ```bash
   # In Supabase Dashboard > Authentication > Providers
   # Enable Google OAuth:
   #   - Add Google Client ID and Secret
   #   - Set redirect URL: https://your-project.supabase.co/auth/v1/callback
   # Enable Facebook OAuth (optional):
   #   - Add Facebook App ID and Secret
   ```

### Step 2: Netlify Deployment

1. **Connect Repository**
   ```bash
   # Go to https://netlify.com
   # Click "New site from Git"
   # Connect to GitHub repository
   # Select try-another-face repository
   ```

2. **Configure Build Settings**
   ```bash
   # Build command: npm run build
   # Publish directory: dist
   # Node version: 18
   ```

3. **Set Environment Variables**
   ```bash
   # In Netlify Dashboard > Site settings > Environment variables
   # Add all variables from .env file
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. **Deploy**
   ```bash
   # Click "Deploy site"
   # Wait for build to complete
   # Note the deployment URL
   ```

### Step 3: Stripe Integration

1. **Webhook Configuration**
   ```bash
   # In Stripe Dashboard > Developers > Webhooks
   # Add endpoint: https://your-netlify-site.netlify.app/.netlify/functions/stripe-webhook
   # Select events: payment_intent.succeeded, payment_intent.payment_failed
   # Note webhook signing secret
   ```

2. **Test Payment Flow**
   ```bash
   # Use Stripe test card: 4242 4242 4242 4242
   # Test successful payment in marketplace
   # Verify webhook receives events
   ```

### Step 4: Final Configuration

1. **Update Supabase Auth Settings**
   ```bash
   # In Supabase Dashboard > Authentication > Settings
   # Site URL: https://your-netlify-site.netlify.app
   # Additional redirect URLs: https://your-netlify-site.netlify.app/auth/callback
   ```

2. **Test Core Flows**
   - [ ] User registration with Google OAuth
   - [ ] Element selection and profile creation
   - [ ] Reflection posting with image upload
   - [ ] Feed browsing and interaction
   - [ ] Job posting and application
   - [ ] Housing listing creation
   - [ ] Marketplace purchase flow

## 🧪 Testing Deployment

### Automated Tests
```bash
# Run unit tests
npm test

# Run E2E tests against staging
npm run cypress:run --config baseUrl=https://your-netlify-site.netlify.app
```

### Manual Testing Checklist
- [ ] **Authentication**: Sign up with Google, email/password
- [ ] **Onboarding**: Complete cinematic intro and element selection
- [ ] **Reflections**: Create post with text and image
- [ ] **Feed**: Browse, filter by element, like and comment
- [ ] **Profile**: Update profile information and skills
- [ ] **Jobs**: Post job, browse listings, apply
- [ ] **Housing**: Create listing, search with filters
- [ ] **Marketplace**: Add item, complete purchase with Stripe
- [ ] **Admin**: Report content, moderate as admin
- [ ] **Mobile**: Test responsive design on mobile devices

## 🔧 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   ```bash
   # Check environment variables are set correctly
   # Verify Supabase project is active
   # Check network connectivity
   ```

2. **OAuth Login Fails**
   ```bash
   # Verify redirect URLs in OAuth provider settings
   # Check Supabase auth configuration
   # Ensure HTTPS is used in production
   ```

3. **File Upload Issues**
   ```bash
   # Check Supabase storage bucket policies
   # Verify file size limits
   # Check MIME type restrictions
   ```

4. **Payment Processing Fails**
   ```bash
   # Verify Stripe keys are correct
   # Check webhook endpoint is accessible
   # Test with Stripe test cards
   ```

### Performance Optimization

1. **Image Optimization**
   ```bash
   # Enable Netlify image optimization
   # Configure automatic WebP conversion
   # Set up responsive image loading
   ```

2. **Caching Strategy**
   ```bash
   # Configure Netlify edge caching
   # Set appropriate cache headers
   # Enable service worker for offline support
   ```

## 📊 Monitoring & Analytics

### Setup Monitoring
```bash
# Configure Supabase monitoring
# Set up Netlify analytics
# Enable error tracking
# Monitor Core Web Vitals
```

### Key Metrics to Track
- User registration conversion rate
- Element selection distribution
- Reflection posting frequency
- Community engagement rates
- Payment success rates
- Page load performance

## 🔒 Security Checklist

### Pre-Launch Security Review
- [ ] All environment variables secured
- [ ] Database RLS policies tested
- [ ] File upload restrictions verified
- [ ] Rate limiting configured
- [ ] HTTPS enforced everywhere
- [ ] Content Security Policy set
- [ ] Input validation comprehensive

### Post-Launch Monitoring
- [ ] Monitor failed login attempts
- [ ] Track unusual API usage patterns
- [ ] Review user-generated content
- [ ] Monitor payment fraud indicators

## 📈 Launch Strategy

### Soft Launch (Founder Testing)
1. Deploy to staging environment
2. Founder completes full user journey
3. Fix any critical issues found
4. Performance and security review

### Public Launch
1. Deploy to production domain
2. Enable user registration
3. Monitor system performance
4. Gather user feedback
5. Iterate based on feedback

## 🆘 Emergency Procedures

### Rollback Process
```bash
# In Netlify Dashboard
# Go to Deploys > View all deploys
# Click "Publish deploy" on previous working version
```

### Database Recovery
```bash
# Supabase provides automatic backups
# Contact Supabase support for point-in-time recovery
# Have migration rollback scripts ready
```

### Contact Information
- **Supabase Support**: support@supabase.com
- **Netlify Support**: support@netlify.com  
- **Stripe Support**: support@stripe.com

---

**Deployment Guide Version**: 1.0
**Last Updated**: January 11, 2025
**Next Review**: February 11, 2025