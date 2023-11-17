import { BrowserRouter as Router, Routes, Route, link } from "react-router-dom";
import Start from "./components/Start";
import SpaceWar from './3_SpaceWar/SpaceWar';
import Navbar from "./components/Navbar";


function App() {
    return (
        <Router>
            <Navbar/>

            
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="spaceWar" element={<SpaceWar />} />
            </Routes>
        </Router>
    )
}
export default App;
