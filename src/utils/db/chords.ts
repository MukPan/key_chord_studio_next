//DBに保存するための型宣言

export interface Key {
  keyIndex: number;
}

export interface Chord {
  name: string,
  keys: Key[],
}

export interface ChordGroup {
  name: string,
  chords: Chord[],
}


//ユーザを登録する関数
export const createChordGroup = async (rawChordGroup: any): Promise<{ ok: boolean, error?: string }> => {
  //新規作成
  const newChords: Chord[] = [];
  const newChordGroup: ChordGroup = {
    name: "無題",
    chords: newChords,
  }

  //グループ→複数コードに分解して型づけ処理
  for (const rawChord of rawChordGroup) {
    const newChord: Chord = {
      name: rawChord.chord,
      keys: [...rawChord.dists]
    }
    newChordGroup.chords.push(newChord);
  }
  console.log(newChordGroup);


  console.log(JSON.stringify({
    data: newChordGroup,
  }));
  //APIに対して保存依頼をPOSTリクエスト
  //ルートのパスを取得
  const response = await fetch('/api/v1/chords/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: newChordGroup,
    }),
  });

  console.log(await response.json());

  return {ok: true};
}

//コードグループを取得する関数
export const getChordGroups = async (): Promise<{ ok: boolean, chordGroups?: ChordGroup[], error?: string }> => {

  //apiに対してGETリクエスト
  const response = await fetch('/api/v1/chords/get-all');
  const data = await response.json();
  console.log(data.result);
  console.log(data.chordGroups);


  return {ok: true, chordGroups: data.chordGroups};
}





//モデルの定義
// model User {
//   //PK
//   id          Int          @id @default(autoincrement())
//   //field
//   //重複なし
//   name        String
//   password    String
//   createdAt   DateTime     @default(now()) //作成日時の項目
//   updatedAt   DateTime     @updatedAt //更新日時の項目
//   chordGroups ChordGroup[]
// }