import './App.css';
import './theme.css';
import './Components/Reveal.css';
import MainComponent from './Components/MainComponent';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <MainComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
