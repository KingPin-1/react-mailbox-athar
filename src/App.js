import { useEffect, useState } from 'react';
import NavItem from './components/NavItem';
import MailBody from './components/MailBody';

function App() {
    const [w, setW] = useState('0px');
    const [data, setData] = useState(null);
    const [id, setId] = useState(null);
    const [filter, setFilter] = useState('unread');
    const [favs, setFavs] = useState([]);
    const [read, setRead] = useState([]);

    function convertDate(date) {
        let y = new Date(parseInt(date));
        let a = y.toLocaleDateString('en-US');
        let b = y.toLocaleTimeString('en-US', { timeStyle: 'short' });
        return a + ' ' + b;
    }

    useEffect(() => {
        setFavs(JSON.parse(window.localStorage.getItem('favorites') || '[]'));
        setRead(JSON.parse(window.localStorage.getItem('read') || '[]'));
        fetch('https://flipkart-email-mock.vercel.app/')
            .then((response) => response.json())
            .then((data) =>
                setData(
                    data.list.map((x) => ({ ...x, date: convertDate(x.date) }))
                )
            )
            .catch((e) => console.log(e));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('favorites', JSON.stringify(favs));
        window.localStorage.setItem('read', JSON.stringify(read));
    }, [favs, read]);
    if (data) {
        console.log(data);
    }
    return (
        <div className="main">
            <div className="filter-container">
                <span>Filter By: </span>
                <button
                    onClick={() => setFilter('unread')}
                    className={filter === 'unread' ? 'active' : ''}>
                    Unread
                </button>
                <button
                    onClick={() => setFilter('read')}
                    className={filter === 'read' ? 'active' : ''}>
                    Read
                </button>
                <button
                    onClick={() => setFilter('favorites')}
                    className={filter === 'favorites' ? 'active' : ''}>
                    Favorites
                </button>
            </div>
            <div className="content-container">
                <aside
                    style={{
                        width: w === '0px' ? '100%' : 'calc(100% - 900px)',
                    }}
                    className="aside"
                    onClick={() => (w === '900px' ? false : setW('900px'))}>
                    <ul>
                        {data &&
                            data.map((item) => (
                                <NavItem
                                    data={item}
                                    setId={setId}
                                    read={read}
                                    setRead={setRead}
                                />
                            ))}
                    </ul>
                </aside>
                <article style={{ width: w }} className="wrapper">
                    {id && <MailBody setRead={setRead} data={data[id - 1]} />}
                </article>
            </div>
        </div>
    );
}

export default App;
