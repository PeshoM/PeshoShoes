import '../styles/notfound.css'
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="card-actions justify-end">
                    </div>
                    <p>404. Not Found</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound;