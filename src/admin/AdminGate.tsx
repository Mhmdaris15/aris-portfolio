import { useState, FormEvent, ReactNode, useEffect } from "react";
import { isAuthed, setAuthed, verifyPassword } from "./auth";

const AdminGate = ({ children }: { children: ReactNode }) => {
  const [authed, setAuthedState] = useState<boolean>(() => isAuthed());
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Admin · Aris Portfolio";
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const ok = await verifyPassword(pw);
    setSubmitting(false);
    if (ok) {
      setAuthed();
      setAuthedState(true);
    } else {
      setError("Wrong password.");
      setPw("");
    }
  };

  if (authed) return <>{children}</>;

  return (
    <div className="admin-gate">
      <form className="admin-gate-card" onSubmit={onSubmit}>
        <h1>Admin Access</h1>
        <p>This area is for the site author. Enter the password to continue.</p>

        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
        />

        {error && <p className="admin-gate-error">{error}</p>}

        <button type="submit" disabled={submitting || !pw}>
          {submitting ? "Checking…" : "Unlock"}
        </button>

        <p className="admin-gate-hint">
          Forgot it? Edit <code>ADMIN_PASSWORD_HASH</code> in{" "}
          <code>src/admin/auth.ts</code>.
        </p>
      </form>
    </div>
  );
};

export default AdminGate;
