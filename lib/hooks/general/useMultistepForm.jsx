import { useState } from 'react';

export const useMultiStepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleScrollToTop = () => {
    const wrapperShellElement = document.querySelector(
      '[class^="MainHeader-shell"]'
    );

    if (wrapperShellElement) {
      wrapperShellElement.scrollIntoView({ behavior: 'smooth' });
      wrapperShellElement.scrollTo(0, 0);
    }
  };

  const next = () => {
    setCurrentStepIndex((index) => {
      if (index > steps.length - 1) return index;
      return index + 1;
    });
    handleScrollToTop();
  };

  const prev = () => {
    setCurrentStepIndex((index) => {
      if (index <= 0) return index;
      return index - 1;
    });
    handleScrollToTop();
  };

  const goTo = (index) => {
    setCurrentStepIndex(index);
    handleScrollToTop();
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    prev,
    steps,
  };
};
