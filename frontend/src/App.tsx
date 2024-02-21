import { CSSProperties, ReactNode } from "react";
import { createContext, useState } from "react";
import "./App.css";
import ResizableCard from "./components/ResizableCard";
import { SizeType } from "./hooks/useResize";

export type BoxDataType = {
  styles?: CSSProperties;
  size: SizeType;
  content: ReactNode;
};

export type CardConfigType = { [key: string]: BoxDataType };

export const SharedSizeContext = createContext<{
  cardSizes: CardConfigType;
  updateCardSize: (id: keyof CardConfigType, newSize: SizeType) => void;
}>({
  cardSizes: {}, // Empty object as default
  updateCardSize: () => {}, // Empty function as default
});

function App() {
  const [cardConfigs, setCardConfigs] = useState<CardConfigType>({
    card1: { size: { height: 400, width: 600 }, content: "Card 1" },
    card2: { size: { height: 400, width: 600 }, content: "Card 2" },
    card3: { size: { height: 300, width: 700 }, content: "Card 3" },
  });

  const getDelta = (
    prevSize: SizeType,
    newSize: SizeType
  ): { type: "height" | "width" | "both" | "none"; value: number } => {
    let type: "height" | "width" | "both" | "none" = "none";
    let value = 0;
    const diffInBoth = {
      height: newSize.height - prevSize.height,
      width: newSize.width - prevSize.width,
    };
    // both implementation is undone
    if (diffInBoth.height !== 0) {
      type = "height";
      value = diffInBoth.height;
    } else if (diffInBoth.width !== 0) {
      type = "width";
      value = diffInBoth.width;
    }

    return { type, value };
  };
  const updateCardConfig = (
    prevConfig: CardConfigType,
    id: keyof CardConfigType,
    newSize: SizeType
  ): CardConfigType => {
    const newConfig = {
      ...prevConfig,
      [id]: { ...prevConfig[id], size: newSize },
    };
    const delta = getDelta(prevConfig[id].size, newSize);
    // logic to update other related cards
    if (id === "card1") {
      if (delta.type === "height") {
        newConfig.card3.size.height = newConfig.card3.size.height - delta.value;
        newConfig.card2.size.height = newConfig.card2.size.height + delta.value;
      }
      if (delta.type === "width") {
        newConfig.card2.size.width = newConfig.card2.size.width - delta.value;
      }
    }
    if (id === "card2") {
      if (delta.type === "height") {
        newConfig.card3.size.height = newConfig.card3.size.height - delta.value;
        newConfig.card1.size.height = newConfig.card1.size.height + delta.value;
      }
      if (delta.type === "width") {
        newConfig.card1.size.width = newConfig.card1.size.width - delta.value;
      }
    }
    if (id === "card2") {
      if (delta.type === "height") {
        newConfig.card2.size.height = newConfig.card3.size.height - delta.value;
        newConfig.card1.size.height = newConfig.card1.size.height - delta.value;
      }
    }
    return newConfig;
  };

  const updateCardSize = (id: keyof CardConfigType, newSize: SizeType) => {
    // Update shared state with new size for the specific card
    setCardConfigs((prevSizes) => updateCardConfig(prevSizes, id, newSize));
  };

  return (
    <SharedSizeContext.Provider
      value={{ cardSizes: cardConfigs, updateCardSize }}
    >
      <main>
        <ResizableCard id="card1" cardConfig={cardConfigs.card1} />
        <ResizableCard id="card2" cardConfig={cardConfigs.card2} />
        <ResizableCard id="card3" cardConfig={cardConfigs.card3} />
      </main>
    </SharedSizeContext.Provider>
  );
}

export default App;
