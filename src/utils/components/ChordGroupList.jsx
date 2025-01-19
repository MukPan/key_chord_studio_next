import {getChordGroups} from "../db/chords";
import {CSSProperties, useContext, useEffect, useState} from "react";
import {
  ChordGroupContext,
  KeySelectedContext,
  KeyTempSelectedContext,
  UserChordGroupListContext
} from "../../app/home/page";
import Image from "next/image";
import {addToDisplay} from "../func/addToDisplay";

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

  const iconStyle = {
    width: "30px",
    height: "30px",
    // marginRight: "10px",
    float: "left",
    backgroundColor: "#e8e8e8",
    borderRadius: "20%",
    padding: "5px",
    marginTop: "3px",
    marginRight: "10px",
  }

  const chordGroupNameStyle = {
    float: "left",
  }

  const {userChordGroupList, setUserChordGroupList} = useContext(UserChordGroupListContext);
  const {chordGroup, setChordGroup} = useContext(ChordGroupContext);
  const { isTempSelectedArr, setIsTempSelectedArr} = useContext(KeyTempSelectedContext); //仮
  const { isSelectedArr, setIsSelectedArr } = useContext(KeySelectedContext);


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



  //コード進行編集
  const editChordGroup = (chordGroup) => {
    //クラス"popup-overlay"を取得して#popup:checkedを外す
    const popupCheckbox = document.getElementById('popup');
    popupCheckbox.checked = false;

    const chordGroupId = chordGroup.id;
    const chords = chordGroup.chords;

    // console.log(chordGroup.id);
    // console.log(chordGroup.chords);

    //コード読み込み
    chordGroup.chords.forEach((chord) => {
      console.log(chord);
      addToDisplay(
        chord,
        setChordGroup,
        isTempSelectedArr,
        setIsTempSelectedArr,
        isSelectedArr,
        setIsSelectedArr
      );
    });





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
          <li style={liStyle}>
            {/*左*/}
            <div>
              {/*編集アイコン*/}
              <Image
                width={20}
                height={20}
                src="/image/edit.png"
                alt="読み込み"
                style={iconStyle}
                onClick={() => editChordGroup(chordGroup)}
              />
              {/*コード進行名*/}
              <div style={chordGroupNameStyle}>{chordGroup.name}</div>
            </div>
            {/*右*/}
            <div style={previewStyle}>{chordNamesPreview}</div>
          </li>
        )
      })}
    </ul>
  )

}