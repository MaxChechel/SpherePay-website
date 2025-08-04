import { gsap } from "gsap";

export function initTypewriter(
  selector = "[data-typewriter]",
  customPhrases = null,
  options = {}
) {
  // Default phrases
  const defaultPhrases = [
    " money should",
    " your business",
    " the internet",
    " opportunity",
  ];

  const phrases = customPhrases || defaultPhrases;

  const settings = {
    typeSpeed: 0.08,
    deleteSpeed: 0.05,
    pauseTime: 1.5,
    cursor: "_",
    loop: true,
    ...options,
  };

  // Find elements
  const elements = document.querySelectorAll(selector);
  const instances = [];

  elements.forEach((element) => {
    // Check if this element is already initialized
    if (element.dataset.typewriterInitialized) {
      return;
    }

    // Mark element as initialized
    element.dataset.typewriterInitialized = "true";

    // Animation state for each element
    let currentPhraseIndex = 0;
    let isAnimating = false;
    let textSpan, cursorSpan, cursorAnimation;

    function init() {
      // Save and clear existing content
      const existingText = element.textContent.trim();
      element.innerHTML = "";

      // Create spans for text and cursor
      textSpan = document.createElement("span");
      textSpan.className = "typewriter-text";

      cursorSpan = document.createElement("span");
      cursorSpan.className = "typewriter-cursor";
      cursorSpan.textContent = settings.cursor;

      element.appendChild(textSpan);
      element.appendChild(cursorSpan);

      // Set initial space or existing text
      if (existingText) {
        textSpan.textContent = existingText.startsWith(" ")
          ? existingText
          : " " + existingText;
      } else {
        textSpan.textContent = " ";
      }

      // Cursor blinking animation
      cursorAnimation = gsap.to(cursorSpan, {
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      startAnimation();
    }

    // Start animation
    function startAnimation() {
      if (isAnimating) return;
      typePhrase(phrases[currentPhraseIndex]);
    }

    // Phrase typing animation
    function typePhrase(phrase) {
      isAnimating = true;
      const timeline = gsap.timeline();

      // Type characters starting from position 1 (preserve space)
      for (let i = 1; i <= phrase.length; i++) {
        timeline.to(textSpan, {
          duration: settings.typeSpeed,
          onComplete: () => {
            textSpan.textContent = phrase.substring(0, i);
          },
        });
      }

      // Pause after typing completion
      timeline.to({}, { duration: settings.pauseTime });

      // Delete characters (except for last phrase if loop is disabled)
      const isLastPhrase = currentPhraseIndex === phrases.length - 1;
      if (settings.loop || !isLastPhrase) {
        // Delete characters down to space (not including space)
        for (let i = phrase.length; i > 1; i--) {
          timeline.to(textSpan, {
            duration: settings.deleteSpeed,
            onComplete: () => {
              textSpan.textContent = phrase.substring(0, i);
            },
          });
        }

        // Move to next phrase
        timeline.call(() => {
          nextPhrase();
        });
      } else {
        // Stop animation on last phrase
        timeline.call(() => {
          isAnimating = false;
        });
      }
    }

    // Move to next phrase
    function nextPhrase() {
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typePhrase(phrases[currentPhraseIndex]);
    }

    // Control methods
    function stop() {
      isAnimating = false;
      gsap.killTweensOf([textSpan]);
      if (cursorAnimation) {
        cursorAnimation.kill();
      }
    }

    function destroy() {
      stop();
      if (textSpan) textSpan.remove();
      if (cursorSpan) cursorSpan.remove();
      element.dataset.typewriterInitialized = "false";
    }

    // Initialize
    init();

    // Add instance to array
    instances.push({
      element,
      stop,
      destroy,
      textSpan,
      cursorSpan,
    });
  });

  return instances;
}

export default initTypewriter;
