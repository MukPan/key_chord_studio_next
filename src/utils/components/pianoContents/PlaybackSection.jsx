import { Component, useContext } from 'react'
import { useEffect, useRef } from "react";
import { Button } from 'react-bootstrap';
import {
  ChordGroupContext,
  KeySelectedContext,
  NowEditChordGroupIdContext,
  UpdateDbContext
} from "../../../app/home/page";
import {createChordGroup, updateChordGroup} from "../../db/chords";

//再生欄
export const PlaybackSection = () => {
  // console.log("Headerレンダリング");
  const { chordGroup, setChordGroup } = useContext(ChordGroupContext);
  const { isSelectedArr, setIsSelectedArr } = useContext(KeySelectedContext); //本
  const { nowEditChordGroupId, setNowEditChordGroupId } = useContext(NowEditChordGroupIdContext);
  const { updateDb, setUpdateDb } = useContext(UpdateDbContext);


  const styleDisplayCardDummy/* : { [key: string]: string }  */= {
    position: "relative",
    top: "20px",
    left: "-7px",
    height: "30px",
    width: "120px",
    backgroundColor: "#FFFFFF",
    margin: "10px",
    fontSize: "25px",
    textAlign: "center",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius:" 8px",
    opacity: "0"
  }

  const keypressPlay = (key/* :any */) => {
    if(key.key == 'S' || key.key== 's'){
      // console.log('play');
      playChordGroup();
    }
  }

  const keypressClean = (key/* :any */) => {
    if(key.key == 'C' || key.key== 'c'){
      // console.log('clean');
      cleanDisplay();
    }
  }

  useEffect( () => {
    document.addEventListener("keydown", keypressPlay);
    document.addEventListener("keydown", keypressClean);
    // document.addEventListener("keydown", keypressSwitch1);
    // document.addEventListener("keydown", keypressSwitch2);
    // document.addEventListener("keydown", keypressSwitch3);

    return (() => { //第2引数をしていしないため、再レンダリングするたびにイベントリスナーを削除する
      document.removeEventListener("keydown", keypressPlay);
      document.removeEventListener("keydown", keypressClean);
      // document.removeEventListener("keydown", keypressSwitch1);
      // document.removeEventListener("keydown", keypressSwitch2);
      // document.removeEventListener("keydown", keypressSwitch3);
    }) //第２引数に[]を指定すると動作しないバグが発生する。原因は調査中。eventlistenerが重複するから？
  },)


  const cleanDisplay = () => { //表示されている要素を全て消す
    //親要素lined-chordsを取得
    const linedChords = document.getElementById("lined-chords");
    //親要素のid="dummy"以外の子要素を全て削除
    while (linedChords.firstChild.id !== "dummy") {
      linedChords.removeChild(linedChords.firstChild);
    }
    setChordGroup(() => []);
  }


  //新:コードグループ再生
  const playChordGroup = () => {
    console.log("関数playChordGroup")
    //現在音を鳴らしているカード
    const nowIndexArr = document.getElementsByClassName("DisplayCards");
    for(let i= 0; i < chordGroup.length; i++) { //DisplayCardを左から順に取得して処理をしていく
      //始点処理
      if (i === 0) {
        nowIndexArr[i].style.backgroundColor = "orange";
        setIsSelectedArr(() => [...chordGroup[i].dists]);
      //2〜(n-1)番目処理
      }else if (i < chordGroup.length - 1) { //初回、最終回以外の処理はここ
        setTimeout(() => {
          nowIndexArr[i-1].style.backgroundColor = "#FFFFFF";
          nowIndexArr[i].style.backgroundColor = "orange";
          setIsSelectedArr(() => [...chordGroup[i].dists]);
        }, i * 1000); //二つ目は１秒、三つ目は２秒待つ... とすることで１秒ごと動作させる
      //n番目(終点)処理
      } else { //一番後ろのディスプレイカードの処理
        setTimeout(() => {
          nowIndexArr[i-1].style.backgroundColor = "#FFFFFF";
          nowIndexArr[i].style.backgroundColor = "orange";
          setIsSelectedArr(() => [...chordGroup[i].dists]);
        }, i * 1000); //二つ目は１秒、三つ目は２秒待つ... とすることで１秒ごと動作させる
        setTimeout(() => {
          nowIndexArr[i].style.backgroundColor = "#FFFFFF";
        }, (i+1) * 1000);
      }
    }
  }

  //データを保存
  const saveDisplayChords = async () => {
    if (!confirm("このコード進行を新規保存しますか？")) {
      return;
    }
    //コード進行名を取得
    const chordGroupName = getChordGroupName();
    await createChordGroup(chordGroup, chordGroupName);
    setUpdateDb((prev) => !prev);
    alert("コード進行を新規保存しました。");
  }

  //データを更新
  const updateDisplayChords = async () => {
    //編集中のコードグループがない場合、新規保存を促す
    if (nowEditChordGroupId === -1) {
      await saveDisplayChords();
      return;
    }
    const chordGroupName = getChordGroupName();
    await updateChordGroup(chordGroup, chordGroupName, nowEditChordGroupId);
    setUpdateDb((prev) => !prev);
    alert("コード進行を保存しました。");
  }

  const playChordDisplayStyle = {
    backgroundColor: "#fffaf7",
    width: "95%",
    height: "140px",
    margin: "0 0 0 3px",
    padding: "0 0 0 30px",
    display: "flex",
    alignItems: "center",
    overflowX: "scroll",
  }

  const styleButton = {
    width: "120px",
    fontSize: "15px",
  }

  const playChordAreaStyle = {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  }

  const headlineTextStyle = {
    fontSize: "20px",
    margin: "0 10px 0 0",
    textAlign: "center",
    width: "80px",
    // padding: "18px 0",
    backgroundColor: "#fffaf7",
    fontWeight: "bold",
    height: "100%",
    padding: "40px 0",
  }

  //テキストボックスを取得して、コード進行名を取得する関数
  const getChordGroupName = () => {
    const chordGroupName = document.getElementById("chordGroupName");
    return chordGroupName.value;
  }

  return (
    <>
      <div style={{marginLeft: "88.5px"}}>
        {/*テキストボックス*/}
        <input type="text" id="chordGroupName" style={{width: "200px", height: "30px", fontSize: "20px"}} placeholder="コード進行名" />

        {/*ボタン*/}
        <Button variant="success" style={styleButton} onClick={playChordGroup}>再生
          <div>sキー</div>
        </Button>
        <Button variant="danger" style={styleButton} onClick={cleanDisplay}>リセット
          <div>cキー</div>
        </Button>
        <Button variant="danger" style={styleButton} onClick={updateDisplayChords}>保存
          <div>キー</div>
        </Button>
        <Button variant="danger" style={styleButton} onClick={saveDisplayChords}>新規保存
          <div>キー</div>
        </Button>
      </div>
      {/*再生コード表示エリア*/}
      <div style={playChordAreaStyle}>
        <p style={headlineTextStyle}>再生<br/>コード</p>
        <div id="playChordDisplayStyle" style={playChordDisplayStyle}>
          <ul id="lined-chords">
            <li id='dummy'>
              <div style={styleDisplayCardDummy}></div>
            </li>
            {/* ダミー */}
          </ul>
        </div>
        {/*<div id="adjust"></div>*/}
      </div>

    </>
  )
};
export default PlaybackSection;