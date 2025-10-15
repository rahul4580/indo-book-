
'use client';
import React, { useState, useEffect, useRef } from 'react';

import SplitText from "./component/SplitText";
import Dock from '../components/Dock';
import TextType from '../components/TextType';
import ScrambledText from '../components/ScrambledText';
import TiltedCard from '../components/TiltedCard';
import VariableProximity from '../components/VariableProximity';
import work from './component/work';
import Services from './component/services';
import LogoLoop from '../components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import FlowingMenu from '../components/FlowingMenu';
import Contact from "./Contact";
import Footer from "./component/footer";






 function Home() {
  const [count, setCount] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const containerRef = useRef(null);
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  useEffect(() => {
    // Counter animation from 1 to 100 over 4 seconds
    const duration = 100; // 4 seconds
    const steps = 100;
    const stepTime = duration / steps;

    let currentCount = 0;
    const counterInterval = setInterval(() => {
      currentCount += 1;
      setCount(currentCount);

      if (currentCount >= 100) {
        clearInterval(counterInterval);
        // Wait a moment at 100, then fade out
        setTimeout(() => {
          setIntroComplete(true);
        }, 500);
      }
    }, stepTime);

    return () => clearInterval(counterInterval);
  }, []);

//  const items = [

//     // { icon: <Home size={18} />, label: 'Home', onClick: () => alert('Home!') },
//     { icon: <About size={1} />, label: 'Archive', onClick: () => alert('Archive!') },
//     // { icon: <works size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
//     // { icon: <services size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
//   ];

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

const demoItems = [
  { link: '#', text: 'Minimalist', image: 'https://images.unsplash.com/photo-1759310706618-4790c72d50af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWluaW1hbGlzdCUyMGphcGFuZXNlJTIwc29tZXRoaWdufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { link: '#', text: 'CLEANEST', image: 'https://imgs.search.brave.com/uOf7rdroWuDawR1iysCcV6BYuvXTGkGOgpdkRZAf3MQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9tZWV4Y2hhbmdl/LmNvbS9ibG9nL2Nv/bnRlbnQvaW1hZ2Vz/LzIwMjMvMDkvdG9r/eW8tY2xlYW5lc3Qt/Y2l0eS1pbi10aGUt/d29ybGQucG5n' },
  { link: '#', text: 'MODERN', image: 'https://plus.unsplash.com/premium_photo-1682621097202-eca012076ff2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TU9ERVJOfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { link: '#', text: 'SLEEK', image: 'https://plus.unsplash.com/premium_photo-1683120938105-20cfb831bba6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fE1PREVSTnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600' }
];






  return (
    <div className="relative w-full min-h-screen bg-white text-black overflow-hidden">
      {/* Opening Animation Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-opacity duration-1000 ${introComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        {/* Center - Rotating Circle Design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Multiple rotating circles */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Outer rotating circle */}
            <div
              className="absolute inset-0 border-2 border-black rounded-full"
              style={{
                animation: 'rotate 4s linear infinite',
                clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
              }}
            />

            {/* Middle rotating circle - opposite direction */}
            <div
              className="absolute inset-8 border-2 border-black rounded-full"
              style={{
                animation: 'rotateReverse 3s linear infinite',
                clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)'
              }}
            />

            {/* Inner pulsing circles */}
            <div
              className="absolute inset-16 border border-black rounded-full"
              style={{
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />

            {/* Center expanding circle based on count */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black rounded-full transition-all duration-100"
              style={{
                width: `${count * 1.5}px`,
                height: `${count * 1.5}px`,
                opacity: 1 - count / 200
              }}
            />

            {/* Rotating segments */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-black origin-left"
                style={{
                  transform: `rotate(${angle}deg)`,
                  animation: `rotate ${4 + i * 0.5}s linear infinite`,
                  opacity: 0.3
                }}
              />
            ))}

            {/* Center text */}
            <div className="relative z-10 text-center">
              <div className="text-2xl font-bold tracking-tighter text-black mb-2">
                SYNERGY
              </div>
              <div className="w-16 h-px bg-black mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tighter text-black">
                SCALABILITY
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left Corner - Counter */}
        <div className="absolute bottom-8 left-8 z-20">
          <div className="flex items-end gap-4">
            <div
              className="text-8xl md:text-9xl font-bold leading-none tracking-tighter text-black"
              style={{
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {count}
            </div>
            <div className="pb-4">
              <div className="text-sm tracking-[0.2em] uppercase text-black/60 mb-1">
                Loading
              </div>
              <div className="w-24 h-1 bg-black/10 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-75"
                  style={{
                    width: `${count}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-black/20" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-black/20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-black/20" />
      </div>

     
      <div className={`transition-opacity duration-1000 p-6 pl-6 m-4 absolute   ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <SplitText
          text={`RAY`}
          className="text-1xl font-bold scale-y-125 text-center leading-tight absolute  font-bebas-neue"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        /><br />
        <SplitText
          text={`RAINSCRIPT`}
          className="text-0.6xl font-bold scale-y-125 text-center leading-tight"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        
      </div>
   
<div className="bg-[rgba(128,128,128,0.3)] ml-[10vw] mt-[15vh] text-black" style={{ width: '70vw', height: '30vh' }}>
  <div className='w-30 h-110 absolute ml-[56vw] mt-[-4vh]' style={{ backgroundColor: 'rgba(27, 27, 27, 0.63)' }}></div>
  <div className='w-60 h-80 absolute ml-[59vw] mt-[4vh]' style={{ backgroundColor: 'rgba(128,128,128,0.3)' }}>
  {/* 
    The main issue with the original code is that the surrounding <div> does not have any defined CSS width/height, 
    so the img's '100%' sizing will not work as expected. Additionally, the img tag has inline styles, 
    which could alternatively be done with Tailwind classes for consistency. 
    Here's a more idiomatic Next.js/React way, using Tailwind for styling.
  */}
  <img
    src="https://sdmntprwestus.oaiusercontent.com/files/00000000-1e80-6230-b609-1999971e7105/raw?se=2025-10-15T07%3A47%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=52933cec-0302-5d5e-90d7-88caa52dca4c&skoid=b7fc319f-b93c-4fac-ba5f-14fdc3f9209f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-14T20%3A31%3A49Z&ske=2025-10-15T20%3A31%3A49Z&sks=b&skv=2024-08-04&sig=qBr6VyvVCTv4wZ3VVw7i8fSrJRBuFK6NaXkmY6euonc%3D" alt="Sample" className="w-full h-full object-cover rounded-xl" style={{ minHeight: 0, minWidth: 0 }} draggable={true} />
  
  </div>
  
  <h1 className="text-9xl w-70 h-40 font-bold">
  <TextType 
  text={["CREATIVE DESIGNER " , "FULL STACK DEVELOPER ", "DATA ANALYST "]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
  </h1>
</div>
 
 <div className="  p-8 s flex justify-center items-center mx-auto my-8" style={{ marginTop: '20%', maxWidth: '600px', minHeight: '150px', width: '85vw' }}>
   <h1 className="text-gray-500 text-lg md:text-xl font-semibold text-center leading-snug">
     I’M EXPERIENCED WEB AND UX/UI DESIGNER, WHO DESIGN MEMORABLE WEB EXPERIENCES FOR BRANDS OF ALL SIZES
   </h1>
 </div>
 
<h1 className="text-1xl ml-10 text-gray-500 font-bold ">FOR WORK, THIS IS MY E-MAIL:</h1>
<p className="ml-30">kumararahul795@gmail.com</p>




 
 
  <div style={{ display: 'flex', marginTop: '10vh', justifyContent: 'center', alignItems: 'center' }}>
    {work()}
  </div>

   
 <div >

  <ScrambledText
  className="scrambled-text-demo"
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars=".:" >
  I VALUE CLARITY, MEANING, AND FUNCTIONALITY — IN BOTH DESIGN AND LIFE. I BELIEVE IN CONSCIOUS MINIMALISM: KEEPING ONLY WHAT TRULY MATTERS AND DELIVERS RESULTS. I LOVE SIMPLE DESIGNS WITH DEEP MEANING, AND SIMPLE THINGS THAT BRING REAL JOY
</ScrambledText>
 </div>


<div style={{ position: 'relative', left: '60vw' }}>
<TiltedCard
  imageSrc="https://sdmntprwestus.oaiusercontent.com/files/00000000-1e80-6230-b609-1999971e7105/raw?se=2025-10-15T07%3A47%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=52933cec-0302-5d5e-90d7-88caa52dca4c&skoid=b7fc319f-b93c-4fac-ba5f-14fdc3f9209f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-14T20%3A31%3A49Z&ske=2025-10-15T20%3A31%3A49Z&sks=b&skv=2024-08-04&sig=qBr6VyvVCTv4wZ3VVw7i8fSrJRBuFK6NaXkmY6euonc%3D"
  altText="rahul kumar"
  captionText="rahul kumar"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="500px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}
  overlayContent={
    <p className="tilted-card-demo-text">
      {/* Kendrick Lamar - GNX */}
    </p>
  }
/>
</div>



<div
  ref={containerRef}
  style={{ position: 'relative', width: '600px', height: '100px', marginLeft:'120px', marginTop:'-150px' }}
>
  <VariableProximity
    label={'VALUE STRUCTURE, PERFORMANCE, AND CLARITY. AS A MERN STACK DEVELOPER, I AIM TO BUILD SOLUTIONS THAT NOT ONLY WORK — BUT MAKE SENSE. I BELIEVE TRUE DESIGN LIES IN SIMPLICITY AND TRUE DEVELOPMENT IN PURPOSE.'}
    className={'variable-proximity-demo'}
    fromFontVariationSettings="'wght' 400, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={100}
    falloff="linear"
    style={{ fontSize: '1rem' }} // Make font big
  />
</div>


   <div style={{ height: "3px", width: "80vw", background: "black", marginTop:"100px", marginLeft:"110px" }}></div>

<h1
  style={{
    fontSize: '7rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.002em',
    color: 'black',
    marginLeft: '110px',
    marginTop: '40px',
  }}
>
services
</h1>
 


<div style={{ width: "100%", height: "70vh" }}>
  <Services />
</div>



<div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>



<div style={{
  color: '#777',
  textTransform: 'uppercase',
  fontSize: '1.2rem',
  marginLeft: '6vw',
  fontWeight: 600,
  lineHeight: 1.25,
  letterSpacing: '0.05em',
  marginTop: "30px"
}}>
  <div>Developing an engaging platform for seamless communication.</div>
  <div>Designed to enhance real-time interaction and maximize talk time efficiency.</div>
  <div>Focused on providing a smooth, intuitive user experience.</div>
</div>



<div style={{ height: '600px', position: 'relative',  }}>
  <FlowingMenu items={demoItems} />
</div>

<h1
  style={{
    fontSize: '7rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.002em',
    color: 'black',
    marginLeft: '710px',
    marginTop: '40px',
  }}
>
CONTACT
</h1>

   <div style={{ width: "100%", minHeight: "500px", marginTop: "40px", display: 'flex', justifyContent: 'center' }}>
    <Contact/>
   </div>

   <Footer />


   {/* this is nav bar this should be in the end for avoid that animation lage */}
  <Dock 
    items={[
      // { icon: <About size={18} />, label: 'Archive', onClick: () => alert('Archive!') },

      { 
        icon: <span className="material-icons" style={{ color: 'black' }}>
        <img src="https://imgs.search.brave.com/WcTyu1-KqcMl0xVJz_Pxb1Q0CYX9SqRsy0NlFTTA8BA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9ob21lLWlj/b24tc3ZnLWRvd25s/b2FkLXBuZy01Mzg0/ODIyLnBuZz9mPXdl/YnAmdz0xMjg" alt="Home" style={{ width: 24, height: 24, display: 'inline-block', verticalAlign: 'middle' }} />
        </span>, 
        label: 'Home', 
        onClick: () => {
          const homeSection = document.getElementById('home-section');
          if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      { 
        icon: <span className="material-icons" style={{ color: 'black' }}>

          <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/work-icon-svg-download-png-2426664.png?f=webp&w=128" alt="Contact" style={{ width: 24, height: 24, display: 'inline-block', verticalAlign: 'middle' }} />
        </span>, 
        label: 'work', 
        onClick: () => window.location.href = '/work'
      },
      { 
        icon: <span className="material-icons" style={{  color: 'black' }}>
          <img src="https://imgs.search.brave.com/40XXo9kBVsLtYhkp0dxvBPQ1WLQOCXtN55ObHPIyEbU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9zZXJ2aWNl/LWljb24tc3ZnLWRv/d25sb2FkLXBuZy04/MTcyMzQ3LnBuZz9m/PXdlYnAmdz0xMjg" alt="services" style={{ width: 24, height: 24, display: 'inline-block', verticalAlign: 'middle' }} />

        </span>, 
        label: 'services', 
        onClick: () => alert('services!') 
      },
      { 
        icon: <span className="material-icons" style={{  color: 'black' }}>
          <img src="https://imgs.search.brave.com/_Tp03l0fCr2084FkWqhT1VS1qR5skrGyZkBNQOoGV0s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9jb250YWN0/LWljb24tc3ZnLWRv/d25sb2FkLXBuZy0z/NDYyMTMwLnBuZz9m/PXdlYnAmdz0xMjg" alt="contact " style={{ width: 24, height: 24, display: 'inline-block', verticalAlign: 'middle' }} />

        </span>, 
        label: 'contact ', 
        onClick: () => alert('contact !') 
      },
      
    ]}
    panelHeight={68}
    baseItemSize={50}
    magnification={70}
  />
   
    </div>
  );
}


export default Home;
