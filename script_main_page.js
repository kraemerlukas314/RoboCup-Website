document.addEventListener("DOMContentLoaded", () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const h1Elements = document.querySelectorAll("h1");

  h1Elements.forEach(h1Element => {
    const textToAnimate = h1Element.dataset.value;
    let interval = null;

    h1Element.addEventListener("mouseover", () => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
        h1Element.textContent = textToAnimate
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return textToAnimate[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= textToAnimate.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    });

    h1Element.addEventListener("mouseout", () => {
      clearInterval(interval);
      h1Element.textContent = textToAnimate;
    });
  });
});
