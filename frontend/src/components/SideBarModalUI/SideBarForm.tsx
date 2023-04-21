import React, { useCallback, useContext, useState } from 'react';
import './SideBarModal.css';
import { FormHeader } from '../FormsUI/FormHeader';
import { TextFieldDefault } from '../FormsUI/TextFieldDefault';
import { ThemeContextDefault } from '../../context/ThemeContext';
import {
  ConstraintType,
  FillFormType,
  FillFormTypeError,
} from './SidebarTypes';

export const SideBarForm: React.FC = (): JSX.Element => {
  const [info, setInfo] = useState<FillFormType>({
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
    items: [],
    clientName: '',
    clientEmail: '',
    invoiceDate: '',
    paymentTerms: null,
    projectDescription: '',
  });
  const [error, setError] = useState<FillFormTypeError>({
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
  });
  const theme = useContext(ThemeContextDefault);

  const TextFormConstraints: React.FC<ConstraintType> = ({
    children,
    wrap,
  }: ConstraintType): JSX.Element => {
    return (
      <div
        className={`${
          wrap ? 'text-form-constraint-wrap' : 'text-form-constraint'
        }`}
      >
        {children}
      </div>
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    additionalKey: string
  ) => {
    const newInfo: any = { ...info };
    newInfo[name][additionalKey] = e.target.value;
    console.log(newInfo);
    setInfo(newInfo);
  };

  return (
    <div className="scrollable-form">
      <form>
        <FormHeader text={'Bill From'} />

        <TextFieldDefault
          wrap={false}
          responsive={true}
          value={info['senderAddress']['streetAddress']}
          error={error['senderAddress']['streetAddress']}
          //   handleChange={(e: any) => {
          //     console.log(info);
          //     setInfo({
          //       ...info,
          //       senderAddress: {
          //         ...info.senderAddress,
          //         streetAddress: e.target.value,
          //       },
          //     });
          //   }}
          handleChange={(e) =>
            handleInputChange(e, 'senderAddress', 'streetAddress')
          }
          label="Street Address"
        />

        <div className="form-constraint-container">
          <div className="inner-constraint">
            <TextFieldDefault
              wrap={true}
              responsive={false}
              label="City"
              value={info['senderAddress']['city']}
              error={error['senderAddress']['city']}
              handleChange={(e) =>
                handleInputChange(e, 'senderAddress', 'city')
              }
            />

            <TextFieldDefault
              wrap={true}
              responsive={false}
              label="Post Code"
              value={info['senderAddress']['postCode']}
              error={error['senderAddress']['postCode']}
              handleChange={(e: any) =>
                setInfo({
                  ...info,
                  senderAddress: {
                    ...info.senderAddress,
                    postCode: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="inner-end-constraint">
            <TextFieldDefault
              wrap={true}
              responsive={true}
              label="Country"
              value={info['senderAddress']['country']}
              error={error['senderAddress']['country']}
              handleChange={(e: any) =>
                setInfo({
                  ...info,
                  senderAddress: {
                    ...info.senderAddress,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <FormHeader text={'Bill To'} />

        <TextFieldDefault
          wrap={false}
          responsive={false}
          label="Client's Name"
          value={info.clientName}
          error={error.clientName}
          handleChange={(e: any) =>
            setInfo({ ...info, clientName: e.target.value })
          }
        />

        <TextFieldDefault
          wrap={false}
          responsive={false}
          label="Client's Email"
          value={info?.clientEmail}
          error={error?.clientEmail}
          handleChange={(e: any) =>
            setInfo({ ...info, clientEmail: e.target.value })
          }
        />

        <TextFieldDefault
          wrap={false}
          responsive={false}
          label="Street Address"
          value={info?.clientAddress?.streetAddress}
          error={error?.clientAddress?.streetAddress}
          handleChange={(e: any) =>
            handleInputChange(e, 'clientAddress', 'streetAddress')
          }
        />

        <div className="form-constraint-container">
          <div className="inner-constraint">
            <TextFieldDefault
              wrap={true}
              responsive={false}
              label="City"
              value={info?.clientAddress['city']}
              error={error?.clientAddress['city']}
              handleChange={(e) =>
                handleInputChange(e, 'clientAddress', 'city')
              }
            />

            <TextFieldDefault
              wrap={true}
              responsive={false}
              label="Post Code"
              value={info['senderAddress']['postCode']}
              error={error['senderAddress']['postCode']}
              handleChange={(e: any) =>
                setInfo({
                  ...info,
                  senderAddress: {
                    ...info.senderAddress,
                    postCode: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="inner-end-constraint">
            <TextFieldDefault
              wrap={true}
              responsive={true}
              label="Country"
              value={info['senderAddress']['country']}
              error={error['senderAddress']['country']}
              handleChange={(e: any) =>
                setInfo({
                  ...info,
                  senderAddress: {
                    ...info.senderAddress,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        {/* Button footer */}
      </form>
    </div>
  );
};
