import classes from "./UserProfile.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [users, setUsers] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const f = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };

  React.useEffect(() => {
    f();
    deleteUser();
  }, []);

  async function deleteUser(id) {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    alert(`user deleted: ${id}`);
    setStatus("Delete successful");
  }

  return (
    <section className={classes.profile}>
      <div className="container">
        <div className="py-4">
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">SR.NO</th>
                <th scope="col">Name</th>
                <th scope="col">EmailID</th>
                <th scope="col">Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                users.map((user) => (
                  <tr>
                    <th>{user.id}</th>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{<img key={user.avatar} src={user.avatar} />}</td>
                    <td>
                      <Link
                        className="btn btn-outline-secondary mr-2"
                        to={`/users/${user.id}`}
                      >
                        View
                      </Link>
                      <Link
                        class="btn btn-outline-primary "
                        to={`/users/edit/${user.id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        class="btn btn-outline-danger "
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
