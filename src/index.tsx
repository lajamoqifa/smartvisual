import ReactDOM from "react-dom";
import s from "./index.module.less";

console.log("s:" + ReactDOM);
const App = () => {
  return (
    <div className={s.myClass}>
      <Spin></Spin>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
