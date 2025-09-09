# Setup Guide

Quick guide to get this running on your own domain.

## Demo First

Check out [threejs.duynguy.com](https://threejs.duynguy.com) to see what you're building.

## 5-Minute Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyudduy%2Fthree.js-web)

1. Click the button above
2. Connect your GitHub account
3. Deploy (the contact form won't work yet, but everything else will)

## Getting Email Working

The contact form needs SendGrid to actually send emails. Here's how I set it up:

### SendGrid Setup

1. **Sign up at [sendgrid.com](https://sendgrid.com)** - the free tier works fine
2. **Create an API key**:
   - Settings → API Keys → Create API Key
   - Give it "Full Access" (or just Mail Send if you want to be restrictive)
   - Copy the key (starts with `SG.`)
3. **Verify your email**:
   - Settings → Sender Authentication → Verify a Single Sender
   - Use whatever email you want as the "from" address
   - Check your email for the verification link

### Environment Variables

In your Vercel dashboard, go to Settings → Environment Variables and add:

```
SENDGRID_API_KEY=SG.your_actual_key_here
SENDGRID_VERIFIED_SENDER=noreply@yourdomain.com
CONTACT_EMAIL=your-email@gmail.com
FRONTEND_URL=https://yourdomain.com
```

Then redeploy from the Vercel dashboard.

### Testing

Fill out the contact form on your site. You should get an email at whatever you set `CONTACT_EMAIL` to.

## Customizing

### Change the Text

The particles spell out "DUY" by default. To change it:

1. Open `frontend/components/particleAnimation.tsx`
2. Find: `createTextGeometry('DUY', particleCount)`
3. Replace 'DUY' with whatever you want
4. Also update the type definition in `frontend/components/shapes/particleShapes.ts`

### Change the Final Shape

After the text explodes, it forms the letter "N". To change this:

1. Open `frontend/components/shapes/particleShapes.ts`
2. Look at the `n:` function to see how shapes are defined
3. Create your own shape function using math to position particles
4. Update the animation sequence in `particleAnimation.tsx`

### Colors and Styling

- Colors: `frontend/tailwind.config.js`
- Particle colors: `frontend/components/particleAnimation.tsx` (look for the colors array)
- General styling: Any of the `.tsx` files in `frontend/components/`

## Common Issues

**Contact form not working?**
- Check your environment variables are set correctly
- Make sure your SendGrid sender email is verified
- Look at the Vercel function logs for errors

**Particles not displaying?**
- This uses WebGL, so older browsers might have issues
- Check the browser console for Three.js errors

**Slow performance?**
- Reduce the particle count in `particleAnimation.tsx`
- Try disabling some of the shape transitions

## Development

```bash
git clone https://github.com/yudduy/three.js-web.git
cd three.js-web

# Frontend
cd frontend
npm install
npm run dev

# Backend (for API testing)
cd ../backend
npm install
```

The backend is just serverless functions that run on Vercel, so you don't need to run it locally unless you're modifying the contact form logic.

## Notes

I built this originally for my own site and cleaned it up as a template. The particle system is the core feature - everything else (contact form, navigation, etc.) is pretty standard Next.js stuff.

The math for the particle shapes is in `particleShapes.ts` if you want to understand how it works or add your own shapes.

Feel free to fork it and make it your own. The whole point was to have something more interesting than a typical portfolio site.