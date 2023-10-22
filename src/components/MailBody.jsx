import React, { useEffect, useState } from 'react';

const MailBody = ({ data }) => {
    const [body, setBody] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`https://flipkart-email-mock.now.sh/?id=${data.id}`)
            .then((response) => response.json())
            .then((mailbody) => {
                setIsLoading(false);
                setBody(mailbody.body);
            });
    }, [data]);
    return (
        <div className="content">
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && (
                <>
                    <div className="avatar">{data.from.name.charAt(0)}</div>
                    <div className="content-details">
                        <button className="favorite-btn">
                            Mark as favorite
                        </button>
                        <h1 className="bold">{data.from.name}</h1>
                        <span>{data.date}</span>
                        <div
                            className="mail-body"
                            dangerouslySetInnerHTML={{ __html: body }}></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MailBody;
