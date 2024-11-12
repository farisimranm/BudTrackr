import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './resources/theme';
import Dashboard from './pages/Dashboard';
import NewBudget from './pages/NewBudget';
import BudgetDetails from './pages/BudgetDetails';
import BaseLayout from './pages/components/BaseLayout';
import Home from './pages/Home';
import { root, dashboard, new_budget, details, experiment } from './utils/constants';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path={root} element={<Home />} />
          <Route path={dashboard} element={<Dashboard />} />
          <Route path={new_budget} element={<NewBudget />} />
          <Route path={details} element={<BudgetDetails />} />
          <Route path={experiment} element={<BaseLayout />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
