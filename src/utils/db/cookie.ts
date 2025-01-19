import { cookies } from 'next/headers';

//ログイン中のユーザ名をクッキーに保存
export const setLoginUser = async (user: string) => {
  (await cookies()).set('loginUserName', user);
};

