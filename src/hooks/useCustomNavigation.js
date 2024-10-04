import { useNavigate } from "react-router-dom";

const useCustomNavigation = (path = "") => {
  const navigate = useNavigate();

  const goToPage = (path = "") => {
    if (path) {
      navigate(path);
    } else {
      console.error("Path is not provided for navigation.");
    }
  };

  return goToPage;
};

export default useCustomNavigation;