import { CSSProperties } from "react";
import { createContext, useState } from "react";
import "./App.css";
import ResizableCard from "./components/ResizableCard";
import { SizeType } from "./hooks/useResize";

export type BoxDataType = {
  styles?: CSSProperties;
  size: SizeType;
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
    card1: { size: { height: 300, width: 300 } },
    card2: { size: { height: 300, width: 300 } },
    card3: { size: { height: 300, width: 300 } },
  });

  const updateCardSize = (id: keyof CardConfigType, newSize: SizeType) => {
    // Update shared state with new size for the specific card
    setCardConfigs((prevSizes) => ({
      ...prevSizes,
      [id]: { ...prevSizes[id].styles, size: newSize },
    }));
  };

  return (
    <SharedSizeContext.Provider
      value={{ cardSizes: cardConfigs, updateCardSize }}
    >
      <main>
        <ResizableCard id="card1" text="HEY" cardConfig={cardConfigs.card1} />
        <ResizableCard id="card2" text="HEY" cardConfig={cardConfigs.card2} />
        <ResizableCard id="card3" text="HEY" cardConfig={cardConfigs.card3} />
      </main>
    </SharedSizeContext.Provider>
  );
}

export default App;
