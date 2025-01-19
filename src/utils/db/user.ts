import {Prisma, PrismaClient} from "@prisma/client";
import {NextRequest} from "next/server";

//初期化
const prisma = new PrismaClient();

//ログイン可能か判断する関数
export const isPossibleToLogin = async (userName: string, password: string): Promise<{ ok: boolean, error?: string }> => {
  //ユーザ名とパスワードの両方を入力してください。
  if (userName === "" || password === "") {
    return {
      ok: false,
      error: "empty",
    }
  }
  try {
    //ユーザを検索
    const user = await prisma.user.findFirst({
      where: {
        name: userName,
        password: password,
      },
    });
    console.log("user: " + user);
    //アカウントが見つからない場合
    if (user === null) {
      return {
        ok: false,
        error: "notfound",
      }
    }
    //アカウントが見つかった場合
    return {
      ok: true,
    }
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: "unknown",
    }
  }
}

//ユーザを登録する関数
export const registUser = async (userName: string, password: string): Promise<{ ok: boolean, error?: string }> => {
  //ユーザ名とパスワードの両方を入力してください。
  if (userName === "" || password === "") {
    return {
      ok: false,
      error: "empty",
    }
  }
  //ユーザ名かパスワードが短すぎます。
  if (userName.length < 3 || password.length < 6) {
    return {
      ok: false,
      error: "short",
    }
  }

  try {
    await prisma.user.create({
      data: {
        name: userName,
        password: password,
      },
    });
    // return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          ok: false,
          error: "duplication",
        }
      } else {
        return {
          ok: false,
          error: "unknown",
        }
      }
    }
  }

  return {
    ok: true,
  }
}

//reqestのcookieからログイン中のユーザIDを取得
export const getLoginUserId = async (request: NextRequest) => {
  //cookieからユーザ名を取得
  const userName = request.cookies.get("loginUserName")?.value ?? "";

  //ユーザ名のidを取得
  return (await prisma.user.findFirst({
    where: {
      name: userName,
    }
  }))?.id ?? -1;
};