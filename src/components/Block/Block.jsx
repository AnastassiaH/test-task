import Draggable from "react-draggable";
import "./Block.scss";
import { ResizableBox } from "react-resizable";

export const Block = ({
  size,
  position,
  index,
  handleResize,
  handleDelete,
  handleDrag,
  visible,
  layer,
  handleLayers,
}) => {
  const onResize = (_, { size }) => {
    handleResize(index, size);
  };

  const handleStop = (_, data) => {
    handleDrag(index, data);
  };

  const handleClick = () => {
    handleLayers(index);
  };

  return (
    <Draggable
      cancel="span"
      onStop={handleStop}
      onStart={handleClick}
      grid={[25, 25]}
      position={{ x: position.x, y: position.y }}
    >
      <div
        className="wrapper"
        onClick={handleClick}
        style={{ opacity: visible ? "100" : "0", zIndex: layer }}
      >
        <ResizableBox
          width={size?.width || 300}
          height={size?.height || 100}
          handle={<span className="handler" />}
          onResize={onResize}
          ResizeHandleAxis="sw"
        >
          <div className="block">
            <span
              className="blockDelete"
              onClick={() => {
                handleDelete(index);
              }}
            >
              ×
            </span>
            <div className="blockHeader">Title: {index + 1}</div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};
