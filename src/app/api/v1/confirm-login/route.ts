// import {NextRequest, NextResponse} from "next/server";
//
// export async function POST(request: NextRequest) {
//   //bodyからデータを取得
//   const body = await request.json();
//   const state: string = body.state;
//   let email: string = body.email;
//
//   //emailに含まれる%40を@に変換
//   const emailArray = email.split('%40');
//   email = emailArray.join('@');
//
//   console.log(`email: ${email}`);
//
//   //emailをユーザのFCMトークンをDBから取得
//   const usersRef = db.collection('users');
//   //snapshotを一つだけ取得
//   const snapshot = await usersRef.where('email', '==', email).get();
//   const userData = snapshot.docs[0];
//   //登録されているメールアドレスがdbに存在しないとき
//   if (userData === undefined) {
//     console.log("メールアドレスが見つかりませんでした。");
//     return NextResponse.json({ message: `メールアドレスが見つかりませんでした。` });
//   }
//   const token = userData.data().token;
//   console.log(`token: ${token}`);
//
//
//   const newMes: TokenMessage = {
//     notification: {
//       title: 'お子様の入水を検知しました！',
//       body: 'test1\ntest2\ntest3\ntest4\ntset5\ntest6\ntest7',
//     },
//     token: token
//   }
//
//   //FCMトークンに通知を送信
//   const messaging = getMessaging();
//   try {
//     const mesRes = await messaging.send(newMes);
//     console.log("mesRes: " + mesRes);
//   } catch (error) {
//     console.log("myError: " + error);
//   }
//
//   return NextResponse.json({message: }); //{ message: `通知(${body.state})を送信しました。` }
// }
