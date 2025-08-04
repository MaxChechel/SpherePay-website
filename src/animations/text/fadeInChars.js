gsap.registerPlugin(SplitText, ScrollTrigger);

export function initFadeInChars() {
  const elements = document.querySelectorAll("[data-fade-chars]");

  if (!elements.length) return;
  document.fonts.ready.then(() => {
    elements.forEach((element) => {
      const splitText = new SplitText(element, {
        type: "words,chars",
        charsClass: "char",
      });

      gsap.set(splitText.chars, {
        opacity: 0.3,
      });

      const charsTl = gsap.timeline();
      charsTl.to(splitText.chars, {
        opacity: 1,
        duration: 0.8,
        stagger: { each: 0.05, from: "start" },
        ease: "power2.out",
      });
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        end: "top 35%",
        scrub: 1.2,
        animation: charsTl,
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFadeInChars();
});
