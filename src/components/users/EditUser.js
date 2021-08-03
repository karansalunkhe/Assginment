import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    email: "",
  });

  const { first_name, email } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://reqres.in/api/users/${id}`, user)
      .then((response) => setUser(response.data));
    alert(`update:  ${first_name} ${email}`);

    history.push("/profile");
  };

  const loadUser = async () => {
    const result = await axios.get(`https://reqres.in/api/users/${id}`);
    setUser(result.data.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Enter Your Name"
              name="first_name"
              value={user.first_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Enter Your email"
              name="email"
              value={user.email}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-outline-secondary btn-block">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
