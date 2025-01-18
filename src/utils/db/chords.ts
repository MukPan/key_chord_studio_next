import {Prisma, PrismaClient} from "@prisma/client";

//初期化
const prisma = new PrismaClient();

//DBに保存するための型宣言
type Key = {
  keyIndex: number,
}

type Chord = {
  name: string,
  keyIndex: number,
  keys: Key[],
}

type ChordGroup = {
  name: string,
  chords: Chord[],
}


//ユーザを登録する関数
export const createChordGroup = async (rawData: any): Promise<{ ok: boolean, error?: string }> => {
  // console.log(rawData);

  // rawData.forEach((chord: any) => {
  //   console.log(chord);
  // });
  //any型変数に型づけ
  // const chordGroupData: ChordGroup = {
  //   name: "無題",
  //   chords: [
  //     rawData.data
  //
  //   ],
  // };



  return {ok: true};

}