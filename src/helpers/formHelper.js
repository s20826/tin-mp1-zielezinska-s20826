const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}
export default formMode

export const formValidationKeys = {
    fieldRequired: 'fieldRequired',
		len_2_30: 'len_2_30',
		len_2_500: 'len_2_500',
		len_digit: 'len_digit',
		fieldPhone: 'fieldPhone',
		fieldEmail: 'fieldEmail',
		filedNumber: 'filedNumber',
		fieldDate: 'fieldDate',
		moreThenZero: 'moreThenZero'
	
}
export function getValidationErrorKey(error){
    return `validationMessage.${error}`
}