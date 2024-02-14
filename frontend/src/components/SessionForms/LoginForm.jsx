import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";

import { login, clearSessionErrors } from "../../store/session";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  if (errors) console.log("HIHIHI", errors);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();

    return dispatch(
      login({
        email: "demo@hello.com",
        password: "password",
      })
    );
  };

  if (errors) console.log("ERRORS", errors);
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* <div className="errors">{errors.errors}</div> */}
      <h2 id="login-header">Login</h2>
      <div className="credential-fields">
        <div className="errors">{errors?.errors?.email}</div>
        <label>
          <span>Email</span>
          <input
            id="input-field"
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.message}</div>
        <label>
          <span>Password</span>
          <input
            id="input-field"
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        </label>
        <br />
        <input
          id="submit-button"
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
        <button id="demo-button" type="submit" onClick={handleDemoLogin}>
          Demo User
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
