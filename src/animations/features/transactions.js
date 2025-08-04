gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const pathSvgs = document.querySelectorAll("[data-draw-line]");

pathSvgs.forEach((svg, i) => {
  let delay;

  switch (i) {
    case 0:
      delay = 0.5;
      break;
    case 1:
      delay = 2.5;
      break;
    case 2:
      delay = 3.5;
      break;
    case 3:
      delay = 4.5;
      break;
    case 4:
      delay = 6;
      break;
  }

  const tween = gsap.timeline({
    repeat: -1,
    repeatDelay: 6,
    delay: delay,
  });
  tween
    .fromTo(
      svg,
      { ease: "none", drawSVG: 0, duration: 5 },
      { drawSVG: "0% 100%", ease: "sine.in" }
    )
    .to(svg, { drawSVG: "100% 100%", duration: 1.5 });

  tween.play();
});
