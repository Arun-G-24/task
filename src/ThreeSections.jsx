import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollSections.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      letters,
      {
        x: () => window.innerWidth, // start completely outside right
        y: (i) => (i % 2 === 0 ? -80 : 80), // snaky top/bottom
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        ease: "power3.out",
        stagger: 0.1, // one by one
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true, // progress-based
        },
      }
    );
  }, []);

  const text = "Welcome to Scroll Animation 🚀";

  return (
    <div>
      {/* Section 1 */}
      <section className="section section-1">
        <h1>Section 1</h1>
      </section>

      {/* Section 2 */}
      <section className="section section-2">
        <h1 ref={textRef} className="scroll-text">
          {text.split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </h1>
      </section>

      {/* Section 3 */}
      <section className="section section-3">
        <h1>Section 3</h1>
      </section>
    </div>
  );
}