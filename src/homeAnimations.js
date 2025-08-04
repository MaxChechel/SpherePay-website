import { homeLoader } from "./animations/loader";
import { featuresCards } from "./animations/homeFeatures";
import { initTypewriter } from "./animations/text/typewriter.js";
import { initFadeInChars } from "./animations/text/fadeInChars.js";
homeLoader();
setTimeout(() => {
  initTypewriter();
}, 2000);
featuresCards();
initFadeInChars();
