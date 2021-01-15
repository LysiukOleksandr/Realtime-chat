import React from 'react';
import {User, UserItem} from "./index";

const Aside = ({user}) => {
    return (
        <aside className="aside">
            <User user={user}/>
            <div className="aside__bottom">
                <div className="aside__bottom-active">
                    <h3 className="aside__bottom-title">Active users</h3>
                    <ul className="aside__bottom-list">

                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
