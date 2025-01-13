import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Calculator, DollarSign, Clock, Shield, Briefcase, Percent, Menu, X } from 'lucide-react';
import SalarioAnual from './pages/SalarioAnual';
import HorasExtras from './pages/HorasExtras';
import SeguroDesemprego from './pages/SeguroDesemprego';
import Previdencia from './pages/Previdencia';
import Rescisao from './pages/Rescisao';
import ImpostoRenda from './pages/ImpostoRenda';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const MenuItem = ({ to, icon: Icon, children }) => (
    <NavLink
      to={to}
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive ? 'bg-[#5DADE2] text-white' : 'hover:bg-[#5DADE2] hover:text-white'
        }`
      }
    >
      <Icon size={20} />
      <span>{children}</span>
    </NavLink>
  );

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#5DADE2] text-white"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <h1 className="text-xl font-bold mb-8 text-[#2C3E50]">Calculadora Trabalhista</h1>
            <nav className="space-y-2">
              <MenuItem to="/salario-anual" icon={Calculator}>Salário Anual</MenuItem>
              <MenuItem to="/horas-extras" icon={Clock}>Horas Extras</MenuItem>
              <MenuItem to="/seguro-desemprego" icon={Shield}>Seguro Desemprego</MenuItem>
              <MenuItem to="/previdencia" icon={DollarSign}>Previdência</MenuItem>
              <MenuItem to="/imposto-renda" icon={Percent}>Imposto de Renda</MenuItem>
              <MenuItem to="/rescisao" icon={Briefcase}>Rescisão CLT</MenuItem>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/salario-anual" element={<SalarioAnual />} />
              <Route path="/horas-extras" element={<HorasExtras />} />
              <Route path="/seguro-desemprego" element={<SeguroDesemprego />} />
              <Route path="/previdencia" element={<Previdencia />} />
              <Route path="/imposto-renda" element={<ImpostoRenda />} />
              <Route path="/rescisao" element={<Rescisao />} />
              <Route path="*" element={<SalarioAnual />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;