import React from 'react';

import styles from './UserList.css';

const UserList = props => (
    <div className={styles.Users}>
        <div className={styles.UsersOnline}>
            {props.users.length} people online
        </div>
        <ul className={styles.UsersList}>
            {
                props.users.map((user) => {
                    return (
                        <li key={user.id} className={styles.UserItem}>
                            {user.name}
                        </li>
                    );
                })
            }
        </ul>
    </div>
);

export default UserList;