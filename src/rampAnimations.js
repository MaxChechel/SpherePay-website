const rampHeroTl = gsap.timeline({});
rampHeroTl
  .to(".ramp_hero_img_1", { delay: 0.5, opacity: 1, duration: 0.6 }, "<20%")
  .to(".ramp_hero_img_1", { opacity: 0, duration: 0.6 }, 2)
  .to(".ramp_hero_img_2", { opacity: 1, duration: 0.6 }, 2)
  .to(".ramp_hero_img_1", { opacity: 1, duration: 0.6 }, 3.5)
  .to(".ramp_hero_img_2", { opacity: 0, duration: 0.6 }, 3.5);
