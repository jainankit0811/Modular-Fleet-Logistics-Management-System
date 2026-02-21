import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import FleetOperations from './pages/FleetOperations';
import Login from './pages/Login';
import Logistics from './pages/Logistics';
import Reports from './pages/Reports';
import Signup from './pages/Signup';
import Vehicles from './pages/Vehicles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="operations" element={<FleetOperations />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
