import React from 'react';

const NavItem = ({ data, setId, read, setRead }) => {
    console.log(read);
    return (
        <li
            key={data.id}
            className={
                (read.indexOf(data.id) !== -1 ? 'read ' : '') + 'nav-item'
            }
            onClick={() => {
                read.indexOf(data.id) === -1
                    ? setRead([...read, data.id])
                    : console.log('already read');
                setId(data.id);
            }}>
            <div className="avatar">{data.from.name.charAt(0)}</div>
            <div className="item-details">
                <span>
                    From:{' '}
                    <span className="bold">
                        {data.from.name} {data.from.email}
                    </span>
                </span>
                <span>
                    Subject: <span className="bold">{data.subject}</span>
                </span>
                <span className="nav-item-description">
                    {data.short_description}
                </span>
                <span>{data.date}</span>
            </div>
        </li>
    );
};

export default NavItem;
