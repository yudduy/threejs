import { Navbar } from '@/components/navbar';
import { Stats } from '@/components/stats';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { TypingAnimation } from '@/components/typing-animation';
import { FadeIn } from '@/components/fade-in';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="space-bg">
        <div className="stars" />
        <div className="grid-bg" />
      </div>
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 min-h-screen flex items-center justify-center text-center relative">
        <div className="max-w-2xl">
          <TypingAnimation text="The Future is within Chaewon." />
          <FadeIn delay={2}>
            <p className="text-lg text-white/60 mb-8 max-w-lg mx-auto mt-6">
              Exclusive early-stage fund for college students.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 transition-transform hover:scale-105">
                Get started →
              </Button>
              <Button 
                variant="outline" 
                className="border-white/10 text-white hover:bg-white/5 backdrop-blur-sm transition-transform hover:scale-105"
              >
                Learn more
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-24">
        <FadeIn>
          <Stats />
        </FadeIn>
        <FadeIn delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            We believe in{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              hungry, relentless, and lucky
            </span>
          </h2>
          <p className="text-center text-white/60 max-w-3xl mx-auto text-lg">
            college students in building the next generation of startups
          </p>
        </FadeIn>
      </section>

      <Footer />
      <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-gradient-to-t from-white to-transparent opacity-10 pointer-events-none" />
    </div>
  )
}
