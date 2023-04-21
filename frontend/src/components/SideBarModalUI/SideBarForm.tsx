import React, { useContext, useState } from "react";
import './SideBarModal.css'
import { FormHeader } from "../FormsUI/FormHeader";
import { TextFieldDefault } from "../FormsUI/TextFieldDefault";
import { ThemeContextDefault } from "../../context/ThemeContext";
import { FillFormType, FillFormTypeError } from "./SidebarTypes";

export const SideBarForm: React.FC = ():JSX.Element => {

    const [info, setInfo] = useState<FillFormType>({ 
        senderAddress: {
            streetAddress: "",
            city: "",
            postCode: "",
            country: ""
        }, 
        clientAddress: {
            streetAddress: "",
            city: "",
            postCode: "",
            country: ""
        }, 
        items: [], 
        clientName: "", 
        clientEmail: "",
        invoiceDate: "", 
        paymentTerms: null, 
        projectDescription: ""
    })
    const [error, setError] = useState<FillFormTypeError>({
        senderAddress: {
            streetAddress: false,
            city: false,
            postCode: false,
            country: false
        }, 
        clientAddress: {
            streetAddress: false,
            city: false,
            postCode: false,
            country: false
        }, 
        clientName: false,
        clientEmail: false,
        invoiceDate: false, 
        paymentTerms: false, 
        projectDescription: false
    })
    const theme = useContext(ThemeContextDefault)

    return (
        <div>
     <form>
          <FormHeader text={"Bill From"}/>

          <TextFieldDefault 
          value={info["senderAddress"]['streetAddress']} 
          error={error['senderAddress']['streetAddress']}
          handleChange={(e: any) => {
            console.log(info)
            setInfo({...info, senderAddress: {...info.senderAddress, streetAddress: e.target.value}})
            }} label='Street Address'/>


          {/* Button footer */}
          <div
          className={`sidebar-footer ${
            theme?.theme === 'light'
              ? 'sidebar-footer-light'
              : 'sidebar-footer-dark'
          }`}
        >
          <button style={{ marginLeft: 400}} type='submit'>submit</button>
        </div>
        </form>
        </div>
    )
}