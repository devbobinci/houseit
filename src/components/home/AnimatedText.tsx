import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

type Props = {
  text: string;
  color: string;
  tabletFontSize: string;
  bold: string;
};

export default function AnimatedTitle({
  text,
  color,
  tabletFontSize,
  bold,
}: Props) {
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 0.75,
        ease: [0.2, 0.65, 0.3, 0.75],
      },
    },
  };

  return (
    <h1
      aria-label={text}
      role="heading"
      className={`text-xl text-${color} font-${bold} w-1/2 drop-shadow-[0_0_3px_lightgray] md:w-1/2 md:${tabletFontSize} xl:text-7xl 3xl:w-2/3 3xl:text-8xl`}
    >
      {text.split(" ").map((word, index) => {
        return (
          <Word
            ref={ref}
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}
          >
            {word.split("").map((character, index) => {
              return (
                <Character
                  aria-hidden="true"
                  key={index}
                  variants={characterAnimation}
                >
                  {character}
                </Character>
              );
            })}
          </Word>
        );
      })}
    </h1>
  );
}
