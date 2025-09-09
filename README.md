# Three.js Particle Animation Website

A personal web framework I built featuring interactive particle animations that spell out text and morph between geometric shapes. Built with Three.js, Next.js, and TypeScript.

## 🌟 **[Live Demo → threejs.duynguy.com](https://threejs.duynguy.com)**

## What This Is

I created this as a portfolio piece and framework for building modern websites with eye-catching 3D animations. The particle system starts by forming letters, then transitions through various shapes like spirals, blockchain networks, and neural networks.

The codebase is set up as a template so you can easily customize the text, shapes, and overall design for your own projects.

## Key Features

- **Interactive Particle System** - Thousands of particles that form text and transition between shapes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Contact Form** - Integrated with SendGrid for email functionality
- **TypeScript** - Fully typed for better development experience
- **Easy Customization** - Change text, colors, and animations with simple config changes

## Getting Started

   ```bash
# Clone the repo
   git clone https://github.com/yudduy/three.js-web.git
   cd three.js-web

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Start development server
cd frontend && npm run dev
```

Open http://localhost:3000 to see it running locally.

## Customizing the Particle Text

The main particle animation is in `frontend/components/particleAnimation.tsx`. To change what text it spells out:

1. Find this line: `const textGeometry = createTextGeometry('DUY', particleCount)`
2. Replace 'DUY' with your text
3. Update the shape type references from 'DUY' to your text

The text generation uses HTML5 Canvas to convert text into particle positions, so it works with any font and most characters.

## Adding New Shapes

Particle shapes are defined in `frontend/components/shapes/particleShapes.ts`. Each shape is a function that returns an array of 3D coordinates:

```typescript
myShape: (particleCount: number, randomValues: Float32Array) => {
  const positions = new Float32Array(particleCount * 3);
  // Your math to position particles
  return positions;
}
```

## Email Setup

The contact form uses SendGrid. You'll need:

1. SendGrid account and API key
2. Environment variables set in your deployment:
   - `SENDGRID_API_KEY`
   - `SENDGRID_VERIFIED_SENDER` 
   - `CONTACT_EMAIL`
   - `FRONTEND_URL`

For testing without email, set `DEMO_MODE=true`.

## Deployment

Optimized for Vercel, but works anywhere that supports Next.js:

```bash
# Build frontend
cd frontend && npm run build

# Deploy to your platform of choice
```

The `vercel.json` config handles the backend API routes automatically on Vercel.

## File Structure

```
├── frontend/                 # Next.js app
│   ├── app/                 # Pages and layout
│   ├── components/          # React components
│   │   ├── particleAnimation.tsx  # Main Three.js animation
│   │   ├── shapes/          # Particle shape definitions
│   │   └── ui/              # UI components
├── backend/                 # API functions
│   └── api/                 # Contact form endpoint
└── vercel.json              # Deployment config
```

## Built With

- **Three.js** - 3D graphics and particle systems
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **SendGrid** - Email delivery
- **GSAP** - Animation tweening

## License

MIT License - feel free to use this for your own projects.

## Questions?

This started as a personal project and grew into something I thought others might find useful. If you run into issues or have questions about the particle system, feel free to open an issue.

The particle animation code is probably the most interesting part - I spent a lot of time getting the text-to-particle conversion and shape morphing to feel smooth and natural.