import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {menuData} from "./components/data";
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <Header />
      <Main dishes=
      {menuData}/>
      <Footer/>
    </div>
  );
}

App.propTypes = {};

export default App;