import {PrismaClient} from "@prisma/client";

//初期化
const prisma = new PrismaClient();

//ログイン可能か判断する関数
export const isPossibleToLogin = async (userName: string, password: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      name: userName,
      password: password,
    },
  });
  console.log("user");
  console.log(user);

  return (user !== null);



}