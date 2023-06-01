import React from 'react';
import {useTranslation} from 'react-i18next'

function Header() {
    const {t} = useTranslation();
    return (
        <header>
            <h1> {t('main-page.start')}</h1>
            <img src="/img/logo.png" alt="MED-PET Veterinary Clinic Logo" width="125" height="100"/>

        </header>
    )
}

export default Header;
