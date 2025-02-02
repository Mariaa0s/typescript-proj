import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from "./Router.tsx";
import store from "./store";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
)
