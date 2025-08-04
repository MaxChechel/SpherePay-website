gsap.registerPlugin(SplitText, ScrollTrigger);

document.fonts.ready.then(() => {
  if (!document.querySelector("[data-hero-animation]")) return;

  const splitH1 = new SplitText("[data-hero-animation] h1", {
    type: "lines",
    linesClass: "hero_text_line",
  });
  const splitP = new SplitText("[data-hero-animation] p", {
    type: "lines",
    linesClass: "hero_text_line",
  });

  gsap.set("[data-hero-animation] :is(h1, p)", { opacity: 1 });

  const heroRevealTl = gsap.timeline();

  heroRevealTl
    .to("[data-hero-animation] .eyebrow_text", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(
      splitH1.lines,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: { each: 0.05 },
      },
      "<25%"
    )
    .to(
      splitP.lines,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: { each: 0.05 },
      },
      "<35%"
    )
    .to(
      "[data-hero-animation] .button_main_wrap",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.025 },
      },
      "<25%"
    );
});
