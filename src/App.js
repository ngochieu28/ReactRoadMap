import logo from './logo.svg';
import './App.css';
import DisplayArea from './QuanLySinhVien/DisplayArea';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Nav from './Nav/Nav';
import Game from './Tic-Tac_Toe/Game';
import NotFounds from './Notfounds';
import SeachYTB from './Youtube/SeachYTB';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameV2 from './Tic-Tac-Toe-V2/TestGame';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Nav />
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <Switch>
            <Route path="/tictactoe" >
              <GameV2 />
            </Route>
            <Route path="/quanlysinhvien" >
              <DisplayArea />
            </Route>
            <Route path="/youtube" >
              <SeachYTB />
            </Route>
            <Route path="/" exact>
            </Route>
            <Route path="*">
              <NotFounds />
            </Route>
          </Switch>
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>

  );
}

export default App;
