import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApiC from './callApi';

import Root from "./routes/root";
import ErrorPage from "./routes/error-page";

import AddProducts from "./pages/add_pages/addProducts";
import AddClients from "./pages/add_pages/addClients";
import AddBuys from "./pages/add_pages/addBuys";

import ViewProducts from "./pages/views_pages/viewProducts";
import ViewClients from "./pages/views_pages/viewClients";
import ViewBills from "./pages/views_pages/viewBills";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products/add",
        element: <AddProducts />,
      },
      {
        path: "clients/add",
        element: <AddClients />,
      },
      {
        path: "buy/add",
        element: <AddBuys />,
      },
      {
        path: "products/view",
        element: <ViewProducts />,
      },
      {
        path: "clients/view",
        element: <ViewClients />,
      },
      {
        path: "bill/view",
        element: <ViewBills />,
      },
    ],
  },
]);

const api = new ApiC('http://localhost:8000');

function App() {
  return (
    <div className="App"> 
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
