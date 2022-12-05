// import { ThemeProvider } from '@emotion/react';
import React, { useCallback, useState } from 'react';
// import { createTheme } from '@mui/material/styles';
// import { red } from '@mui/material/colors';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from './sections/Home';
import Athletes from './sections/Athletes';
/*
const lighTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[900],
    },
    background: {
      default: red[900],
      paper: red[900],
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
*/

export default function Main() {
  const [themeDark, setThemeDark] = useState(true);
  const toggleTheme = useCallback(() => {
    setThemeDark((old) => !old);
  }, []);
  return (
    <BrowserRouter>
      <NavBar toggleTheme={toggleTheme} themeState={themeDark} />
      <Routes>
        <Route path="/comparer" element={<Athletes />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
