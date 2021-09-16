import { BrowserRouter, Switch, Route } from 'react-router-dom'



import "./style.css";
import Main from "./pages/Main";
import Preview from './pages/Preview';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/app">
              <Main />
          </Route>
          <Route path="/">
              <Preview />
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
