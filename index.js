const initCounters = (sectionId, counters) => {
  if (!counters.length) return;

  const startCounters = () => {
    counters.forEach(({ id, endVal, suffix }) => {
      const counterAnim = new countUp.CountUp(id, endVal, {
        suffix,
        duration: 2,
      });
      if (!counterAnim.error) {
        counterAnim.start();
      } else {
        console.error(counterAnim.error);
      }
    });
  };

  const section = document.getElementById(sectionId);
  if (section) {
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        startCounters();
        obs.unobserve(section);
      }
    }, { threshold: 0.5 });

    observer.observe(section);
  }
};

initCounters("counters", [
  { id: "activeClient", endVal: 10, suffix: " K" },
]);

initCounters("aboutCounters", [
  { id: "shipmentsDelivered", endVal: 10, suffix: " K" },
  { id: "yearsInLogistics", endVal: 15, suffix: "" },
]);

function handleFormSubmit(formId, popupId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = "block";
        setTimeout(() => {
          popup.style.display = "none";
        }, 3000);
      }
    });
  }
}

handleFormSubmit("contactForm", "popupMessageContact");
handleFormSubmit("newsletterForm", "popupMessageNewsletter");

document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  fadeInElements.forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
});