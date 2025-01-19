import {NextRequest, NextResponse} from "next/server";
import {Chord, ChordGroup, Key} from "@/utils/db/chords";
import {PrismaClient} from "@prisma/client";

//初期化
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  //bodyからデータを取得
  const body = await request.json();

  //jsonデータを型付きオブジェクトに戻す
  const newChords: Chord[] = [];
  const newChordGroup: ChordGroup = {
    name: body.data["name"],
    chords: newChords,
  }
  //更新するID
  const chordGroupId: number = body.nowEditChordGroupId;


  //グループ→複数コードに分解して型づけ処理
  for (const rawChord of body.data["chords"]) {
    const newChord: Chord = {
      name: rawChord["name"],
      keys: [...rawChord["keys"].map(
        (keyIndexStr: string): Key => {
          return {keyIndex: parseInt(keyIndexStr)};
        })
      ]
    };
    newChordGroup.chords.push(newChord);
  }

  //cookieからユーザ名を取得
  const userName = request.cookies.get("loginUserName")?.value ?? "";

  //ユーザ名のidを取得
  const userId = (await prisma.user.findFirst({
    where: {
      name: userName,
    }
  }))?.id ?? -1;


  //ユーザが見つからない場合
  if (userId === -1) {
    return NextResponse.json({
      result: 'NG',
      message: 'ユーザが見つかりませんでした。',
    });
  }

  //更新対象が見つからない場合
  if (chordGroupId === -1) {
    return NextResponse.json({
      result: 'NG',
      message: '更新するchordGroupが見つかりませんでした。',
    });
  }

  //DBに順番に更新
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

  //トランザクション
  const transaction = await prisma.$transaction([delKeysPost, delChordsPost]);


  //コードグループを保存
  const dbChordGroup = await prisma.chordGroup.update({
    where: {
      id: chordGroupId,
    },
    data: {
      name: newChordGroup.name,
      user: {
        connect: {
          id: userId,
        },
      }
    }
  });


  //コードの数分createManyを実行
  for (let i = 0; i < newChordGroup.chords.length; i++) {
    //コード保存
    const dbChord = await prisma.chord.create({
      data: {
        name: newChordGroup.chords[i].name,
        chordGroup: {
          connect: {
            id: dbChordGroup.id,
          }
        }
      }
    });

    //キー保存
    for (let j = 0; j < newChordGroup.chords[i].keys.length; j++) {
      await prisma.key.create({
        data: {
          keyIndex: newChordGroup.chords[i].keys[j].keyIndex,
          chord: {
            connect: {
              id: dbChord.id,
            }
          }
        }
      });
    }
  }

  //正常終了
  return NextResponse.json({
      result: 'OK',
      message: 'コードを保存しました。',
    });
}