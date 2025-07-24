import { gsap } from "gsap";

// Единственная функция для SpherePaytypewriter
export function initTypewriter(
  selector = "[data-typewriter]",
  customPhrases = null,
  options = {}
) {
  // Фразы по умолчанию
  const defaultPhrases = [
    " money should",
    " your business",
    " the internet",
    " opportunity",
  ];

  // Используем переданные фразы или дефолтные
  const phrases = customPhrases || defaultPhrases;

  // Настройки по умолчанию
  const settings = {
    typeSpeed: 0.08,
    deleteSpeed: 0.05,
    pauseTime: 1.5,
    cursor: "_",
    loop: true,
    ...options,
  };

  // Находим элементы
  const elements = document.querySelectorAll(selector);
  const instances = [];

  elements.forEach((element) => {
    // Проверяем, не инициализован ли уже этот элемент
    if (element.dataset.typewriterInitialized) {
      return;
    }

    // Отмечаем элемент как инициализированный
    element.dataset.typewriterInitialized = "true";

    // Состояние анимации для каждого элемента
    let currentPhraseIndex = 0;
    let isAnimating = false;
    let textSpan, cursorSpan, cursorAnimation;

    // Инициализация DOM элементов
    function init() {
      // Сохраняем и очищаем существующий контент
      const existingText = element.textContent.trim();
      element.innerHTML = "";

      // Создаем spans для текста и курсора
      textSpan = document.createElement("span");
      textSpan.className = "typewriter-text";

      cursorSpan = document.createElement("span");
      cursorSpan.className = "typewriter-cursor";
      cursorSpan.textContent = settings.cursor;

      element.appendChild(textSpan);
      element.appendChild(cursorSpan);

      // Устанавливаем начальный пробел или существующий текст
      if (existingText) {
        textSpan.textContent = existingText.startsWith(" ")
          ? existingText
          : " " + existingText;
      } else {
        textSpan.textContent = " ";
      }

      // Анимация мигания курсора
      cursorAnimation = gsap.to(cursorSpan, {
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      startAnimation();
    }

    // Начало анимации
    function startAnimation() {
      if (isAnimating) return;
      typePhrase(phrases[currentPhraseIndex]);
    }

    // Анимация печати фразы
    function typePhrase(phrase) {
      isAnimating = true;
      const timeline = gsap.timeline();

      // Печатаем символы начиная с позиции 1 (сохраняем пробел)
      for (let i = 1; i <= phrase.length; i++) {
        timeline.to(textSpan, {
          duration: settings.typeSpeed,
          onComplete: () => {
            textSpan.textContent = phrase.substring(0, i);
          },
        });
      }

      // Пауза после завершения печати
      timeline.to({}, { duration: settings.pauseTime });

      // Удаляем символы (кроме последней фразы, если loop отключен)
      const isLastPhrase = currentPhraseIndex === phrases.length - 1;
      if (settings.loop || !isLastPhrase) {
        // Удаляем символы до пробела (не включая пробел)
        for (let i = phrase.length; i > 1; i--) {
          timeline.to(textSpan, {
            duration: settings.deleteSpeed,
            onComplete: () => {
              textSpan.textContent = phrase.substring(0, i);
            },
          });
        }

        // Переходим к следующей фразе
        timeline.call(() => {
          nextPhrase();
        });
      } else {
        // Останавливаем анимацию на последней фразе
        timeline.call(() => {
          isAnimating = false;
        });
      }
    }

    // Переход к следующей фразе
    function nextPhrase() {
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typePhrase(phrases[currentPhraseIndex]);
    }

    // Методы управления
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

    // Инициализируем
    init();

    // Добавляем экземпляр в массив
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

// УБИРАЕМ автоинициализацию - теперь она будет только в homeAnimations.js
// document.addEventListener("DOMContentLoaded", () => {
//   initTypewriter();
// });

export default initTypewriter;
