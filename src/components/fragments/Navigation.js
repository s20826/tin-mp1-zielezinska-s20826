import React from 'react';
import {Link,useLocation} from "react-router-dom";
import {useTranslation} from 'react-i18next'
import { withTranslation} from 'react-i18next'
import { isAdmin, isAuthenticated } from "../../helpers/authHelper";


 function Navigation({ handleLogout }) {
    const { pathname } = useLocation();
    const {t, i18n} = useTranslation();
    const loginLogoutLink = isAuthenticated() ? <Link className="login" >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256">
            <rect width="40" height="40" fill="none"></rect>
            <circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle>
            <circle cx="128" cy="120" r="40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16">
                </circle><path d="M63.8,199.4a72,72,0,0,1,128.4,0" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
        </svg></Link> : <Link  className="login">
  </Link>;
   

    const handleLanguageChange = (lang) => {
        localStorage.setItem('language', lang);
        i18n.changeLanguage(lang, (err, t) => {
            if(err) {
                console.log('something went wrong in change language', err);
            }
        });
    }

    return (
        <nav>
        
            <ul>
                <li><Link to="/">{t('nav.main')}</Link></li>
                {isAuthenticated()&&
                <li><Link to="/animals">{t('nav.animal')}</Link></li>}
                {isAuthenticated()&&
                <li><Link to="/clients">{t('nav.client')}</Link></li>
                }
                <li><Link to="/vets">{t('nav.vet')}</Link></li>
                {isAuthenticated()&&
                <li><Link to="/visits">{t('nav.visit')}</Link></li>}
                {isAdmin()&& 
                <li ><Link to="/history">{t('history.main')}</Link></li>
                }
                <li>
                    {loginLogoutLink}
                </li>
                <li className={i18n.language == 'pl' ? 'active' : ''}>
                    <Link onClick={() => handleLanguageChange('pl')}>PL</Link>
                </li>
                <li className={i18n.language == 'en' ? 'active' : ''}>
                    <Link onClick={() => handleLanguageChange('en')}>EN</Link>
                </li>
                
                
            </ul>
 
        </nav>
            
    );
}

export default withTranslation() (Navigation);
