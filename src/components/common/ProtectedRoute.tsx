import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    })();
  }, []);

  if (user === undefined) {
    return <div></div>;
  }

  if (!user) {
    alert("로그인 후 이용 가능합니다.");
    return <Navigate to="/" replace />;
  }

  return <Outlet context={{ user }} />;
}
