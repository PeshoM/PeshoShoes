import React, { MutableRefObject } from "react";
import { useState, SetStateAction, Dispatch } from "react";

interface Props {
  outOfStockRef: MutableRefObject<any>
  sizesRef: MutableRefObject<any>
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sizesSet: Set<number>;
  quantityArr: number[][];
}

const DropDown: React.FC<Props> = ({ outOfStockRef, sizesRef, isOpen, setIsOpen, sizesSet, quantityArr }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const sizesArr: number[] = Array.from({ length: 31 },(_, index) => 34 + index * 0.5);
  
  const handlePickedSize = (size: number) => {
    setSelectedSize(size);
    setIsOpen(false)
  }

  return (
    <div>
      <div
        ref={sizesRef}
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
                  onClick={() => {handlePickedSize(size)}}
                >
                  <p className="sizes-paragraph">
                    <div className="sizes-nums">EUR {size}</div>
                  </p>
                </div>
              ) : (
                <div
                  ref={outOfStockRef}
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
