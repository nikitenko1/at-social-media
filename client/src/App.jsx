import { Route } from 'react-router-dom';
import './styles/index.css';
import PageRender from './PageRender';

const App = () => {
  return (
    < >
      <input type="checkbox" id="theme" />
      <div className="App">
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:page/:id" component={PageRender} />
      </div>
    </>
  );
};

export default App;
