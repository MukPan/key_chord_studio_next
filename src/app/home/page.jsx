"use client";
import React from "react";
import { useState, useRef, createContext } from "react";
import Header from "../../utils/components/Header";
import PianoContext from "../../utils/components/pianoContents/PianoContext";

export const LinedDistsContext = createContext({});
export const KeySelectedContext = createContext({});
export const KeyTempSelectedContext = createContext({});
export const SortChordArrContext = createContext({});


export default function Home() {
  document.oncontextmenu = () => false; //右クリック禁止

  const [linedDistsArr, setLinedDistsArr ] = useState({}); //dist参照用連想配列
  const [sortChordArr, setSortChordArr] = useState([]); //ソート用キー配列、上に与える
  const [isSelectedArr, setIsSelectedArr] = useState([]); //本
  const [isTempSelectedArr, setIsTempSelectedArr] = useState([]); //仮


  return (
    <>
      <SortChordArrContext.Provider value={{sortChordArr, setSortChordArr}}>
        <KeySelectedContext.Provider value={{isSelectedArr, setIsSelectedArr}}>
          <KeyTempSelectedContext.Provider value={{isTempSelectedArr, setIsTempSelectedArr}}>
            <LinedDistsContext.Provider value={{linedDistsArr, setLinedDistsArr}}>
              <Header/>
              <PianoContext/>
            </LinedDistsContext.Provider>
          </KeyTempSelectedContext.Provider>
        </KeySelectedContext.Provider>
      </SortChordArrContext.Provider>
    </>
  )
}