import {NextRequest, NextResponse} from "next/server";
import {Chord, ChordGroup, Key} from "@/utils/db/chords";
import {PrismaClient} from "@prisma/client";

//初期化
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  //bodyからデータを取得
  const body = await request.json();

  //削除するID
  const chordGroupId: number = body.chordGroupId;

  //更新対象が見つからない場合
  if (chordGroupId === -1) {
    return NextResponse.json({
      result: 'NG',
      message: '更新するchordGroupが見つかりませんでした。',
    });
  }

  //DBに順番に削除
  console.log("chordGroupId: " + chordGroupId);

  //既存のKeysを削除
  const delKeysPost = prisma.key.deleteMany({
    where: {
      chord: {
        chordGroupId: chordGroupId,
      }
    }
  });

  //既存のChordsを削除
  const delChordsPost =  prisma.chord.deleteMany({
    where: {
      chordGroupId: chordGroupId,
    }
  });

  //既存のChordGroupを削除
  const delChordGroupPost = prisma.chordGroup.delete({
    where: {
      id: chordGroupId,
    }
  });

  //トランザクション
  const transaction = await prisma.$transaction([delKeysPost, delChordsPost, delChordGroupPost]);


  //正常終了
  return NextResponse.json({
      result: 'OK',
      message: 'コードを保存しました。',
    });
}