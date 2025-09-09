# Setup Guide

This guide will help you get your Three.js website template up and running quickly.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fthree.js-website-template)

## 📧 SendGrid Setup (Required for Contact Form)

### Step 1: Create SendGrid Account
1. Go to [sendgrid.com](https://sendgrid.com) and sign up for a free account
2. Complete the account verification process

### Step 2: Generate API Key
1. Log into your SendGrid dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Choose **Full Access** (or create a restricted key with Mail Send permissions)
5. Give it a name like "Website Contact Form"
6. Copy the API key (you won't see it again!)

### Step 3: Verify Sender Email
1. Navigate to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill out the form with your email address (this will be the "from" address)
4. Check your email and click the verification link

### Step 4: Set Environment Variables

In your Vercel dashboard (or hosting platform), set these environment variables:

```bash
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_VERIFIED_SENDER=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

## 🎨 Customization Checklist

After deployment, customize these elements to make it your own:

### Content
- [ ] Update main headline in `frontend/app/page.tsx`
- [ ] Change description text in `frontend/app/page.tsx` 
- [ ] Update contact form button text
- [ ] Modify SEO metadata in `frontend/app/layout.tsx`

### Branding
- [ ] Replace placeholder logo references
- [ ] Update social media links in structured data
- [ ] Change color scheme in `frontend/tailwind.config.js`
- [ ] Add your own favicon and og-image

### Contact Form
- [ ] Test the contact form after SendGrid setup
- [ ] Customize success/error messages
- [ ] Adjust email template in `backend/api/contact.ts`

## 🧪 Testing Your Setup

### 1. Check the Website Loads
- Visit your deployed URL
- Verify all animations work smoothly
- Test on mobile devices

### 2. Test Contact Form
- Fill out and submit the contact form
- Check that you receive the email at your `CONTACT_EMAIL`
- Verify the email content looks correct

### 3. Performance Check
- Run a Lighthouse audit
- Check Core Web Vitals
- Test loading speed

## 🚨 Troubleshooting

### Contact Form Not Working
1. **Check environment variables** - Make sure all SendGrid variables are set correctly
2. **Verify sender email** - Ensure your sender email is verified in SendGrid
3. **Check API key permissions** - API key needs Mail Send permissions
4. **Look at browser console** - Check for JavaScript errors
5. **Check Vercel function logs** - Look for backend errors in Vercel dashboard

### Website Not Loading
1. **Check build logs** - Look for build errors in Vercel
2. **Verify dependencies** - Make sure all npm packages installed correctly
3. **Check file paths** - Ensure all imports are correct

### Performance Issues
1. **Optimize images** - Compress any custom images you add
2. **Check Three.js complexity** - Reduce particle count if needed
3. **Monitor bundle size** - Remove unused dependencies

## 📞 Getting Help

If you run into issues:

1. **Check the documentation** - Read through README.md thoroughly
2. **Search existing issues** - Look at the GitHub repository issues
3. **Create a new issue** - Provide detailed information about your problem
4. **Join the community** - Connect with other users for help

## 🎯 Next Steps

Once everything is working:

1. **Add Google Analytics** - Track your website visitors
2. **Set up monitoring** - Use tools like Vercel Analytics
3. **Optimize for SEO** - Add more metadata and structured data
4. **Add more pages** - Expand beyond the single page template
5. **Customize animations** - Make the Three.js animations unique to your brand

---

**Need more help?** Check out the main [README.md](README.md) or create an issue on GitHub.
