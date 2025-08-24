import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollSections.css";


gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll(".letter");

    //.outer for make changes
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current, 
        start: "center 80%",       
        end: "top 2%",         
        scrub: true,             
        markers: true              
      },
    });

    //.letters from right 
    tl.fromTo(
      letters,
      {
        x: () => window.innerWidth,     
        y: (i) => (i % 2 === 0 ? -50 : 50), 
        opacity: 0,                    
        scale: 0.1                      
      },
      //.center
      {
        x: 0,       
        y: 0,
        opacity: 10, 
        scale: 1,   
        stagger: 0.01, 
        duration: 0.58
      }
    )
    //.letters from center to left
    .to(letters, {
      x: () => -window.innerWidth, 
      y: 0,
      opacity: 9,                  
      scale: 0.5,                 
      stagger: 0.01,
      duration: 0.58,
      ease: "power2.in"
    });

    
  }, []);

  const text = "This is my task";

  return (
    <div>
      {/* Section 1 */}
      <section className="section section-1">
        <div className="section-content">
          <h5>Section 1</h5>
          <h1>Welcome you sir</h1>
        </div>
      </section>

      {/* Section 2: scroll animation */}
      <section className="section section-2">
        <div className="text-container">
          <h1 ref={textRef} className="scroll-text">
            {text.split("").map((char, i) => (
              <span key={i} className="letter">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Section 3 */}
      <section className="section section-3">
        <div className="section-content">
          <h5>Section 3</h5>
          <h1>Thank you for view</h1>
        </div>
      </section>
    </div>
  );
}
