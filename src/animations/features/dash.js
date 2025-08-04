const dashTl1 = gsap.timeline({ paused: true });
const dashTl2 = gsap.timeline({ paused: true });
gsap.registerPlugin(ScrollTrigger);

// Delay for stagger effect on larger screens for odd indexed cards
const delay = window.innerWidth >= 768 ? 0.5 : 0;

dashTl1
  .from(".dash_feature_img_1", {
    left: "-35%",
    width: "100%",
    duration: 1,
    ease: "power2.out",
  })
  .to(
    ".dash_feature_img_1",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "<0%"
  );

ScrollTrigger.create({
  trigger: "[data-animation=dash-1]",
  start: "top 60%",
  end: "bottom 20%",
  animation: dashTl1,
  once: true,
  toggleActions: "play none none none",
  invalidateOnRefresh: true,
});

dashTl2
  .from(".dash_feature_img_2", {
    delay: delay,
    bottom: "-35%",
    width: "120%",
    duration: 1,
    ease: "power2.out",
  })
  .to(
    ".dash_feature_img_2",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "<0%"
  );

ScrollTrigger.create({
  trigger: "[data-animation=dash-2]",
  start: "top 60%",
  end: "bottom 20%",
  animation: dashTl2,
  once: true,
  toggleActions: "play none none none",
  invalidateOnRefresh: true,
});
