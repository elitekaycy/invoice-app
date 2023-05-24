import { FillFormType, FillFormTypeError, ItemType } from "./SidebarTypes";
import { AddressConstant, ErrorConstant } from "./Sidebarhelper";


export const DiscardInput = (form: FillFormType) => {
    // reset form inputs
    // reset error input
    let new_form = { ...AddressConstant }
    new_form.items = []
    new_form.clientAddress.city = ''
    new_form.clientAddress.postCode = ''
    new_form.clientAddress.streetAddress = ''
    new_form.clientAddress.country = ''
    new_form.senderAddress.city = ''
    new_form.senderAddress.postCode = ''
    new_form.invoiceDate = (new Date()).toDateString()
    new_form.senderAddress.streetAddress = ''
    new_form.senderAddress.country = ''
    new_form.clientName = ''
    new_form.clientEmail = ''
    new_form.projectDescription = ''
    new_form.paymentTerms = 30

    return new_form

}

export const DiscardError = (error: FillFormTypeError) => {

    let new_error = { ...ErrorConstant }
    new_error.paymentTerms = false
    new_error.invoiceDate = false
    new_error.projectDescription = false
    new_error.clientAddress.city = false
    new_error.clientAddress.postCode = false
    new_error.clientAddress.streetAddress = false
    new_error.clientAddress.country = false
    new_error.senderAddress.city = false
    new_error.senderAddress.postCode = false
    new_error.senderAddress.streetAddress = false
    new_error.senderAddress.country = false
    new_error.clientEmail = false
    new_error.clientName = false

    return new_error

}

export const checkNestedInput = (obj: any, key: string, error: any, err: boolean[], setError: React.Dispatch<React.SetStateAction<FillFormTypeError>>, operator: any, nest?: boolean, adkey?: string) => {
    if (obj[key][`${adkey}`] === operator) {
        let new_error = { ...error }
        new_error[`${key}`][`${adkey}`] = true
        setError(new_error)
        err.push(true)
    }

}

export const CheckInput = (obj: any, key: string, error: any, err: boolean[], setError: React.Dispatch<React.SetStateAction<FillFormTypeError>>, operator: any) => {
    if (obj[`${key}`] === operator) {
        error[key] = true
        setError({ ...error })
        err.push(true)
    }
}


export const checkInput = (form: FillFormType, errorA: FillFormTypeError, setError: React.Dispatch<React.SetStateAction<FillFormTypeError>>) => {
    let error = DiscardError(errorA)
    let Errors: boolean[] = []

    CheckInput(form, "clientName", error, Errors, setError, "")
    CheckInput(form, "clientEmail", error, Errors, setError, "")
    CheckInput(form, "paymentTerms", error, Errors, setError, 30)
    CheckInput(form, "projectDescription", error, Errors, setError, "")
    checkNestedInput(form, "clientAddress", error, Errors, setError, '', true, "postCode")
    checkNestedInput(form, "clientAddress", error, Errors, setError, '', true, "city")
    checkNestedInput(form, "clientAddress", error, Errors, setError, '', true, "country")
    checkNestedInput(form, "clientAddress", error, Errors, setError, '', true, "streetAddress")
    checkNestedInput(form, "senderAddress", error, Errors, setError, '', true, "postCode")
    checkNestedInput(form, "senderAddress", error, Errors, setError, '', true, "city")
    checkNestedInput(form, "senderAddress", error, Errors, setError, '', true, "country")
    checkNestedInput(form, "senderAddress", error, Errors, setError, '', true, "streetAddress")

    return Errors.length === 0

}


//get total items
export const getItemTotal = (items: ItemType[]) => {
    let total = 0

    items.forEach(item => {
        total += (Number(item?.itemQuantity) * Number(item?.itemPrice))
    })
    return total
}