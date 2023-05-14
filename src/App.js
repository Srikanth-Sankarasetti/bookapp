import {Switch,Route} from 'react-router-dom';

import Home from "./components/Home"
import BookDetails from './components/BookDetails';

import './App.css';

const App=()=>(
 <Switch>
  <Route exact path="/" component={Home}/>
  <Route exact path="/book/:id" component={BookDetails}/>
 </Switch>
)


export default App;
