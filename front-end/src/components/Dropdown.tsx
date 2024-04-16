import React from "react";
import { useState } from "react";

const DropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sizesSet, setSizesSet] = useState<Set<number>>(new Set<number>());

  let sizesArr: number[] = [
    34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41,
    41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5,
    49,
  ];
  return (
    <>
      <div
        className="flex justify-between"
        style={{ userSelect: "none" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p style={{ padding: 8, alignSelf: "center" }}>Sizes </p>
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
          {sizesArr.map((size, index) => (
            <>
              {sizesSet.has(size) ? (
                <div className="paragraph-container">
                  <p className="sizes-paragraph">
                    <div className="sizes-nums">{size}</div>
                  </p>
                </div>
              ) : (
                <div className="paragraph-container paragraph-container-out-of-stock">
                  <p className="sizes-paragraph sizes-out-of-stock">
                    <div className="sizes-nums">{size}</div>{" "}
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
    </>
  );
};

export default DropDown;
