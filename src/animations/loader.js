import gsap from "gsap";

export function siteLoader() {
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
    );
}
