import { InvoiceReturnDataType } from "../../Pages/InvoicePage/InvoiceTypes"

export const ErrorConstant = {
    senderAddress: {
        streetAddress: false,
        city: false,
        postCode: false,
        country: false,
    },
    clientAddress: {
        streetAddress: false,
        city: false,
        postCode: false,
        country: false,
    },
    clientName: false,
    clientEmail: false,
    invoiceDate: false,
    paymentTerms: false,
    projectDescription: false,
}


export const AddressConstant = {
    senderAddress: {
        streetAddress: '',
        city: '',
        postCode: '',
        country: '',
    },
    clientAddress: {
        streetAddress: '',
        city: '',
        postCode: '',
        country: '',
    },
    items: [
        {
            itemName: '',
            itemPrice: 0,
            itemQuantity: '',
        },
    ],
    clientName: '',
    clientEmail: '',
    invoiceDate: '',
    paymentTerms: null,
    projectDescription: '',
}


export const InitialEditInfo = (data: InvoiceReturnDataType | null) => {
    if (data !== null) {
        return {
            senderAddress: {
                streetAddress: data?.senderAddress?.street,
                city: data?.senderAddress?.city,
                postCode: data?.senderAddress?.city,
                country: data?.senderAddress?.country,
            },
            clientAddress: {
                streetAddress: data?.clientAddress?.street,
                city: data?.clientAddress?.city,
                postCode: data?.clientAddress?.postcode,
                country: data?.clientAddress?.country,
            },
            items: data?.items.map(item => {
                return ({
                    id: item?.id,
                    itemName: item?.name,
                    itemQuantity: String(item?.quantity),
                    itemPrice: Number(item?.price)
                })
            }),
            clientName: data?.clientname,
            clientEmail: data?.clientemail,
            invoiceDate: String(data?.paymentdue),
            paymentTerms: Number(data?.paymentterms),
            projectDescription: data?.description,
            id: data?.id
        }
    }

    return AddressConstant
}