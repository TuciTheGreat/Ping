import { useQuery } from "@tanstack/react-query";
import { fetchAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false, // Disable automatic retries on failure
  });
  return {
    authenticatedUser: authUser.data?.user,
    isLoading: authUser.isLoading,
  };
};

export default useAuthUser;
