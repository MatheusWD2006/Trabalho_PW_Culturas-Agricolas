import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from "./components/Menu";
import Cultura from "./components/view/culturas/Cultura";
import Planta from "./components/view/plantas/Planta";
import Manejo from "./components/view/manejos/Manejo";
import Sobre from "./components/view/Sobre"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,

        children: [


            {
                path: "plantas",
                element: <Planta/>
            },

            {
                path: "culturas",
                element: <Cultura/>
            },

            {
                path: "manejos",
                element: <Manejo/>
            },

            {
                path: "sobre",
                element: <Sobre/>
            }

        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
