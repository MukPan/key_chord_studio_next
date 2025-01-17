// import { useRouter } from "next/navigation";
import {isPossibleToLogin} from "../../utils/db/login";
import {redirect} from "next/navigation";

export default function Home() {
  if(typeof(window) === "object") {
    document.body.style.backgroundColor = "rgb(31,31,58)"; //"rgb(0,5,58)";
  }

  // const router = useRouter();

  //ログイン処理
  const handleLogin = async (form) => {
    "use server"; //SSR
    // event.preventDefault();
    // const form = new FormData(event.currentTarget);
    const userName = form.get("userName") || "";
    const password = form.get("password") || "";
    console.log(userName, password);
    //ログイン可能か確認
    if (await isPossibleToLogin(userName, password)) {
      redirect('/home');
    }
    // router.push('/home');
    // router.push('/api/v1/confirm-login');
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

  return (
    <div style={loginPageStyle}>
      <span style={titleStyle}>Key Chord Studio</span>
      <form style={loginFormStyle} action={handleLogin}>
        <input
          style={inputFormStyle}
          type="text"
          name="userName"
          defaultValue=""
          placeholder="ユーザー名"/>
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
        <a style={registerLinkStyle} href="">登録</a>
      </form>

    </div>
  );
}
