export function homeLoader() {
  gsap.registerPlugin(SplitText);
  document.fonts.ready.then(() => {
    let splitWords = SplitText.create("h1", { type: "words" });

    // only run once per tab session
    if (sessionStorage.getItem("homeLoaderRun")) {
      gsap.set(".loader_component", { height: 0, opacity: 0 });
      return;
    }
    sessionStorage.setItem("homeLoaderRun", "1");

    const loaderTl = gsap.timeline({});

    loaderTl
      .to(".loader_component", {
        height: "100%",
        duration: 1,
        ease: "power2.out",
      })
      .to(
        ".loader_stripe.is-1",
        {
          height: "100%",
          duration: 1.4,
          ease: "power4.inOut",
        },
        "<30%"
      )
      .to(
        ".loader_stripe.is-2",
        {
          height: "100%",
          duration: 0.8,
          ease: "power4.out",
        },
        "<70%"
      )
      .to(
        ".loader_stripe.is-3",
        {
          height: "100%",
          duration: 0.8,
          ease: "power4.out",
        },
        "<50%"
      )
      .to(
        ".loader_component",
        {
          opacity: 0,
          duration: 2,
          pointerEvents: "none",
          ease: "power2.out",
        },
        "<60%"
      )
      .from(
        splitWords.words,
        {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "power2.out",
          stagger: {
            each: 0.05,
            from: "start",
          },
        },
        "<10%"
      )
      .from(
        ".u-section.is-home-hero p",
        {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "power2.out",
        },
        "<30%"
      )
      .from(
        ".u-section.is-home-hero .button_main_wrap",
        {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "power2.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        },
        "<20%"
      );
  });
}
