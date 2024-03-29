import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputFieldChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrer: "no-referrer",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        setTimeout(() => setError(null), 5000);
        return;
      }

      setIsLoading(false);
      navigate("/signIn");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <div className="signInDiv">
      <h1>SignUp</h1>
      <form className="signInForm" onSubmit={handleSubmit}>
        <input
          onChange={handleInputFieldChange}
          type="text"
          id="username"
          placeholder="Enter your username"
          className="form-input"
          required
        />
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
        <button className="form-btn">
          {isLoading ? "LOADING" : "SIGN UP"}
        </button>
      </form>
      {error && <p className="p-error">{error}</p>}
      <div className="signIn-SignUp">
        <p>Do not have an account?</p>
        <Link to={"/signIn"}>
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
