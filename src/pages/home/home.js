import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div className="home container">
        <div className="home__title">
          This is the basic website using React JS and includes the following
          basic functions:
        </div>
        <ul className="home__item">
          <li>Login</li>
          <li>Add new user</li>
          <li>Edit user</li>
          <li>Delete user</li>
          <li>View all users</li>
          <li>Search user by id</li>
          <li>Sort by FirstName</li>
          <li>Import User from file.csv</li>
          <li>Export User to file.csv</li>
        </ul>
      </div>
    );
  }
}

export default Home;
