gsap.registerPlugin(ScrollTrigger);

export function featuresCards() {
  const cards = document.querySelectorAll(".home_features_item");

  cards.forEach((card, index) => {
    const tl = gsap.timeline({ paused: true });

    // Delay for stagger effect on larger screens for odd indexed cards
    const delay = window.innerWidth >= 768 && index % 2 === 1 ? 0.5 : 0;

    // Shared animation for all cards headers
    tl.fromTo(
      card.querySelectorAll(".home_features_item_content > *"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: { each: 0.05 },
        delay: delay,
      }
    );

    // Individual animations for each card based on index
    switch (index) {
      case 0: // Developer Toolkit
        tl.to(
          card.querySelector(".home_features_toolkit_img"),
          { y: 0, opacity: 1, duration: 0.6 },
          "<20%"
        );
        break;

      case 1: // Dashboard
        tl.to(
          card.querySelector(".home_features_dash_img"),
          { y: 0, opacity: 1, duration: 0.6 },
          "<20%"
        );
        break;

      case 2: // Private Desk
        tl.to(
          card.querySelector(".private_graphic_phone"),
          { y: 0, opacity: 1, duration: 0.6 },
          "<20%"
        )
          .to(
            card.querySelector(".private_graphic_chat_1"),
            { y: 0, opacity: 1, duration: 0.6 },
            "<80%"
          )
          .to(
            card.querySelector(".private_graphic_chat_2"),
            { y: 0, opacity: 1, duration: 0.6 },
            "<80%"
          );
        break;

      case 3: // Embedded Ramp
        tl.to(
          card.querySelector(".home_features_ramp_img"),
          { y: 0, opacity: 1, duration: 0.6 },
          "<20%"
        )
          .to(
            card.querySelector(".home_features_ramp_img"),
            { opacity: 0, duration: 0.6 },
            2
          )
          .to(
            card.querySelector(".home_features_ramp_img_abs"),
            { opacity: 1, duration: 0.6 },
            2
          )
          .to(
            card.querySelector(".home_features_ramp_img"),
            { opacity: 1, duration: 0.6 },
            3.5
          )
          .to(
            card.querySelector(".home_features_ramp_img_abs"),
            { opacity: 0, duration: 0.6 },
            3.5
          );
        break;
    }

    // ScrollTrigger for each card
    ScrollTrigger.create({
      trigger: card,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => tl.play(),
    });
  });
}
