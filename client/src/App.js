import Home from './pages/home';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar />
        <Routes>
          <Route
            path="/news" 
            element={<Home />} 
          />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
