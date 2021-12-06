import './App.css';
import { Route, Routes } from 'react-router';
import { Landing } from './components/landing.jsx';
import { Home } from './components/home.jsx';
import { Detail } from './components/detail.jsx';
import { Form } from './components/form';

function App() {
  return (
    <Routes>
      <Route to exact path='/' element={<Landing/>}/>
      <Route to path='/home' element={<Home/>}/>
      <Route to path='/detail/:id' element={<Detail/>}/>
      <Route to path='/create' element={<Form/>}/>
    </Routes>
  );
}

export default App;
