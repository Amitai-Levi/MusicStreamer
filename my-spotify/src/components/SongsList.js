import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 


function SongsList( { dataList, artist_name, arrivedFromData, song_title }) {

    

    let headline = `More from ${arrivedFromData.name}:`;
    
    useEffect( () => {
        (async () => {

        })()
    }
    ,[])

    // const { pathname } = useLocation();

    // useEffect(() => {
    //   window.scrollTo(0, 0);
    // }, [pathname]);

    
    return (
        <>
        {console.log("song_title: ",song_title)}
        {console.log("dataList[0]: ",dataList[0])}
            <div className="artist_details">
                <div className="list_container">
                    <div className="list_title"><div>{headline}</div></div>
                    <ul>
                    {dataList.filter((song) => song.title !== song_title).map((song, index) =>
                            <Link to={"/song"} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                            <li><div>{song.title}</div><div>{song.length.slice(3,8)}</div></li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}




export default SongsList;