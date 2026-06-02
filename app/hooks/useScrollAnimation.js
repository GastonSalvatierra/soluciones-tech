import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useParallax(ref, depth = 0.3) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * depth,
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [depth]);
}

export function useScrollFadeIn(ref, delay = 0) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay]);
}

export function useScrollRotation(ref, rotationX = 15, rotationY = -10) {
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.to(ref.current, {
      rotationX,
      rotationY,
      y: 50,
      opacity: 0.5,
      duration: 1,
    });

    return () => {
      tl.kill();
    };
  }, [rotationX, rotationY]);
}
