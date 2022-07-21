import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Layout>
        <HomePage />
      </Layout>
    </div>
  );
}

export default App;
