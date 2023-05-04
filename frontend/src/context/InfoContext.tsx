import React, { createContext, useState } from 'react';
import { FillFormType } from '../components/SideBarModalUI/SidebarTypes';
import { AddressConstant } from '../components/SideBarModalUI/Sidebarhelper';

interface Props {
    children: React.ReactNode;
}


export const InfoContextDefault = createContext<[info: FillFormType, setInfo: React.Dispatch<React.SetStateAction<FillFormType>>] | any>(null);

export const InfoContext: React.FC<Props> = ({
    children,
}: Props): JSX.Element => {
    const [info, setInfo] = useState<FillFormType>({ ...AddressConstant });

    return (
        <InfoContextDefault.Provider value={[info, setInfo]}>
            {children}
        </InfoContextDefault.Provider>
    );
};
