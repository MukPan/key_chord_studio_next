import Image from 'next/image';
import Popup from "./Popup";
import ChordGroupList from "./ChordGroupList.jsx";

export default function Header() {

  const headerStyle = {
    backgroundColor: "#13131F",
    height: "60px",


    display: "flex",
    alignItems: "center",
    borderBottom: "solid 1px #000000",


    justifyContent: "space-between"
  }

  const titleStyle = {
    color: "#ff8fcc",
    fontSize: "45px",
    fontFamily: "Courier New",
    paddingLeft: "35px",
  }

  const headerSpanStyle = {
    marginTop: "15px",
  }


  const iconCircleStyle = {
    width: "48px",
    height: "48px",
    backgroundColor: "#fffaf7",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "35px",
    marginTop: "3px"
  }

  return (
    <header style={headerStyle}>
      {/*タイトル*/}
      <div style={titleStyle}>
        <span style={headerSpanStyle}>Key Chord Studio</span>
      </div>
      {/*フォルダアイコン*/}
      <input type="checkbox" id="popup"/>
      <label style={iconCircleStyle} className="popup-open" htmlFor="popup">
        <Image
          src="/image/folder_icon.png"
          alt="icon"
          width={30}
          height={30}
        />
      </label>
      <Popup>
        <ChordGroupList/>
      </Popup>
    </header>
  )
}