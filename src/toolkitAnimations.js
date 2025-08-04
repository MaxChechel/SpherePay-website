const toolkitHeroTl = gsap.timeline();

gsap.set(".api_hero_img", { opacity: 1 });

toolkitHeroTl.from(".api_hero_img", {
  top: "40%",
  left: "40%",
  scale: 0,
  opacity: 0,
  duration: 1.5,
  ease: "circ.out",
  stagger: { each: 0.075, from: "random" },
});
