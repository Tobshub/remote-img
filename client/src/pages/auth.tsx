import clientToken from "@/utils/token";
import { trpc } from "@/utils/trpc";
import { FormEvent, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { success_redirect } = useLoaderData() as { success_redirect: string | null };
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (name: keyof typeof user, value: string) => {
    setUser((state) => ({ ...state, [name]: value }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [mutationRes, setMutationRes] = useState<string | undefined>(undefined);

  const loginMut = trpc.auth.login.useMutation({
    onSuccess(data) {
      if (data.ok) {
        setMutationRes("Log In successful");
        clientToken.set(data.value);
        if (success_redirect) {
          const redirect_path = new URL(success_redirect).pathname;
          navigate(redirect_path);
          return;
        }
        navigate("/upload");
      }
    },
    onError(err) {
      console.error(err.message);
      setMutationRes(err.message);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await loginMut.mutateAsync({ email: user.email, password: user.password }).catch((_) => null);
  };
  return (
    <div className="page">
      <Link to="/" className="btn btn-primary rounded-0">
        HOME
      </Link>
      <div className="d-flex flex-column justify-content-center align-items-center fs-5">
        <h1 className="text-center">Login</h1>
        {mutationRes ? <p>{mutationRes}</p> : null}
        <form onSubmit={handleSubmit}>
          <label className="d-block mb-3">
            <span>Email: </span>
            <input
              className="form-control fs-5"
              type="email"
              placeholder="example@domain.com"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </label>
          <label className="d-block mb-3">
            <span>Password: </span>
            <div className="input-group">
              <input
                className="form-control fs-5"
                type={showPassword ? "text" : "password"}
                placeholder="xxxxxx"
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <button type="button" className="btn btn-sm btn-outline-warning" onClick={() => setShowPassword((state) => !state)}>
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </label>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loginMut.isLoading || !user.email || !user.password}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
