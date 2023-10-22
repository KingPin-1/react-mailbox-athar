import { useEffect, useState } from 'react';
import NavItem from './components/NavItem';

function App() {
    const [w, setW] = useState('0px');
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://flipkart-email-mock.vercel.app/')
            .then((response) => response.json())
            .then((data) => setData(data.list))
            .catch((e) => console.log(e));
    }, []);
    if (data) {
        for (let x of data) {
            let y = new Date(parseInt(x.date));
            let a = y.toLocaleDateString('en-US');
            let b = y.toLocaleTimeString('en-US', { timeStyle: 'short' });
            console.log(x.date, a, b);
        }
    }
    return (
        <div className="main">
            <aside
                style={{ width: w === '0px' ? '100%' : 'calc(100% - 900px)' }}
                className="aside"
                onClick={() => (w === '900px' ? setW('0px') : setW('900px'))}>
                <ul>{data && data.map((item) => <NavItem data={item} />)}</ul>
            </aside>
            <article style={{ width: w }} className="wrapper">
                <div className="content"> THIS IS THE CONTENT AREA</div>
            </article>
        </div>
    );
}

export default App;
