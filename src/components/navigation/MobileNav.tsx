import { useRef } from "react";
import { useDimensions } from "../../hooks/use-dimentions";
import { MenuToggle } from "./MenuToggle";

import { Link } from "react-router-dom";
import { motion as m, useCycle } from "framer-motion";
import "../../styles/mobile-menu.css";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(25px at 255px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const linkItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const LinkItem = [
  { id: 1, text: "Buy", img: "/navigation/buy.png" },
  { id: 2, text: "Sell", img: "/navigation/sell.png" },
];

export const MobileNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <m.div
      className="absolute right-0 md:hidden"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <m.div className="background" variants={sidebar}>
        <m.ul
          variants={variants}
          className="flex h-screen w-full flex-col items-center justify-center gap-6"
        >
          {LinkItem.map((link) => (
            <m.div
              key={link.id}
              variants={linkItemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={`${link.text.toLocaleLowerCase()}`}
                className="flex items-start gap-2 text-lg font-semibold"
                onClick={() => toggleOpen()}
              >
                <m.li>{link.text}</m.li>
                <img src={link.img} alt={link.text} className="h-9" />
              </Link>
            </m.div>
          ))}
        </m.ul>

        <MenuToggle toggle={() => toggleOpen()} />
      </m.div>
    </m.div>
  );
};
