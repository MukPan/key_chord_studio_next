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
  id?: number,
}


//コードグループを登録する関数
export const createChordGroup = async (rawChordGroup: any, chordGroupName: any): Promise<{ ok: boolean, error?: string }> => {

  //新規作成
  const newChordGroup = getTypeChordGroup(rawChordGroup, chordGroupName);
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

//コードグループを更新する
export const updateChordGroup = async (rawChordGroup: any, chordGroupName: any, nowEditChordGroupId: number): Promise<{ ok: boolean, error?: string }> => {
  //新規作成
  const chordGroup = getTypeChordGroup(rawChordGroup, chordGroupName);
  //apiに対してPOSTリクエスト
  const response = await fetch('/api/v1/chords/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: chordGroup,
      nowEditChordGroupId: nowEditChordGroupId,
    }),
  });

  console.log(await response.json());

  return {ok: true};
}

//コードグループを削除する
export const delChordGroupFromDb = async (chordGroupId: number): Promise<{ ok: boolean, error?: string }> => {
  //apiに対してPOSTリクエスト
  const response = await fetch('/api/v1/chords/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chordGroupId: chordGroupId,
    }),
  });

  console.log(await response.json());

  return {ok: true};
}

//型づけ処理
const getTypeChordGroup = (rawChordGroup: any, chordGroupName: any) => {
  //グループ名の型づけ処理
  let newChordGroupName: string = chordGroupName ?? "無題";
  if (chordGroupName === "") {
    newChordGroupName = "無題";
  }

  //新規作成
  const newChords: Chord[] = [];
  const newChordGroup: ChordGroup = {
    name: newChordGroupName,
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

  return newChordGroup;
}



