import React, { createContext, useState } from 'react';
import { FillFormType, FillFormTypeError } from '../components/SideBarModalUI/SidebarTypes';
import { AddressConstant, ErrorConstant } from '../components/SideBarModalUI/Sidebarhelper';

interface Props {
    children: React.ReactNode;
}


export const ErrorContextDefault = createContext<[error: FillFormTypeError, setError: React.Dispatch<React.SetStateAction<FillFormTypeError>>] | any>(null);

export const ErrorContext: React.FC<Props> = ({
    children,
}: Props): JSX.Element => {
    const [error, setError] = useState<FillFormTypeError>({ ...ErrorConstant });

    return (
        <ErrorContextDefault.Provider value={[error, setError]}>
            {children}
        </ErrorContextDefault.Provider>
    );
};
