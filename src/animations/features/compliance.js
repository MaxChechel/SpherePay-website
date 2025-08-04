const complianceTl = gsap.timeline({ paused: true });
gsap.registerPlugin(ScrollTrigger);

complianceTl
  .from(".compliance_anim_img_2", {
    bottom: "-40%",
    right: "-20%",
    duration: 1,
    ease: "power2.out",
  })
  .to(
    ".compliance_anim_img_2",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "<0%"
  )
  .from(
    ".compliance_anim_img_1",
    {
      top: "30%",
      duration: 0.6,
      ease: "power2.out",
    },
    "<40%"
  )
  .to(
    ".compliance_anim_img_1",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "<0%"
  );

ScrollTrigger.create({
  trigger: "[data-animation=compliance]",
  start: "top 60%",
  end: "bottom 20%",
  animation: complianceTl,
  once: true,
  toggleActions: "play none none none",
  invalidateOnRefresh: true,
});
