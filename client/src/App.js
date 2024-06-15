import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import Location from './components/location/Location';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Location/>}/>
        <Route path='/home' element={<Home/>}/>

      </Routes>
    </Router>

    </>
  );
}

export default App;
