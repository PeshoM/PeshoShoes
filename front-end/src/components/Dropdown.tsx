import React, { MutableRefObject } from "react";
import { useState, SetStateAction, Dispatch } from "react";

interface Props {
  sizesRef: MutableRefObject<any>
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sizesSet: Set<number>;
  quantityArr: number[][];
}

const DropDown: React.FC<Props> = ({ sizesRef, isOpen, setIsOpen, sizesSet, quantityArr }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  let sizesArr: number[] = [
    34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41,
    41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5,
    49,
  ];

  const handlePickedSize = (size: number) => {
    setSelectedSize(size);
    setIsOpen(false);
    // isOpen func doesn't work for both components simultaniously so maybe context
  }
  return (
    <div>
      <div
        className="flex justify-between"
        style={{ userSelect: "none", cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p style={{ padding: 8, alignSelf: "center" }}>
          {selectedSize ? "EUR " + selectedSize : "Sizes"}
        </p>
        <span
          style={{
            padding: 8,
            alignSelf: "center",
            transform: `rotate(calc(${!isOpen ? "0deg" : "-90deg"}))`,
            fontWeight: "400",
            fontSize: "20px",
          }}
        >
          {"<"}
        </span>
      </div>
      {isOpen ? (
        <div>
          {sizesArr.map((size: number) => (
            <>
              {sizesSet.has(size) ? (
                <div
                  className="paragraph-container"
                  onClick={() => handlePickedSize(size)}
                >
                  <p className="sizes-paragraph">
                    <div className="sizes-nums">EUR {size}</div>
                  </p>
                </div>
              ) : (
                <div
                  ref={sizesRef}
                  className="paragraph-container paragraph-container-out-of-stock"
                >
                  <p className="sizes-paragraph sizes-out-of-stock">
                    <div className="sizes-nums">EUR {size}</div>{" "}
                    <span className="sold-out">Sold out</span>
                  </p>
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DropDown;
