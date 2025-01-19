import {getChordGroups} from "../db/chords";
import {CSSProperties, useContext, useEffect, useState} from "react";
import {ChordGroup, Chord, Key} from "../db/chords";
import {ChordGroupContext, UserChordGroupListContext} from "@/app/home/page";

export default function ChordGroupList() {

  const ulStyle = {
    listStyle: "none",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
  }

  const {userChordGroupList, setUserChordGroupList} = useContext(UserChordGroupListContext);


  useEffect(() => {
    getChordGroups().then((res) => {
      //コードグループを分解
      if (res.chordGroups === undefined) return;

      for (const chordGroup of res.chordGroups) {
        const chordGroupName = chordGroup.name;
        const chords = chordGroup.chords;

        console.log(chordGroupName);
        console.log(chords);
      }


      // chordGroups.forEach((chordGroup) => {
      //   console.log(chordGroup);
      // });
    });
  }, []);

  return (
    <ul style={ulStyle}>
      <li>コード進行1</li>
      <li>コード進行2</li>
      <li>コード進行3</li>
      <li>コード進行4</li>
      <li>コード進行5</li>
    </ul>
  )

}