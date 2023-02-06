import { React } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
/* import LoginPage from "./components/login"; */
import Navbar from "./components/navbar";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        {/* <Route index element = {<Home/>}/>  for home page
      <Route element = {<Data/>}/> */}
      </Route>
    )
  );
  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}
      <Navbar />
    </div>
  );
}

const Root = () => {
  return <Navbar />;
};
export default App;
