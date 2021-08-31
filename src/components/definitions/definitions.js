import React from 'react';
import './definitions.css';

const Definitions = ({newRandom,getWord,word,meanings,lightMode,category}) => {
    return (
        <div className="meanings">
            {
                meanings[0] &&
                word &&
                category === "en_US" &&
                (
                        <audio src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio} controls>
                        Your browser doesn't support audio
                        </audio>
                )
            }
            {
                word===""?(     
                    getWord[0] &&  
                    <div>
                    <span className="randomInfo">Here is a random word for you...<br></br>
                    </span>
                    <div className={lightMode?"definition-card-light":"definition-card-dark"}>
                    
                    {
                        
                        getWord[0] &&
                        <div>                 
                        <b>{getWord[0].word}</b><br/>
                        <small>{getWord[0].definition}</small>
                    </div>
                    }
                    </div>
                    <button onClick={()=>newRandom()}>Get another</button>
                    </div>
                ):(
                    meanings.map((mean)=>(
                        mean.meanings.map((item)=>(
                            item.definitions.map((def)=>(
                                <div className={lightMode?"definition-card-light":"definition-card-dark"}>
                                    <b>{def.definition}</b><br></br>
                                    {
                                        def.example &&
                                        <small>Example : {def.example}</small>
                                    }
                                    <br></br>
                                    {
                                        def.synonyms &&
                                        def.synonyms.map((s)=>(
                                            ` ${s},`
                                        ))
                                    }
                                </div>
                            ))
                        ))
                    ))
                )
            }
        </div>
    )
}

export default Definitions
