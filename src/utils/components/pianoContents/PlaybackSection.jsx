import { Component, useContext } from 'react'
// import { useGetSoundPlayer } from "../../hooks/useGetSoundPlayer.tsx";
import { useEffect, useRef } from "react";
import { Button } from 'react-bootstrap';
import {KeySelectedContext, LinedDistsContext} from "../../../app/home/page";
import {createChordGroup} from "../../db/chords";

//再生欄
export const PlaybackSection = () => {
  // console.log("Headerレンダリング");
  const { linedDistsArr, setLinedDistsArr } = useContext(LinedDistsContext);
  const { isSelectedArr, setIsSelectedArr } = useContext(KeySelectedContext); //本


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
      playDisplay();
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


  const cleanDisplay = () =>{ //表示されている要素を全て消す
    const nowIndexArr = document.getElementsByClassName("DisplayCards"); //今の順番を取得
    const NumOfDisplayCrads = nowIndexArr.length; //今のディスプレイカードの枚数を保持する
    for(let i=0; i<NumOfDisplayCrads; i++){
      nowIndexArr[0].remove(); //一番上の要素を消すと、一個下の要素が一番上になる。つまり[0]を消し続ければ良い
    }
    setLinedDistsArr(() => []);
    setLinedDistsArr(() => []);

  }

  //音鳴らしてるのはここ
  const playDisplay = () => { //表示されている要素にひとつずつイベントを起こしていく
    const nowIndexArr = document.getElementsByClassName("DisplayCards"); //今の順番を取得
    const numOfDisplayCrads = nowIndexArr.length; //今のディスプレイカードの枚数を保持する
    console.log(nowIndexArr[0].innerHTML);
    for(let i= 0; i < numOfDisplayCrads; i++) { //DisplayCardを上から順に取得して処理をしていく
      if (i == 0) { //一個目はすぐに色を変える
        nowIndexArr[i].style.backgroundColor = "orange";
        setIsSelectedArr(() => [...linedDistsArr[nowIndexArr[i].innerHTML]]);
        // console.log();
      }else if (i < numOfDisplayCrads - 1) { //初回、最終回以外の処理はここ
        setTimeout(() => {
          nowIndexArr[i-1].style.backgroundColor = "#FFFFFF";
          nowIndexArr[i].style.backgroundColor = "orange";
          setIsSelectedArr(() => [...linedDistsArr[nowIndexArr[i].innerHTML]]);
        }, i * 1000); //二つ目は１秒、三つ目は２秒待つ... とすることで１秒ごと動作させる
      } else { //一番後ろのディスプレイカードの処理
        setTimeout(() => {
          nowIndexArr[i-1].style.backgroundColor = "#FFFFFF";
          nowIndexArr[i].style.backgroundColor = "orange";
          setIsSelectedArr(() => [...linedDistsArr[nowIndexArr[i].innerHTML]]);
        }, i * 1000); //二つ目は１秒、三つ目は２秒待つ... とすることで１秒ごと動作させる
        setTimeout(() => {
          nowIndexArr[i].style.backgroundColor = "#FFFFFF";
        }, (i+1) * 1000);
      }
    }
  }

  //データを保存
  const saveDisplayChords = () => {
    console.log(linedDistsArr);
    const nowIndexArr = document.getElementsByClassName("DisplayCards"); //今の順番を取得
    createChordGroup(linedDistsArr);



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

  return (
    <>
      <div style={{marginLeft: "90.79px"}}>
        <Button variant="success" style={styleButton} onClick={playDisplay}>再生
          <div>sキー</div>
        </Button>
        <Button variant="danger" style={styleButton} onClick={cleanDisplay}>リセット
          <div>cキー</div>
        </Button>
        <Button variant="danger" style={styleButton} onClick={saveDisplayChords}>保存
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