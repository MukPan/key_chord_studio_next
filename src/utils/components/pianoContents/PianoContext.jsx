import { useGetSoundPlayer } from "../../hooks/useGetSoundPlayer.tsx";
// import { useGetNoteList, usePlay, useStop } from '../hooks/useChordPlayer';
import { Keyboard } from './Keyboard.jsx'
import { ChordDisplay } from './ChordDisplay.jsx'
import PianoControler from "./PianoControler.jsx"
import { useState, useEffect, createContext, useRef } from "react";
import {PlaybackSection} from "./PlaybackSection.jsx";

export const IsTempContext = createContext({});

//ピアノページ
export default function PianoContext(props) { //鍵盤を押すことでコードを検索できるようにする機能を実装する
  const [ isTemp, setIsTemp ] = useState(false); //false:本有効 true:仮有効

  if(typeof(window) === "object") {
    document.body.style.backgroundColor = "rgb(31,31,58)"; //"rgb(0,5,58)";
  }

  const { PlayFuncs, StopFuncs } = useGetSoundPlayer();
  // const getNoteList = useGetNoteList();
  // const playChord = usePlay(PlayFuncs);
  // const stopChord = useStop(StopFuncs); //今回はコードセットではなく、単音で鳴らすため使わんかも

  const pianoPageStyle = { //cssを指定するためのオブジェクトを用意しておく。
    margin: "20px 50px",
  }

  const predictChordAreaStyle = {
    // marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    margin: "24px 0",
  }

  const headlineTextStyle = {
    fontSize: "20px",
    marginRight: "10px",
    textAlign: "center",
    width: "80px",
    padding: "42px 0",
    backgroundColor: "#fffaf7",
    height: "140px",
    fontWeight: "bold",
  }

  const keyboardSectionStyle = {
    width: "900px",
    height: "160px",
    marginLeft: "370px"
  }

  const pianoControlerStyle = {
    float: "left",
    width: "350px",
    height: "160px",
  }

  const predictChordDisplayStyle = {
    backgroundColor: "#fffaf7",
    width: "95%",
    margin: "0 0 0 3px",
    padding: "0 0 0 30px",
  }

  return (
    <IsTempContext.Provider value={{isTemp, setIsTemp}}>
      <div id="pianoPage" style={pianoPageStyle}>

        {/*再生コード表示エリア*/}
        <PlaybackSection/>

        {/*キーボードエリア*/}
        <div id="keyboardArea">
          {/*ピアノコントローラ*/}
          <div style={pianoControlerStyle}>
            <PianoControler/>
          </div>
          {/*キーボード本体*/}
          <div id="keyboardSection" className="clearfix" style={keyboardSectionStyle}>
            <Keyboard/>
          </div>
        </div>

        {/*一致コード・次コード表示エリア*/}
        <ChordDisplay
          predictChordAreaStyle={predictChordAreaStyle}
          headlineTextStyle={headlineTextStyle}
          predictChordDisplayStyle={predictChordDisplayStyle}
        />
      </div>
    </IsTempContext.Provider>
  )
}