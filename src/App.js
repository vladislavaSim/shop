import './App.css';
import Main from "./pages/Main";
import {CHeader} from "./pages/Header";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="App">
      <CHeader/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
