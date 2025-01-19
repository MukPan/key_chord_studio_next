import {NextRequest, NextResponse} from "next/server";
// import {Chord, ChordGroup, Key} from "@/utils/db/chords";
import {PrismaClient} from "@prisma/client";
import {getLoginUserId} from "@/utils/db/user";

//初期化
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  //ユーザ名のidを取得
  const userId = await getLoginUserId(request);

  //ユーザが見つからない場合
  if (userId === -1) {
    return NextResponse.json({
      result: 'NG',
      message: 'ユーザが見つかりませんでした。',
    });
  }

  //ユーザの全てのChordGroupを取得する
  const chordGroups = await prisma.chordGroup.findMany({
    where: {
      userId: userId,
    },
    include: {
      chords: {
        include: {
          keys: true,
        }
      }
    }
  });

  return NextResponse.json({
    result: 'OK',
    chordGroups: chordGroups,
  });

}