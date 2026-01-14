import './App.css';
import { Router } from './router';
import { Modals } from '@components/providers/Modals';

/**
 * Main App Component
 * 
 * Root component that provides routing context to the entire application
 */
function App() {
  return (
    <>
      <Router />
      <Modals />
    </>
  );
}

export default App;
