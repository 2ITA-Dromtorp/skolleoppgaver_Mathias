import logo from './logo.svg';
import './App.css';
import Login from './Login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <div className="login_box">
            <Login />
          </div>
      </header>
    </div>
  );
}

export default App;
