import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import Logistics from './pages/Logistics';
import Vehicles from './pages/Vehicles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* Add more routes as we implement modules */}
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="reports" element={<div className="p-8 text-2xl">Reports & Analytics (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
