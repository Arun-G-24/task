import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollSections.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  const textRef = useRef(null);
  const section2Ref = useRef(null);

  useEffect(() => {
    if (!textRef.current || !section2Ref.current) return;

    const ctx = gsap.context(() => {
      const letters = textRef.current.querySelectorAll(".letter");

      // Initial state
      gsap.set(textRef.current, { x: () => window.innerWidth });
      gsap.set(letters, {
        y: (i) => (i % 2 === 0 ? -80 : 80),
        opacity: 0,
      });

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "center 40%",       // start when section hits center
          end: "+=400%",             // 🔥 big scroll distance = very slow
          scrub: true,        
          pin: true,                
          markers: true,            
          invalidateOnRefresh: true,
        },
      });

      tl.to(textRef.current, {
        x: () => window.innerWidth * 0.2,
        ease: "none",
      })
        .to(
          letters,
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "power3.out",
          },
          "<"
        )
        .to(textRef.current, {
          x: 0,
          ease: "power2.out",
        })
        .to(textRef.current, {
          x: () => -window.innerWidth,
          ease: "power2.in",
        });
    }, section2Ref);

    return () => ctx.revert();
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

      {/* Section 2 */}
      <section ref={section2Ref} className="section section-2">
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
