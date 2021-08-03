import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await axios.get(`https://reqres.in/api/users/${id}`);
    // console.log(res.data.data);
    setUser(res.data.data);
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-outline-secondary" to="/profile">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {user.id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {user.first_name}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">
          photo: {<img key={user.avatar} src={user.avatar} />}
        </li>
      </ul>
    </div>
  );
};

export default User;
