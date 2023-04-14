import clientToken from "@/utils/token";
import { trpc } from "@/utils/trpc";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (name: keyof typeof user, value: string) => {
    setUser((state) => ({ ...state, [name]: value }));
  };

  const navigate = useNavigate();
  const [mutationRes, setMutationRes] = useState<string | undefined>(undefined);

  const loginMut = trpc.auth.login.useMutation({
    onSuccess(data) {
      if (data.ok) {
        setMutationRes("Log In successful");
        clientToken.set(data.value);
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
    <div
      className={`
        page login-page 
        d-flex 
        flex-column 
        justify-content-center 
        align-items-center
        fs-6
      `}
    >
      <h1>Login</h1>
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
          <input
            className="form-control fs-5"
            type="password"
            placeholder="xxxxxx"
            onChange={(e) => handleChange("password", e.target.value)}
          />
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
  );
}
