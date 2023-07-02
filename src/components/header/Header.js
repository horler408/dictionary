import React from 'react';

import './Header.css';
import {
  MenuItem,
  TextField,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';

import categories from '../../data/category';

const Header = ({ word, setWord, category, setCategory, lightMode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? '#000' : '#fff',
      },
      type: lightMode ? 'light' : 'dark',
    },
  });
  const handleChange = (language) => {
    setCategory(language);
    setWord('');
  };

  return (
    <div className="header">
      <span className="title">{word ? word : 'word hunt'}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            label="Search a word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <TextField
            className="select"
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
            helperText="please select a language"
          >
            {categories.map((lang) => (
              <MenuItem key={lang.label} value={lang.label}>
                {lang.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
