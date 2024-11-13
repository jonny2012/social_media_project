
import { useGetAllPostsQuery } from "./redux/RTKqueries/postQueries";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { data, error, isLoading } = useGetAllPostsQuery(undefined);
  const rest = {
    userId: "672bf88d764bb030e903b86b",
  };

  return (

   
      <BrowserRouter>
      <AppRouter/>
      </BrowserRouter>

 
 
  );
}

export default App;
