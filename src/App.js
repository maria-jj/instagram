import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import {PostDetailsPage} from  './components/pages/PostsDetailsPage';
import {LoginPage} from './components/pages/LoginPage'
import { NewPost} from './components/pages/NewPost/index';
import { Profile } from './components/pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/NewPost">
          <NewPost/>
        </Route>
        <Route exact path="/Profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;