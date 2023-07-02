import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Switch, withStyles } from '@material-ui/core';
import Header from './components/header/Header';
import Definition from './components/definitions/Definition';
import { grey } from '@material-ui/core/colors';

function App() {
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('en');
  const [meanings, setMeanings] = useState([]);
  const [lightMode, setLightMode] = useState(false);

  const ThemeSwitch = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked+$tracked': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  useEffect(() => {
    const dictionaryApi = async () => {
      try {
        const { data } = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        setMeanings(data);
      } catch (error) {}
    };

    console.log(meanings);

    dictionaryApi();
  }, [word, category, meanings]);
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: lightMode ? '#fff' : '#282c34',
        color: lightMode ? 'black' : 'white',
        transition: 'all 0.5s linear',
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 15,
            paddingTop: '10px',
          }}
        >
          <span>{lightMode ? 'Dark' : 'Light'} Mode</span>
          <ThemeSwitch
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          lightMode={lightMode}
        />
        {meanings && (
          <Definition
            word={word}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
