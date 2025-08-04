const coinsTl = gsap.timeline({ paused: true });
const screenTl = gsap.timeline({ paused: true });
gsap.registerPlugin(ScrollTrigger);

// Delay for stagger effect on larger screens for odd indexed cards
const delay = window.innerWidth >= 768 ? 0.5 : 0;

coinsTl
  .from(".coins_anim_track", {
    width: "20%",
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })
  .to(
    ".coins_anim_track",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "<0%"
  )
  .to(
    ".coins_anim_icon",
    {
      rotate: 0,
    },
    "<20%"
  );

ScrollTrigger.create({
  trigger: "[data-animation=coins]",
  start: "top 60%",
  end: "bottom 20%",
  animation: coinsTl,
  once: true,
  toggleActions: "play none none none",
  invalidateOnRefresh: true,
});

screenTl
  .from(".ramp_screen_img", {
    delay: delay,
    bottom: "20%",
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })
  .to(
    ".ramp_screen_img",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "<0%"
  );

ScrollTrigger.create({
  trigger: "[data-animation=screen]",
  start: "top 60%",
  end: "bottom 20%",
  animation: screenTl,
  once: true,
  toggleActions: "play none none none",
  invalidateOnRefresh: true,
});
