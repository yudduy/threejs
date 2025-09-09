# Three.js Website Template

A beautiful, modern website template built with Three.js, Next.js, and Tailwind CSS. Features stunning particle animations, smooth transitions, and a working contact form powered by SendGrid.

## 🌟 [**Live Demo**](https://threejs-website-template-demo.vercel.app)

See the template in action before you use it! The demo includes all animations and a working contact form (in demo mode).

## ✨ Features

- **Interactive 3D Animations**: Beautiful particle systems and geometric shapes using Three.js
- **Modern Design**: Clean, minimalist interface with smooth animations and hover effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Contact Form**: Fully functional contact form with SendGrid email integration
- **Performance Optimized**: Server-side rendering with Next.js for fast loading times
- **Type Safe**: Built with TypeScript for better development experience
- **Easy Customization**: Well-structured code that's easy to modify and extend

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- SendGrid account (for contact form functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yudduy/three.js-web.git
   cd three.js-web
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend  
   npm install
   ```

3. **Set up environment variables**
   
   For Vercel deployment, you'll need to set these environment variables in your Vercel dashboard:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `SENDGRID_VERIFIED_SENDER`: Your verified sender email address
   - `CONTACT_EMAIL`: Email address where contact form submissions will be sent
   - `FRONTEND_URL`: Your website's URL (e.g., https://yourdomain.com)

4. **Run the development server**
   ```bash
   cd frontend
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your website.

## 📧 Setting Up SendGrid

1. **Create a SendGrid account** at [sendgrid.com](https://sendgrid.com)

2. **Generate an API key**:
   - Go to Settings > API Keys
   - Create a new API key with "Full Access" permissions
   - Copy the API key for later use

3. **Verify your sender email**:
   - Go to Settings > Sender Authentication
   - Verify a single sender email address
   - This will be used as the "from" address for contact form emails

4. **Configure environment variables** in your deployment platform with the values from steps 2 and 3

## 🎨 Customization

### Changing the Content

**Main Headline and Text**:
Edit `frontend/app/page.tsx`:
```tsx
<TypingAnimation text="Your Custom Headline" />
<ScrambleText 
  text="Your custom description text here." 
  settings={{ speed: 1.5 }} 
  className="mt-4 text-lg font-semibold text-gray-400" 
/>
```

**SEO and Metadata**:
Update `frontend/app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
  // ... other metadata
}
```

### Customizing the Animations

**Particle Colors and Behavior**:
Modify `frontend/components/particleAnimation.tsx` to change:
- Particle colors and materials
- Animation speed and patterns  
- Camera movements and transitions

**Page Transitions**:
Edit the Framer Motion animations in `frontend/app/page.tsx` to customize:
- Fade-in timing
- Hover effects
- Component transitions

### Styling Changes

**Colors and Typography**:
The project uses Tailwind CSS. Update `frontend/tailwind.config.js` to customize:
- Color palette
- Fonts
- Spacing and sizing

**Layout and Components**:
All components are in `frontend/components/` and can be easily modified or replaced.

## 🏗️ Project Structure

```
three.js-website-template/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── page.tsx         # Main homepage
│   │   ├── layout.tsx       # Root layout and metadata
│   │   └── global.css       # Global styles
│   ├── components/          # Reusable UI components
│   │   ├── ContactForm.tsx  # Contact form modal
│   │   ├── navbar.tsx       # Navigation component
│   │   ├── particleAnimation.tsx # Three.js animations
│   │   └── ui/              # UI component library
│   └── package.json         # Frontend dependencies
├── backend/                 # Serverless backend functions
│   ├── api/                 # API endpoints
│   │   └── contact.ts       # Contact form handler
│   └── package.json         # Backend dependencies
├── vercel.json              # Vercel deployment configuration
└── README.md               # This file
```

## 🚀 Deployment

This template is optimized for deployment on Vercel, but can be deployed anywhere that supports Next.js.

### Quick Deploy (Demo Mode)

For a quick demo without SendGrid setup:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyudduy%2Fthree.js-website-template&env=DEMO_MODE&envDescription=Set%20to%20true%20for%20demo%20mode&envLink=https%3A%2F%2Fgithub.com%2Fyudduy%2Fthree.js-website-template%23demo-mode)

Just set `DEMO_MODE=true` and the contact form will simulate sending emails without requiring SendGrid.

### Full Production Deployment

1. **Connect your repository** to Vercel
2. **Set environment variables** in your Vercel dashboard:
   - `SENDGRID_API_KEY`
   - `SENDGRID_VERIFIED_SENDER` 
   - `CONTACT_EMAIL`
   - `FRONTEND_URL`
   - `DEMO_MODE=false` (or leave unset)
3. **Deploy** - Vercel will automatically build and deploy your site

### Other Platforms

For other platforms like Netlify, AWS, or traditional hosting:
- Build the frontend: `cd frontend && npm run build`
- The backend API routes may need to be adapted depending on your hosting platform
- Ensure environment variables are properly configured

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework with server-side rendering
- **[Three.js](https://threejs.org/)** - 3D graphics library for particle animations
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library for React
- **[SendGrid](https://sendgrid.com/)** - Email delivery service
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features  
- Submit pull requests
- Improve documentation

## ⭐ Support

If you found this template helpful, please consider giving it a star on GitHub!

---

**Happy coding!** 🚀

*This template was created to help developers quickly build beautiful, modern websites with Three.js animations and all the essential features needed for a professional web presence.*