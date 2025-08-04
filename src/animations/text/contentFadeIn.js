document.fonts.ready.then(() => {
  const contetnFadeIn = document.querySelectorAll("[data-content-fade-in]");

  contetnFadeIn.forEach((element) => {
    const eyebrow = element.querySelector(".eyebrow_text");
    const h2 = element.querySelector("h2");
    const p = element.querySelector("p");
    const buttons = element.querySelectorAll(".button_main_wrap");

    const splitH2 = new SplitText(h2, {
      type: "lines",
      linesClass: "content_text_line",
    });
    const splitP = new SplitText(p, {
      type: "lines",
      linesClass: "content_text_line",
    });

    gsap.set([h2, p], { opacity: 1 });

    const contentRevealTl = gsap.timeline({ paused: true });

    contentRevealTl
      .to(eyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        splitH2.lines,
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
        buttons,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.025 },
        },
        "<25%"
      );

    ScrollTrigger.create({
      trigger: element,
      start: "top 70%",
      end: "bottom 20%",
      animation: contentRevealTl,
      once: true,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
    });
  });
});
