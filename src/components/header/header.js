import { ThemeProvider, createTheme, TextField, MenuItem } from '@material-ui/core';
import React from 'react';
import './header.css';
import categories from '../../data/category';

const Header = ({setCategory,category,lightMode,word,setWord}) => {

    const darkTheme = createTheme({
        palette: {
            primary:{
                main:lightMode?'#000':'#fff'
            },
          type:lightMode?'light':'dark',
        },
      });

    const handleChange=(language)=>{
        setCategory(language);
        setWord("");
    };

    return (
        <div className="header">
            <span className="title">Dictionary</span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField
                    className="search"
                    id="standard-basic" label="Search a word"
                    value={word}
                    onChange={(event)=>setWord(event.target.value)}
                    autoFocus
                    autoComplete="off"
                    />
                    <TextField
                    className="select"
                    select
                    label="Language" 
                    value={category}
                    onChange={(event)=>handleChange(event.target.value)}
                    >
                    {
                            categories.map((opt)=>(
                                <MenuItem key={opt.label} value={opt.label}>
                                    {opt.value}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
