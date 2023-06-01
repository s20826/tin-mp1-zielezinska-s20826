import React from 'react';
import {BrowserRouter as Router,
Switch,
Route } from "react-router-dom";
import Header from "./components/fragments/Header"
import Navigation from "./components/fragments/Navigation"
import MainContent from "./components/other/MainContent"
import Footer from "./components/fragments/Footer"
import AnimalList from "./components/animal/AnimalList";
import AnimalsDetails from "./components/animal/AnimalsDetails";
import AnimalForm from "./components/animal/AnimalForm";
import AnimalDelete from "./components/animal/AnimalDelete";
import ClientList from "./components/client/ClientList";
import ClientForm from "./components/client/ClientForm";
import ClientDelete from "./components/client/ClientDelete";
import VetList from "./components/vet/VetList";
import VetForm from "./components/vet/VetForm";
import VetDelete from "./components/vet/VetDelete";
import VisitList from "./components/visit/VisitList";
import VisitForm from "./components/visit/VisitForm";
import VisitDelete from "./components/visit/VisitDelete";
import HistoryList from "./components/history/History";
import { useEffect, useState } from "react";
import { getCurrentUser, isAdmin } from "./helpers/authHelper";
import LoginForm from "./components/other/LoginForm";
import ProtectedRoute from './components/other/ProtectedRoute';


function App() {

  const [user, setUser] = useState(null);
  const [prevPath, setPrevPath] = useState(null);

  const handleLogin = (user) => {
    console.log(user);
    localStorage.setItem("user", user);
    setUser(user);
    window.location.href = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [])

  return (
      <Router>
         <div>
           <Header/>
           <Navigation handleLogout={handleLogout}/>
           
           <Switch>
               <Route exact path="/" component={MainContent}/>
               <Route exact path="/animals" component={AnimalList}/>
               <Route exact path="/animals/details/:idAnimal" component={AnimalsDetails}/>
               <Route exact path="/animals/add" component={AnimalForm}/>
               <Route exact path="/animals/edit/:idAnimal" component={AnimalForm}/>
               <Route exact path="/animals/ifDelete/:idAnimal" component={AnimalDelete}/>

               <Route exact path="/clients" component={ClientList}/>
               <Route exact path="/clients/add" component={ClientForm}/>
               <Route exact path="/clients/edit/:idClient" component={ClientForm}/>
               <Route exact path="/clients/ifDelete/:idClient" component={ClientDelete}/>

               <Route exact path="/vets" component={VetList}/>
               <Route exact path="/vets/add" component={VetForm}/>
               <Route exact path="/vets/edit/:idVet" component={VetForm}/>
               <Route exact={true} path="/vets/ifDelete/:idVet" component={VetDelete}/>

               <Route exact path="/visits" component={VisitList}/>
               <Route exact path="/visits/add" component={VisitForm}/>
               <Route exact path="/visits/edit/:idVisit" component={VisitForm}/>
               <Route exact path="/visits/ifDelete/:idVisit" component={VisitDelete}/>

               <Route exact path="/history" component={HistoryList}/>


               <Route exact path="/login" render={(props) => <LoginForm {...props} handleLogin={handleLogin} />} />


           </Switch>
           <Footer handleLogout={handleLogout}/>
         </div>
      </Router>
  );
}

export default App;
