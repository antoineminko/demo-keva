import {
  About,
  Contact,
  Experience,
  FeaturedProjects,
  Hero,
  Layout,
  Projects,
  Skills,
} from '@/containers';
import WaveSeparator from '@/components/ui/WaveSeparator';

const Home = () => {
  return (
    <>
      <div className="relative">
        <Hero />
        {/* Wave from Hero (Dark) to About (White) */}
        <WaveSeparator
          className="absolute bottom-0 left-0 w-full z-20"
          gradientColors={['#00000000', '#ffffff']}
        />
      </div>

      {/* About Section - White Background */}
      <div className="relative pt-0">
        <About />
        {/* Wave from About (White) to Experience (Dark) */}
        <WaveSeparator
          className="absolute bottom-0 left-0 w-full z-20"
          gradientColors={['#ffffff', '#0a192f']} // Assuming dark bg below
        />
      </div>

      {/* Rest of the content - Dark Theme */}
      {/* Experience Section */}
      <div className="mx-auto px-6 sm:px-8 md:px-28 lg:px-20 xl:px-0 max-w-screen-lg py-20">
        <Experience />
      </div>

      {/* Projects Section - Full Width Background */}
      <div className="relative w-full py-20">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center z-0"
          style={{ backgroundImage: "url('https://i.pinimg.com/1200x/76/7d/fe/767dfe3ee463af7fb9bacb564da74773.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/80 z-0"></div>

        <div className="mx-auto px-6 sm:px-8 md:px-28 lg:px-20 xl:px-0 max-w-screen-lg relative z-10">
          <FeaturedProjects />
          <Projects />
        </div>

        {/* Wave from Projects (Dark) to Contact (White) */}
        <WaveSeparator
          className="absolute bottom-0 left-0 w-full z-20 translate-y-1/2"
          gradientColors={['#00000000', '#ffffff']}
        />
      </div>

      {/* Contact Section - White Background with Green Pill */}
      <div className="w-full bg-white relative z-20 pb-20 sm:pb-32 pt-20">
        <div className="mx-auto px-6 sm:px-8 md:px-28 lg:px-20 xl:px-0 max-w-screen-lg py-12">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Home;
