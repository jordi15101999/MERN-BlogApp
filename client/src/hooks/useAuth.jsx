import { useEffect, useState } from "react";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the existence of a user session or token
    const userSession = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // Update the authentication state
    setAuthenticated(userSession && token);
  }, []);

  return authenticated;
};

export default useAuth;
