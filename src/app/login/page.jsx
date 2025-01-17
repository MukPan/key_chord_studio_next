import {isPossibleToLogin, registUser} from "../../utils/db/user";
import {redirect} from "next/navigation";
import {setLoginUser} from "../../utils/db/cookie";

export default async function Home({searchParams}) {
  if(typeof(window) === "object") {
    document.body.style.backgroundColor = "rgb(31,31,58)"; //"rgb(0,5,58)";
  }

  //表示メッセージを作成
  let customMes = <div style={{height:"50px"}}></div>;

  const regist = (await searchParams).regist;
  if (regist === "ok") {
    customMes = <p
      style={{
        color: "#08ff00",
        fontSize: "20px",
        marginTop: "20px",
      }}>
      アカウントの登録が完了しました。</p>;
  }
  if (regist === "empty") {
    customMes = <p
      style={{
        color: "#ff0000",
        fontSize: "20px",
        marginTop: "20px",
      }}>
      ユーザ名とパスワードの両方を入力してください。</p>;
  }
  else if (regist === "notfound") {
    customMes = <p
      style={{
        color: "#ff0000",
        fontSize: "20px",
        marginTop: "20px",
      }}>
      ユーザ名かパスワードが間違っています。</p>;

  }
  else if (regist === "unkown") {
    customMes = <p
      style={{
        color: "#ff0000",
        fontSize: "20px",
        marginTop: "20px",
      }}>
      予期しないエラーが発生しました。</p>;
  }

  //ログイン処理
  const handleLogin = async (form) => {
    "use server"; //SSR
    // event.preventDefault();
    // const form = new FormData(event.currentTarget);
    const userName = form.get("userName") || "";
    const password = form.get("password") || "";
    console.log(userName, password);
    //ログイン可能か確認
    const result = await isPossibleToLogin(userName, password);
    //エラー処理
    if (!result.ok) {
      redirect(`/login?regist=${result.error}`);
    }
    //登録成功
    //セッションに保存
    setLoginUser(userName);
    redirect('/home');
  }



  const loginPageStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }

  const titleStyle = {
    fontSize: "50px",
    color: "#ff8fcc",
    fontFamily: "Courier New",
    marginBottom: "20px",
  }

  const loginFormStyle = {
    backgroundColor: "#fffaf7",
    height: "50%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  }

  const inputFormStyle = {
    width: "80%",
    height: "40px",
    margin: "10px",
    borderRadius: "5px",
    fontSize: "20px",
  }

  const loginBtnStyle = {
    width: "80%",
    height: "40px",
    margin: "10px",
    borderRadius: "5px",
    backgroundColor: "rgb(50,50,64)",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "20px",
  }

  const registerLinkStyle = {
    textDecoration: "none",
    color: "rgb(50,50,64)",
    fontSize: "20px",
    borderBottom: "solid 1px rgb(50,50,64)",
    marginTop: "10px",
    fontWeight: "bold",
  }

  const h2Style = {
    color: "rgba(50,50,64,0.7)",
    // fontWeight: "bold",
  }

  return (
    <div style={loginPageStyle}>
      <span style={titleStyle}>Key Chord Studio</span>
      <form style={loginFormStyle} action={handleLogin}>
        <h2 style={h2Style}>ログイン</h2>
        <input
          style={inputFormStyle}
          type="text"
          name="userName"
          defaultValue=""
          placeholder="ユーザ名"/>
        <input
          style={inputFormStyle}
          type="password"
          name="password"
          defaultValue=""
          placeholder="パスワード"/>
        <br/>
        <input
          type="submit"
          value="ログイン"
          style={loginBtnStyle}/>
        <a style={registerLinkStyle} href="/register">登録</a>
      </form>
      {/*メッセージ表示*/}
      {customMes}
    </div>
  );
}
