# Try Another Face (TAF) - Operations Runbook

## 🚀 Deployment Procedures

### Initial Deployment
1. **Supabase Setup**
   ```bash
   # Create new Supabase project
   # Run migration: supabase/migrations/001_initial_schema.sql
   # Set up OAuth providers in Auth settings
   # Create storage buckets: 'media', 'avatars'
   ```

2. **Environment Variables**
   Set in Netlify dashboard:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_test_key
   ```

3. **Netlify Deployment**
   ```bash
   # Connect GitHub repo to Netlify
   # Set build command: npm run build
   # Set publish directory: dist
   # Enable automatic deployments
   ```

### Production Updates
1. **Code Updates**
   ```bash
   git checkout main
   git pull origin main
   # Changes auto-deploy via GitHub Actions
   ```

2. **Database Migrations**
   ```bash
   # Create new migration file in supabase/migrations/
   # Test in staging first
   # Apply to production via Supabase dashboard
   ```

### Rollback Procedures
1. **Application Rollback**
   ```bash
   # Via Netlify dashboard: Deploy > View all deploys > Publish previous deploy
   # Or via CLI: netlify rollback --site-id=your-site-id
   ```

2. **Database Rollback**
   ```bash
   # Manual process - run reverse migration SQL
   # Restore from backup if needed
   # Test thoroughly before applying
   ```

## 🔐 Security Management

### Key Rotation
1. **Supabase Keys**
   ```bash
   # Generate new keys in Supabase project settings
   # Update Netlify environment variables
   # Deploy application with new keys
   # Monitor for authentication issues
   ```

2. **Stripe Keys**
   ```bash
   # Rotate in Stripe dashboard
   # Update environment variables
   # Test payment flows thoroughly
   ```

3. **OAuth Credentials**
   ```bash
   # Update in Google/Facebook developer consoles
   # Update Supabase Auth provider settings
   # Test social login flows
   ```

### Security Monitoring
1. **Access Logs Review** (Weekly)
   - Check Supabase auth logs
   - Monitor failed login attempts
   - Review admin dashboard access

2. **Vulnerability Scanning** (Monthly)
   ```bash
   npm audit
   npm update
   # Check for security advisories
   ```

## 📊 Monitoring & Alerts

### Performance Monitoring
1. **Core Web Vitals**
   - Monitor via Netlify Analytics
   - Target: FCP <2s, LCP <2.5s, CLS <0.1
   - Weekly performance reports

2. **Error Monitoring**
   ```bash
   # Check Netlify function logs
   # Monitor Supabase error logs
   # Review browser console errors
   ```

### Database Health
1. **Daily Checks**
   - Connection pool status
   - Slow query identification
   - Storage usage monitoring

2. **Weekly Reports**
   - User growth metrics
   - Content creation trends
   - Payment transaction summaries

## 🛠️ Troubleshooting Guide

### Common Issues

1. **Authentication Failures**
   ```bash
   # Check Supabase project status
   # Verify OAuth provider configurations
   # Test auth endpoints manually
   # Check environment variables
   ```

2. **Payment Processing Issues**
   ```bash
   # Verify Stripe webhook endpoints
   # Check API key validity
   # Review transaction logs
   # Test payment flow in staging
   ```

3. **File Upload Problems**
   ```bash
   # Check Supabase storage bucket policies
   # Verify file size limits
   # Test upload functionality
   # Review storage usage quotas
   ```

4. **Database Connection Issues**
   ```bash
   # Check Supabase project status
   # Verify connection strings
   # Review RLS policies
   # Check database resource usage
   ```

### Performance Issues
1. **Slow Page Load**
   ```bash
   # Run Lighthouse audit
   # Check bundle size with npm run build -- --analyze
   # Review lazy loading implementation
   # Optimize images and assets
   ```

2. **Database Query Performance**
   ```bash
   # Identify slow queries in Supabase dashboard
   # Add missing indexes
   # Review and optimize complex queries
   # Consider query result caching
   ```

## 📈 Scaling Procedures

### Traffic Surge Preparation
1. **Database Scaling**
   - Upgrade Supabase plan if needed
   - Review connection pool settings
   - Implement query result caching

2. **CDN Optimization**
   - Ensure proper cache headers
   - Optimize static asset delivery
   - Consider additional CDN endpoints

3. **Monitoring Enhancement**
   - Set up additional performance alerts
   - Monitor database connection metrics
   - Track error rates and response times

### User Growth Management
1. **Storage Planning**
   - Monitor media storage usage
   - Plan for increased file uploads
   - Implement storage cleanup policies

2. **Database Optimization**
   - Regular query performance reviews
   - Index optimization
   - Archive old data as needed

## 🚨 Incident Response

### Severity Levels
1. **P0 - Critical** (Response: Immediate)
   - Site completely down
   - Data breach or security incident
   - Payment processing failure

2. **P1 - High** (Response: 1 hour)
   - Major feature broken
   - Performance severely degraded
   - Authentication issues

3. **P2 - Medium** (Response: 4 hours)
   - Minor feature issues
   - UI/UX problems
   - Non-critical integrations down

### Incident Checklist
1. **Immediate Response**
   - [ ] Assess impact and severity
   - [ ] Notify stakeholders
   - [ ] Begin troubleshooting
   - [ ] Document timeline

2. **Resolution**
   - [ ] Implement fix
   - [ ] Test thoroughly
   - [ ] Monitor for recurrence
   - [ ] Communicate resolution

3. **Post-Incident**
   - [ ] Write post-mortem report
   - [ ] Identify root cause
   - [ ] Implement preventive measures
   - [ ] Update documentation

## 🔧 Maintenance Tasks

### Daily
- [ ] Check application status
- [ ] Review error logs
- [ ] Monitor performance metrics

### Weekly
- [ ] Update dependencies
- [ ] Review security alerts
- [ ] Backup verification
- [ ] Performance report review

### Monthly
- [ ] Security audit
- [ ] Database optimization
- [ ] Cost analysis and optimization
- [ ] Documentation updates

## 📞 Emergency Contacts

### Technical Support
- **Supabase Support**: support@supabase.com
- **Netlify Support**: support@netlify.com
- **Stripe Support**: support@stripe.com

### Team Contacts
- **Founder/Product**: [Contact Info]
- **Lead Developer**: [Contact Info]
- **DevOps**: [Contact Info]

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Stripe Documentation](https://stripe.com/docs)
- [React Documentation](https://react.dev)

**Last Updated**: [Current Date]  
**Version**: 1.0  
**Next Review**: [30 days from last update]