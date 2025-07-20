import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider, { AdminContext } from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>                       {/* we replace StrictMode with BrowserRouter because we need a support of react router dom in this project */} 
    <AdminContextProvider>
       <DoctorContextProvider>
          <AppContextProvider>
              <App />                   {/* Now, we can access all these context in our app */}               
          </AppContextProvider>
       </DoctorContextProvider>
    </AdminContextProvider>      
  </BrowserRouter>,
)
