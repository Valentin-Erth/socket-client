import './index.css'
import {Provider} from 'react-redux';
import {createRoot} from 'react-dom/client'
import App from "@/app/App.tsx";
import {store} from "@/app/store.ts";


createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App/>
    </Provider>
)