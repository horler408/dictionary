import React from 'react';
import './definitions.css';

const Definition = ({ word, meanings, category, lightMode }) => {
  return (
    <div className="meanings">
      {meanings[0] && word && category === 'en' && (
        <audio
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          style={{ backgroundColor: '#fff', borderRadius: '' }}
          controls
        >
          Your browser dosnt support audio
        </audio>
      )}
      {!word ? (
        <span className="sub-title">Start by typing a word</span>
      ) : (
        meanings.map((meaning) =>
          meaning.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="single-meaning"
                style={{
                  backgroundColor: lightMode ? '#3b5360' : '#fff',
                  color: lightMode ? '#fff' : 'black',
                }}
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: 'black', width: '100%' }} />
                {def.example && (
                  <span>
                    <b>Example: </b>
                    {def.example}
                  </span>
                )}
                {def.synonyms && (
                  <span>
                    <b>Synonyms: </b>
                    {def.synonyms.map((s) => `${s},`)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definition;
