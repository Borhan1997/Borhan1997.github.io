import { motion, useMotionValue } from "motion/react";

// Degrees of rotation added per pixel of horizontal drag.
const ROTATION_PER_PIXEL = 0.8;

const Card = ({ style, text, image, color, containerRef }) => {
  // Resting tilt comes from the `rotate` entry of `style` (e.g. "-8deg").
  const { rotate: restRotate = 0, ...position } = style ?? {};
  const rotate = useMotionValue(parseFloat(restRotate) || 0);

  // Dragging right turns the card clockwise, dragging left turns it
  // counter-clockwise. The angle accumulates and is never reset, so a card
  // can be spun any number of full turns and stays where it is left.
  const handleDrag = (_event, info) => {
    rotate.set(rotate.get() + info.delta.x * ROTATION_PER_PIXEL);
  };

  const dragProps = {
    drag: true,
    dragConstraints: containerRef,
    dragElastic: 1,
    onDrag: handleDrag,
    whileHover: { scale: 1.05 },
    whileDrag: { scale: 1.1, cursor: "grabbing" },
  };

  return image && !text ? (
    <motion.img
      className="absolute w-15 cursor-grab"
      src={image}
      style={{ ...position, rotate }}
      {...dragProps}
    />
  ) : (
    <motion.div
      className="absolute px-1 py-4 text-xl text-center border rounded-full select-none font-extralight w-[12rem] cursor-grab backdrop-blur-sm"
      style={{
        ...position,
        rotate,
        color,
        backgroundColor: color ? `${color}26` : undefined,
        borderColor: color ? `${color}80` : undefined,
      }}
      {...dragProps}
    >
      {text}
    </motion.div>
  );
};

export default Card;
