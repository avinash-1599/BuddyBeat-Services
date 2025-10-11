import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Services from './components/Services';
import CreateAppointment from './components/CreateAppointment';
import RegisterArtist from './components/RegisterArtist';
import ArtistPanel from './components/ArtistPanel';
import TattooService from './components/TattooService';
import About from './components/About';
import Faqs from './components/Faqs';


export default function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path='/' element={<Services></Services>}></Route>
        <Route path='tattoo-services' element={<TattooService></TattooService>}>
          <Route path='book-appointment' element={<CreateAppointment></CreateAppointment>}></Route>
          <Route path='register-artist' element={<RegisterArtist></RegisterArtist>}></Route>
          <Route path='myappointments' element={<Myappointments></Myappointments>}></Route>
        </Route>
        <Route path='artist-panel/:artistContact' element={<ArtistPanel />} />
        <Route path='about' element={<About></About>}></Route>
        <Route path='faqs' element={<Faqs></Faqs>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}
