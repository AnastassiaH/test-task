import Draggable from "react-draggable";
import styles from "./Block.module.scss";
import { ResizableBox } from "react-resizable";
import { useState } from "react";

export const Block = ({
  size,
  position,
  index,
  handleResize,
  handleDelete,
  handleDragStop,
  visible,
  layer,
  handleLayers,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const onResize = (_, { size }) => {
    handleResize(index, size);
  };

  const handleStop = (_, data) => {
    console.log("stop");
    setIsDragging(false);
    handleDragStop(index, data);
  };

  const handleStart = () => {
    handleLayers(index);
  };

  const handleDrag = () => {
    setIsDragging(true);
  };

  return (
    <Draggable
      cancel="span"
      onStop={handleStop}
      onStart={handleStart}
      onDrag={handleDrag}
      grid={[25, 25]}
      position={{ x: position.x, y: position.y }}
    >
      <div
        className={styles.wrapper}
        onClick={handleStart}
        style={{ opacity: visible ? "100" : "0", zIndex: layer }}
      >
        <ResizableBox
          width={size?.width || 300}
          height={size?.height || 100}
          handle={<span className={styles.handler} />}
          onResize={onResize}
          ResizeHandleAxis="sw"
        >
          <div className={styles.block}>
            <span
              className={styles.blockDelete}
              onClick={() => {
                handleDelete(index);
              }}
            >
              ×
            </span>
            <div
              className={
                isDragging
                  ? `${styles.blockHeaderActive} ${styles.blockHeader}`
                  : styles.blockHeader
              }
            >
              Title: {index + 1}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};
