
//G変数
let DraggingElem;
//ドラッグ中のindexを保存
let prevDragIndex;

let globalSetChordGroup;

//ディスプレイに追加
export const addAllToDisplay = (
  chordObj,
  setChordGroup,
  isTempSelectedArr,
  setIsTempSelectedArr,
  isSelectedArr,
  setIsSelectedArr
) => { //カードがクリックされたら、ヘッダーにクリックされたカードの要素名を追加。 ヘッダーを親要素としてspanタグを子要素に加えて追加していく。
  globalSetChordGroup = setChordGroup;
  const chordName = chordObj.name;
  // const targetOfHeader = document.getElementById("lined-chords");
  const createDiv = document.createElement("div"); //ヘッダーに表示する文字ごとにdiv要素を作る
  createDiv.className = "DisplayCards"; //クラス名をDisplayCardsにしてcssでデザインを指定.
  createDiv.innerHTML = chordName;
  createDiv.addEventListener("mouseenter", () => hoverSelectedChord(createDiv, isTempSelectedArr, setIsTempSelectedArr));
  createDiv.addEventListener("mouseleave", () => nonHoverSelectedChord(createDiv));
  createDiv.addEventListener("dblclick", () => dbClickSelectedChord(isTempSelectedArr, setIsSelectedArr));
  createDiv.addEventListener("click", () => playThisChord(setIsTempSelectedArr));
  //////再生欄に追加する作業
  const liElem = document.createElement("li"); //ソート用のリスト、この中に下のdiv要素を追加する
  liElem.draggable = true;
  liElem.appendChild(createDiv);
  const dummyElem = document.getElementById("dummy"); //ダミー取得
  dummyElem.before(liElem); //ダミーの前に追加
  //////

  //1つのコードを保存
  setChordGroup((prev) => {
    prev = [...prev, {chord: chordName, dists: isTempSelectedArr}];
    console.log(prev);
    return prev;
  });

  //削除関数を付与
  createDiv.addEventListener("contextmenu", () => deleteThisChord(liElem, setChordGroup));
  //ドラッグ関数を付与
  document.querySelectorAll("#lined-chords li").forEach(addDragFuncs); //drag関数を付与、更新
}

/*再生欄のコードをホバー*/
const hoverSelectedChord = (thisChord, thisDists, setIsTempSelectedArr) => {
  console.log(thisChord.innerHTML);
  thisChord.style.backgroundColor = "orange";
  setIsTempSelectedArr(() => [...thisDists]);
}


/*ホバー解除*/
const nonHoverSelectedChord = (thisChord) => {
  thisChord.style.backgroundColor = "#FFFFFF";
}

/*ダブルクリックでフォーカス*/
const dbClickSelectedChord = (thisDists, setIsSelectedArr) => {
  console.log(thisDists);
  setIsSelectedArr(() => [...thisDists]);

}

/* もう一度再生 */
const playThisChord = (setIsTempSelectedArr) => {
  setIsTempSelectedArr((prev) => [...prev]);
}

/* コードを削除 */
const deleteThisChord = (thisLiChord, setChordGroup) => {
  //indexを取得
  const delIndex = getNowIndex(thisLiChord);
  thisLiChord.remove();
  //リストからも削除
  setChordGroup((prev) => {
    const newChordGroupList = [...prev];
    newChordGroupList.splice(delIndex, 1);
    return newChordGroupList;
  });
}

/*dragに関する4つの関数を付与する関数*/
const addDragFuncs = (elem) => { //4つの関数を付与

  elem.ondragstart = () => { //ドラッグスタート
    //ドラッグする要素のインデックスを取得・保存
    prevDragIndex = getNowIndex(elem);
    console.log("prevDragIndex: " + prevDragIndex);
    event.dataTransfer.setData('text/plain', event.target.id);
    DraggingElem = elem;
  };

  elem.ondragover = () => { //どこにドロップするかの目印をつける
    event.preventDefault();
    elem.style.marginLeft = '10px';
  };

  elem.ondragleave = () => { //目印解除
    elem.style.marginLeft = '';
  };

  elem.ondrop = () => {
    event.preventDefault();
    //入れ替え
    const listElem = document.getElementById("lined-chords");
    listElem.insertBefore(DraggingElem, elem);
    elem.style.marginLeft = '';

    //ドラッグ後の要素のインデックスを取得
    //ドロップ位置に変化がないとき、-1をしない
    const nowIndex = getNowIndex(elem) - ((DraggingElem === elem) ? 0 : 1);
    console.log(nowIndex);

    //previndexの要素を削除し、nowindexに挿入
    globalSetChordGroup((prev) => {
      const newChordGroupList = [...prev];
      //削除
      const [removed] = newChordGroupList.splice(prevDragIndex, 1);
      //挿入
      newChordGroupList.splice(nowIndex, 0, removed);
      return newChordGroupList;
    });
  };
}

/*自身が今何番目か取得する関数*/
const getNowIndex = (chordElem) => {
  //親要素を取得
  const listElem = document.getElementById("lined-chords");
  //全ての子要素を取り出す
  const listElemChildren = Array.from(listElem.children);
  return listElemChildren.findIndex(el => el === chordElem);
}
