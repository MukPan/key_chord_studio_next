
export default function Popup(props) {
  const popupContentStyle = {
    //中央揃え
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }
  const h2Style = {
    color: "rgba(50,50,64,0.7)",
    fontSize: "30px",
  }

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <div style={popupContentStyle}>
          <h2 style={h2Style}>保存したコード進行一覧</h2>
          {props.children}
        </div>
        <label className="popup-close" htmlFor="popup">
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="30" y2="30" stroke="white" strokeWidth="7"></line>
            <line x1="0" y1="30" x2="30" y2="0" stroke="white" strokeWidth="7"></line>
          </svg>
        </label>
      </div>
    </div>
  )

}