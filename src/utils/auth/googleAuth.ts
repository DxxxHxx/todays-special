import supabase from "@/supabase/client";

export const gooogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    alert(error.message);
  }
};

export const googleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  location.href = "/";

  if (error) {
    alert(error.message);
  }
};

export const getUser = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log(userError.message);
    return null;
  } else {
    console.log(user);
  }

  return user;
};
