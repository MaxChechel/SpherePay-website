const privateDeskHeroTl = gsap.timeline();

privateDeskHeroTl
  .to(".private_graphic_phone", { y: 0, opacity: 1, duration: 0.6 }, 0.4)
  .to(".private_graphic_chat_1", { y: 0, opacity: 1, duration: 0.6 }, "<80%")
  .to(".private_graphic_chat_2", { y: 0, opacity: 1, duration: 0.6 }, "<80%");
