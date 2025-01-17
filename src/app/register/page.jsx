// import {isPossibleToLogin} from "../../utils/db/login";
import {redirect} from "next/navigation";
import {registUser} from "../../utils/db/user";

export default function Home({params, searchParams}) {
  if(typeof(window) === "object") {
    document.body.style.backgroundColor = "rgb(31,31,58)"; //"rgb(0,5,58)";
  }

  //表示メッセージを作成
  let customMes = <div style={{height:"50px"}}></div>;
  const regist = searchParams.regist;
  if (regist === "duplication") {
    customMes = <p
      style={{
        color: "#ff0000",
        fontSize: "20px",
        marginTop: "20px",
      }}>
      このユーザ名は既に使われています。</p>;
  }
  else if (regist === "empty") {
    customMes = <p
      style={{
        color: "#ff0000",
        fontSize: "20px",
        marginTop: "20px",
      }}>
      ユーザ名とパスワードの両方を入力してください。</p>;
  }
  else if (regist === "short") {
    customMes = <p
      style={{
        color: "#ff0000",
        fontSize: "20px",
        marginTop: "20px",
      }}>
      ユーザ名かパスワードが短すぎます。</p>;
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

  //新規登録処理
  const handleRegist = async (form) => {
    "use server"; //SSR
    const userName = form.get("userName") || "";
    const password = form.get("password") || "";
    console.log(userName, password);
    //ユーザ登録可能か確認
    const result = await registUser(userName, password);
    //エラー処理
    if (!result.ok) {
      redirect(`/register?regist=${result.error}`);
    }
    //登録成功
    redirect('/login?regist=ok');
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
  }

  return (
    <div style={loginPageStyle}>
      <span style={titleStyle}>Key Chord Studio</span>
      <form style={loginFormStyle} action={handleRegist}>
        <h2 style={h2Style}>新規登録</h2>
        <input
          style={inputFormStyle}
          type="text"
          name="userName"
          defaultValue=""
          placeholder="ユーザ名 ※2文字以上"/>
        <input
          style={inputFormStyle}
          type="password"
          name="password"
          defaultValue=""
          placeholder="パスワード ※6文字以上"/>
        <br/>
        <input
          type="submit"
          value="新規登録"
          style={loginBtnStyle}/>
        <a style={registerLinkStyle} href="/login">既にアカウントをお持ちの方</a>
      </form>
      {customMes}
    </div>
  );
}
