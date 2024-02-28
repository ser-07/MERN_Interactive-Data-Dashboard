import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signInErrorTimeout,
} from "../redux/user/userSlice.js";

function SignIn({ redirectURL }) {
  const [formData, setformData] = useState({});

  const { isLoading, error, currentUser } = useSelector((state) => {
    console.log(state);
    return state.user;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(
    "SignIn component",
    window.location.href,
    "redirectURL",
    redirectURL
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    dispatch(signInStart());

    //make a post request to backend for signIn
    try {
      const res = await fetch(`http://localhost:3005/api/auth/signin`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        // referrer: "no-referrer",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      //Handle errors from fetch request
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        setTimeout(() => dispatch(signInErrorTimeout()), 5000);
        return;
      }
      //add data to store
      dispatch(signInSuccess(data));

      // navigate("/");
      navigate(redirectURL);
      console.log("location.state", location.state);
      if (location.state?.from) {
        navigate(location.state.from);
      } else navigate("/");
    } catch (error) {
      // error before making fetch request
      dispatch(signInFailure(error));
      setTimeout(() => dispatch(signInErrorTimeout()), 5000);

      console.log(error);
    }

    console.log(`Form submitted`);
  };

  const handleInputFieldChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="signInDiv">
      <h1>Sign IN</h1>
      <form className="signInForm" onSubmit={handleSubmit}>
        <input
          onChange={handleInputFieldChange}
          type="email"
          id="email"
          placeholder="Enter your email"
          className="form-input"
          required
        />
        <input
          onChange={handleInputFieldChange}
          type="text"
          id="password"
          placeholder="Enter password"
          className="form-input"
          required
        />
        <button className="form-btn" disabled={isLoading}>
          {isLoading ? "LOADING" : "SIGN IN"}
        </button>
      </form>
      {error && <p className="p-error">{error}</p>}
    </div>
  );
}

export default SignIn;
