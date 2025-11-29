// Importing dependencies
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";


import Lobby from "./pages/Lobby";
import Sheet from "./pages/sheet/Sheet";
import CharacterCreation from "./pages/CharacterCreation/CharacterCreation";
import "./style/App.css"


function App() {
  const navigate = useNavigate()

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/sheet" element={<Sheet />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;