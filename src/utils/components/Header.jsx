import Image from 'next/image';

export default function Header() {

  const headerStyle = {
    backgroundColor: "#13131F",
    height: "60px",
    color: "#ff8fcc",
    fontSize: "45px",
    display: "flex",
    alignItems: "center",
    borderBottom: "solid 1px #000000",
    fontFamily: "Courier New",
    paddingLeft: "35px",
    justifyContent: "space-between"
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
      <div>
        <span style={headerSpanStyle}>Key Chord Studio</span>
      </div>
      <button style={iconCircleStyle}>
        <Image
          src="/image/folder_icon.png"
          alt="icon"
          width={30}
          height={30}
        />
      </button>
    </header>
  )
}