import { MdSpaceDashboard } from "react-icons/md";
import { IconContext } from "react-icons";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signInErrorTimeout,
} from "../redux/user/userSlice.js";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signout`,
        // `http://localhost:3005/api/auth/signout`,

        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      const data = res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        setTimeout(() => dispatch(signInErrorTimeout()), 5000);
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate("/signIn");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="header">
      <IconContext.Provider value={{ size: "40px" }}>
        <MdSpaceDashboard className="icon" />
      </IconContext.Provider>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Header;
