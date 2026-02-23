import './App.css';
import './theme.css';
import './Components/Reveal.css';
import MainComponent from './Components/MainComponent';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="App">
          <MainComponent />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

