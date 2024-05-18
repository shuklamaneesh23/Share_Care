

import './App.css'


import Drawer from './component/drawer'

import Feeders from './component/feeders'
import Footer from './component/footer'
import Navbar from './component/navbar'
import PersonalInfo from './component/personalinfo'
import Search from './component/search'
import Services from './component/services'
import Count1 from './component/count1'
import Foot from './component/upperfoot'
import Volunteers from './component/volunteer'
import GoogleMap from './component/map'
import Volunteering from './component/volunteering'
import UserContextProvider from './context/userContextProvider'


function App() {

  return (
    <UserContextProvider>
    <Navbar />
   
    <Search/>
    
    <Feeders/>
    <Volunteers/>
    <Services/>
    <Foot/>
    <Drawer/>
    <Count1/>
    <GoogleMap/>
    <Volunteering/>
    
    <Footer/>
    
    </UserContextProvider>
  )
}

export default App
