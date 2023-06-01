import React from 'react'
import AnimalsListTableRow from './AnimalsListTableRow'
import {useTranslation} from 'react-i18next'

function AnimalsListTable(props){
    const animals = props.animalList
    const {t} = useTranslation();
    return(
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('animal.fields.name')}</th>
                <th>{t('animal.fields.species')}</th>
                <th>{t('animal.fields.breed')}</th>
                <th>{t('animal.fields.weight')}</th>
                <th>{t('animal.fields.birthDate')}</th>

            </tr>
            </thead>
            <tbody>
            {animals.map(animal =>
            <AnimalsListTableRow animalData={animal} key={animal.idAnimal} />
            )}
            </tbody>
        </table>

    )
}
export default AnimalsListTable