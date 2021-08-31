import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { Container, Switch, withStyles } from '@material-ui/core';
import Header from './components/header/header';
import Definitions from './components/definitions/definitions';
import { grey } from '@material-ui/core/colors';
import CustomizedDialogs from './components/about';

function App() {

  const [getWord, setGetWord] = useState([]);
  const [category, setCategory] = useState("en_US");
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [lightMode, setLightMode] = useState(false);

  const ThemeSwitch = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const randomWordApi=async()=>{
    try{
      const randomWordData=await axios.get(`https://random-words-api.vercel.app/word`);
      setGetWord(randomWordData.data);
    }catch(error){
      console.log(error);
    }
  }

  const dictApi=async()=>{
    try {
      const data=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    randomWordApi();
    dictApi();
  }, [word,category])

  return (
    <div className={lightMode?"AppLight":"AppDark"}>
      <div className="about">
          <CustomizedDialogs/>
        </div>
      <Container maxWidth="md">
        
        <div className="toggle">
          <span>{lightMode?<i class="far fa-moon"></i>:<i class="far fa-sun"></i>}</span>
          <ThemeSwitch checked={lightMode} onChange={()=>setLightMode(!lightMode)}/>
        </div>
        <Header className="header" lightMode={lightMode} category={category} setCategory={setCategory} word={word} setWord={setWord}>
        </Header>
        <div className="defCards">        {
          meanings &&
          <Definitions newRandom={randomWordApi} getWord={getWord} lightMode={lightMode} word={word} category={category} meanings={meanings}/>
        }
        </div>
      </Container>
    </div>
  );
}

export default App;
