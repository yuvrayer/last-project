import { BrowserRouter } from 'react-router-dom'
import Layout from '../layout/layout/Layout'
import './App.css'
import { Provider } from 'react-redux'
import vacationsStore from '../../redux/store'
import Auth from '../auth/auth/Auth'

export default function App(): JSX.Element {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={vacationsStore}>
                    <Auth>
                        <Layout />
                    </Auth>
                </Provider>
            </BrowserRouter>
        </div>
    )
}