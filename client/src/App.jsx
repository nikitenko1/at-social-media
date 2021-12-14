import { Route } from 'react-router-dom';
import './styles/index.css';
import PageRender from './PageRender';
// import Home from './pages/home';
import Login from './pages/login';

const App = () => {
  return (
    <>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route exact path="/" component={Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </>
  );
};

export default App;
