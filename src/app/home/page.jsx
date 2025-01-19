"use client";
import React from "react";
import { useState, useRef, createContext } from "react";
import Header from "../../utils/components/Header";
import PianoContext from "../../utils/components/pianoContents/PianoContext";

export const LinedDistsContext = createContext({});
export const KeySelectedContext = createContext({});
export const KeyTempSelectedContext = createContext({});
export const SortChordArrContext = createContext({});
export const ChordGroupContext = createContext({});
export const UserChordGroupListContext = createContext({});
export const NowEditChordGroupIdContext = createContext({});

export default function Home() {
  document.oncontextmenu = () => false; //右クリック禁止

  const [linedDistsArr, setLinedDistsArr ] = useState({}); //dist参照用連想配列
  const [sortChordArr, setSortChordArr] = useState([]); //ソート用キー配列、上に与える
  const [isSelectedArr, setIsSelectedArr] = useState([]); //本
  const [isTempSelectedArr, setIsTempSelectedArr] = useState([]); //仮
  // {"C": [0,0,0]}のようなオブジェクトを格納する配列
  const [chordGroup, setChordGroup] = useState([]);
  const [userChordGroupList, setUserChordGroupList] = useState([]);
  const [nowEditChordGroupId, setNowEditChordGroupId] = useState(-1);

  return (
    <>
      <SortChordArrContext.Provider value={{sortChordArr, setSortChordArr}}>
        <KeySelectedContext.Provider value={{isSelectedArr, setIsSelectedArr}}>
          <KeyTempSelectedContext.Provider value={{isTempSelectedArr, setIsTempSelectedArr}}>
            <LinedDistsContext.Provider value={{linedDistsArr, setLinedDistsArr}}>
              <ChordGroupContext.Provider value={{chordGroup, setChordGroup}}>
                <UserChordGroupListContext.Provider value={{userChordGroupList, setUserChordGroupList}}>
                  <NowEditChordGroupIdContext.Provider value={{nowEditChordGroupId, setNowEditChordGroupId}}>
                    <Header />
                    <PianoContext />
                  </NowEditChordGroupIdContext.Provider>
                </UserChordGroupListContext.Provider>
              </ChordGroupContext.Provider>
            </LinedDistsContext.Provider>
          </KeyTempSelectedContext.Provider>
        </KeySelectedContext.Provider>
      </SortChordArrContext.Provider>
    </>
  )
}
