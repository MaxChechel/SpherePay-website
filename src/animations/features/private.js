const detailsTl = gsap.timeline({ paused: true });
const chatTl = gsap.timeline({ paused: true });
gsap.registerPlugin(ScrollTrigger);

// Delay for stagger effect on larger screens for odd indexed cards
const delay = window.innerWidth >= 768 ? 0.5 : 0;

detailsTl.to(".details_anim_img", {
  bottom: "-35%",
  opacity: 1,
  duration: 1,
  ease: "power2.out",
});

ScrollTrigger.create({
  trigger: "[data-animation=details]",
  start: "top 60%",
  end: "bottom 20%",
  animation: detailsTl,
  once: true,
  toggleActions: "play none none none",
});

chatTl
  .to(".social_anim_bg", {
    delay: delay,
    top: "37%",
    opacity: 1,
    duration: 1,
    ease: "power2.out",
  })
  .to(
    ".social_anim_icon",
    {
      bottom: "-5%",
      opacity: 1,
      duration: 0.6,
      stagger: { each: 0.05 },
    },
    "<0%"
  );

ScrollTrigger.create({
  trigger: "[data-animation=chat]",
  start: "top 60%",
  end: "bottom 20%",
  animation: chatTl,
  once: true,
  toggleActions: "play none none none",
  invalidateOnRefresh: true,
});
