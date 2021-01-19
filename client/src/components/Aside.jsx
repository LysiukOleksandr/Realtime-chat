import React from 'react';
import {User, UserItem} from "./index";
import socket from '../socket'
const Aside = ({user, users, onLeave}) => {
    return (
        <aside className="aside">
            <User user={user}/>
            <div className="aside__bottom">
                <div className="aside__bottom-active">
                    <div className="rooms__logout">
                        <button onClick={onLeave}>Leave</button>
                    </div>
                    <h3 className="aside__bottom-title">Active users</h3>
                    <ul className="aside__bottom-list">
                        {users && users.length && users.map((user)=>(
                            <UserItem user={user} key={user.id} />
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
