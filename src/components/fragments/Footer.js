import React from 'react';
import {useTranslation} from 'react-i18next'
import {isAuthenticated } from "../../helpers/authHelper";


function Footer({ handleLogout }) {
    const {t} = useTranslation();
    return (
        <footer>
             {isAuthenticated()&&
               <a class="loggoutButton" onClick={handleLogout} href="/login"> {t('auth.log-out')}</a>
            }
            {!isAuthenticated()&&
               <a class="loggoutButton" onClick={handleLogout} href="/login">  {t('auth.footer-log')}</a>

            }
        </footer>
    );
}

export default Footer;