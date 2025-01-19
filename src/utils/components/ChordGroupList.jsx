import {delChordGroup, delChordGroupFromDb, getChordGroups} from "../db/chords";
import {CSSProperties, useContext, useEffect, useState} from "react";
import {
  ChordGroupContext,
  KeySelectedContext,
  KeyTempSelectedContext, NowEditChordGroupIdContext, UpdateDbContext,
  UserChordGroupListContext
} from "../../app/home/page";
import Image from "next/image";
import {addAllToDisplay} from "../func/addAllToDisplay";

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
    fontSize: "24px",
    marginTop: "5px",
    color: "#818181",
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
  const { nowEditChordGroupId, setNowEditChordGroupId } = useContext(NowEditChordGroupIdContext);
  const { updateDb, setUpdateDb } = useContext(UpdateDbContext);

  useEffect(() => {
    getChordGroups().then((res) => {
      //コードグループリストを新規作成
      const newChordGroupList = res.chordGroups;
      setUserChordGroupList((prev) => [...newChordGroupList])
      console.log(newChordGroupList);
      // chordGroups.forEach((chordGroup) => {
      //   console.log(chordGroup);
      // });
    });
  }, [updateDb]);



  //コード進行編集
  const editChordGroup = (chordGroup) => {
    //クラス"popup-overlay"を取得して#popup:checkedを外す
    const popupCheckbox = document.getElementById('popup');
    popupCheckbox.checked = false;

    const chordGroupId = chordGroup.id;
    const chords = chordGroup.chords;

    //編集中コードグループとして登録
    setNowEditChordGroupId(() => chordGroupId);

    // console.log(chordGroup.id);
    // console.log(chordGroup.chords);

    //Dummy以外のディスプレイのコードを全て削除
    const linedChords = document.getElementById("lined-chords");
    //親要素のid="dummy"以外の子要素を全て削除
    while (linedChords.firstChild.id !== "dummy") {
      linedChords.removeChild(linedChords.firstChild);
    }
    //コードグループをリセット
    setIsTempSelectedArr([]);
    setIsSelectedArr([]);
    setChordGroup([]);


    //コード読み込み
    chordGroup.chords.forEach((chord) => {
      console.log(chord);
      //全てのコードをディスプレイに追加
      addAllToDisplay(
        chord,
        setChordGroup,
        isTempSelectedArr,
        setIsTempSelectedArr,
        isSelectedArr,
        setIsSelectedArr
      );
    });

    //テキストボックスを編集中コードグループ名に変更
    const chordGroupName = document.getElementById("chordGroupName");
    chordGroupName.value = chordGroup.name;
  }

  //コード進行削除
  const delChordGroup = (chordGroup) => {
    //選択したコード進行が編集中の場合、削除できない
    if (nowEditChordGroupId === chordGroup.id) {
      alert("編集中のコード進行は削除できません。");
      return;
    }

    //確認ダイアログを出す
    if (!confirm("このコード進行を削除しますか？\nこの操作は取り消せません。")) {
      console.log("キャンセル");
      return;
    }

    //DBから削除
    delChordGroupFromDb(chordGroup.id).then((res) => {
      console.log(res);
      setUpdateDb((prev) => !prev);
      //アラートを出す
      alert("コード進行を削除しました。");
    });
    // const chordGroupId = chordGroup.id;
    // const newChordGroupList = userChordGroupList.filter((chordGroup) => {
    //   return chordGroup.id !== chordGroupId;
    // });
    // setUserChordGroupList((prev) => [...newChordGroupList]);
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

        //ランダムなキーを生成(エラー対策)

        return (
          <li style={liStyle} key={chordGroup.id}>
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
              {/*削除アイコン*/}
              <Image
                width={20}
                height={20}
                src="/image/del.png"
                alt="削除"
                style={iconStyle}
                onClick={() => delChordGroup(chordGroup)}
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