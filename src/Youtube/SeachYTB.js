import './SeachYTB.scss'
import axios from 'axios'
import { useState, useEffect } from "react";
import moment from 'moment';

const SeachYTB = () => {

    const [video, setVideo] = useState([])
    const [query, setQuery] = useState('')

    const handleSeach = async () => {
        // let res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        //     part: 'snippet',
        //     maxResults: 20,
        //     key: 'AIzaSyBH1Qse_3w1SmUwWv0JbbUMcgpJZTZWc4s',
        //     type: 'video',
        //     q: query
        // })

        let res = await axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params": {
                'part': 'snippet',
                'maxResults': '20',
                'type': 'video',
                'key': 'AIzaSyBH1Qse_3w1SmUwWv0JbbUMcgpJZTZWc4s',
                'q': query
            }
        })
        console.log(res);
        if (res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];
            if (raw && raw.length > 0) {
                raw.map(item => {

                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createdAt = item.snippet.publishedAt;
                    object.author = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object)
                })
            }
            console.log(result);
            setVideo(result)
        }
    }

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleSeach();
        }
    }
    return (
        <div className="SeachYTB-container">
            <div className="SeachYTB-seach">
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleEnter}
                />
                <button onClick={() => handleSeach()}>Seach</button>
            </div>

            {video && video.length > 0 &&
                video.map(item => {
                    return (
                        <div className='SeachYTB-result' key={item.id}>
                            <div className='result-left'>
                                <iframe width="942" height="539"
                                    src={`https://www.youtube.com/embed/${item.id}`}
                                    title="Youtube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                                </iframe>
                            </div>
                            <div className='result-right'>
                                <div className='title'>
                                    {item.title}
                                </div>
                                <div className='created-at'>
                                    {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss A')}
                                </div>
                                <div className='author'>
                                    {item.author}
                                </div>
                                <div className='description'>
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default SeachYTB


