import { useEffect, useState } from "react";
import { Block } from "../../components/Block/Block";
import styles from "./Desktop.module.scss";
import { HomeButton } from "../../components/HomeButton";

export const Desktop = () => {
  const [blocks, setBlocks] = useState([1, 2, 3, 4, 5]);
  const [sizes, setSizes] = useState(
    blocks.map(() => ({ width: 300, height: 100 }))
  );
  const [positions, setPositions] = useState(
    blocks.map(() => ({ x: 0, y: 0 }))
  );

  const [layers, setLayers] = useState(blocks.map((_, i) => i + 1));
  const [isLoading, setIsLoading] = useState(true);
  const columnsNum = Math.floor(window.innerWidth / 300);

  useEffect(() => {
    setIsLoading(true);
    const prevBlocks = localStorage.getItem("prevBlocks");

    if (prevBlocks) {
      setBlocks(JSON.parse(prevBlocks));
    }

    const prevPositions = localStorage.getItem("prevPositions");

    if (prevPositions) {
      setPositions(JSON.parse(prevPositions));
    }

    const prevSizes = localStorage.getItem("prevSizes");

    if (prevSizes) {
      setSizes(JSON.parse(prevSizes));
    }

    const prevLayers = localStorage.getItem("prevLayers");

    if (prevLayers) {
      setLayers(JSON.parse(prevLayers));
    }

    setIsLoading(false);
  }, []);

  const handleResize = (index, size) => {
    const newSizes = sizes.map((el, idx) => {
      if (idx === index) {
        return { width: size.width, height: size.height };
      }
      return el;
    });
    setSizes(newSizes);
    localStorage.setItem("prevSizes", JSON.stringify(newSizes));
  };

  const handleDragStop = (index, data) => {
    const newPositions = positions.map((el, idx) => {
      if (idx === index) {
        return { x: data.x, y: data.y };
      }
      return el;
    });
    setPositions(newPositions);
    localStorage.setItem("prevPositions", JSON.stringify(newPositions));
  };

  const handleDelete = (index) => {
    const newBlocks = blocks.map((block, idx) =>
      idx === index ? null : block
    );
    setBlocks(newBlocks);
    localStorage.setItem("prevBlocks", JSON.stringify(newBlocks));
  };

  const handleReset = () => {
    localStorage.removeItem("prevPositions");
    localStorage.removeItem("prevSizes");
    localStorage.removeItem("prevBlocks");
    localStorage.removeItem("prevLayers");
    setSizes([, , , , ,].fill({ width: 300, height: 100 }, 0, 5));
    setPositions([, , , , ,].fill({ x: 0, y: 0 }, 0, 5));
    setBlocks([1, 2, 3, 4, 5]);
    setLayers([1, 2, 3, 4, 5]);
  };

  const handleLayers = (index) => {
    const currLayer = layers[index];
    const newLayers = layers.map((layer, idx) => {
      if (idx === index) return 5;
      if (layer > currLayer) return layer - 1;
      return layer;
    });

    setLayers(newLayers);
    localStorage.setItem("prevLayers", JSON.stringify(newLayers));
  };

  if (isLoading) {
    return;
  }

  return (
    <div className={styles.desktop}>
      <HomeButton />
      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
      <div
        className={styles.blocks}
        style={{ gridTemplateColumns: `repeat(${columnsNum}, 300px)` }}
      >
        {blocks.map((block, index) => (
          <Block
            handleResize={handleResize}
            handleDelete={handleDelete}
            size={sizes[index]}
            position={positions[index]}
            key={index}
            index={index}
            handleDragStop={handleDragStop}
            visible={!!block}
            layer={layers[index]}
            handleLayers={handleLayers}
          />
        ))}
      </div>
    </div>
  );
};
