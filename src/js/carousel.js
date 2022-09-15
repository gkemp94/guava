document.querySelectorAll(".carousel").forEach((carouselEl) => {
  const scrollPane = carouselEl.querySelector(".carousel__slides");
  const slides = carouselEl.querySelectorAll(".carousel__slide");
  const next = carouselEl.querySelector(".carousel__next");
  const previous = carouselEl.querySelector(".carousel__previous");
  const pagination = carouselEl.querySelector(".carousel__pagination");

  // Current State
  let current = 0;

  // Create Listener Functions
  const handleScroll = () => {
    const active = Math.round(scrollPane.scrollLeft / scrollPane.clientWidth);

    if (active === current) {
      return;
    }

    slides[current].toggleAttribute("inert", true);
    pagination.children[current].setAttribute("aria-selected", false);

    slides[current].toggleAttribute("inert", false);
    pagination.children[active].setAttribute("aria-selected", true);

    next.toggleAttribute("disabled", active === slides.length - 1);
    previous.toggleAttribute("disabled", active === 0);

    current = active;
  };

  const goTo = (number) => {
    scrollPane.scrollTo(number * scrollPane.clientWidth, 0);
  };

  const handleNext = () => {
    goTo(Math.min(slides.length, current + 1));
  };

  const handlePrevious = () => {
    goTo(Math.max(0, current - 1));
  };

  const handlePagination = ({ target }) => {
    if (target.classList.contains(".carousel__pagination")) return;
    target.setAttribute("aria-selected", true);
    goTo(target.dataset.index);
  };

  const handleKeyPress = (e) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const newSlide = e.key === 'ArrowRight' ? Math.min(slides.length, current + 1) : Math.max(0, current - 1);
    goTo(newSlide);
    if (e.target.closest('.carousel__pagination')) {
      pagination.children[newSlide].focus();
    }
  }

  // Add Event Listeners
  scrollPane.addEventListener("scroll", handleScroll, { passive: true });
  next.addEventListener("click", handleNext);
  previous.addEventListener("click", handlePrevious);
  pagination.addEventListener("click", handlePagination);
  carouselEl.addEventListener("keydown", handleKeyPress);
});
