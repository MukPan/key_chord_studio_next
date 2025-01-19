import {getChordGroupFromRes, getChordGroups} from "../db/chords";
import {CSSProperties, useContext, useEffect, useState} from "react";
import {ChordGroupContext, UserChordGroupListContext} from "../../app/home/page";

export default function ChordGroupList() {

  const ulStyle = {
    listStyle: "none",
    padding: "0 15px",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    width: "100%",
    //スクロール
    overflowY: "scroll",
    height: "500px",
  }

  const {userChordGroupList, setUserChordGroupList} = useContext(UserChordGroupListContext);


  useEffect(() => {
    getChordGroups().then((res) => {
      //コードグループリストを新規作成
      const newChordGroupList = res.chordGroups;
      setUserChordGroupList((prev) => [...newChordGroupList])
      // chordGroups.forEach((chordGroup) => {
      //   console.log(chordGroup);
      // });
    });
  }, []);

  const liStyle = {
    margin: "10px",
    padding: "10px",
    //横棒
    borderBottom: "1px solid #ccc",
    width: "100%",
    //コンテンツを左右に
    display: "flex",
    justifyContent: "space-between",
  }

  const previewStyle = {
    fontSize: "30px",
    color: "#666",
  }


  return (
    <ul style={ulStyle}>
      {userChordGroupList.map((chordGroup) => {
        // chordGroup.chordsのnameを先頭から3つ取得
        let chordNamesPreview = chordGroup.chords.map((chord) => {
          return chord.name;
        }).slice(0, 3).join(", ");

        //20文字以上の場合、2つに減らす
        if (chordNamesPreview.length > 20) {
          chordNamesPreview = chordNamesPreview.split(", ").slice(0, 2).join(", ");
        }

        //chordNamesPreviewが3つ以上ある場合は、最後に"..."を追加
        if (chordGroup.chords.length > 3 || chordNamesPreview.length > 20) {
          chordNamesPreview += "..."
        }

        return (
          <li key={chordGroup.id} style={liStyle}>
            <div>{chordGroup.name}</div>
            <div style={previewStyle}>{chordNamesPreview}</div>
          </li>
        )
      })}
    </ul>
  )

}