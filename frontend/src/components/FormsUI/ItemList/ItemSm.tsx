import React, { useContext, useState } from 'react';
import './Item.css';
import { ThemeContextDefault } from '../../../context/ThemeContext';
import deleteIcon from '../../../assets/icon-delete.svg';
import {
    FillFormType,
    FillFormTypeError,
    ItemType,
} from '../../SideBarModalUI/SidebarTypes';
import { off } from 'process';

type ItemListType = {
    key: number;
    id: number;
    error: FillFormTypeError;
    info: FillFormType;
    value: ItemType;
    setItem: any;
};

export const ItemSm: React.FC<ItemListType> = ({
    id,
    info,
    value,
    setItem,
}): JSX.Element => {
    const theme = useContext(ThemeContextDefault);

    const { itemName, itemPrice, itemQuantity } = value;

    const handleItemsChange = (e: React.ChangeEvent<HTMLInputElement>, name: string): void => {
        const newInfo: FillFormType = { ...info };
        let itemsIndex: number = info?.items.findIndex((obj, idx) => idx === id);
        let Items: any = newInfo.items
        Items[itemsIndex][name] = e.target.value;
        newInfo.items = Items
        setItem(newInfo);
    }

    return (
        <>
            <div className='item-sm'>
                <div>
                    <div className='invoice-body-1 text-pd lbl'>Item Name</div>
                    <div>
                        <input type='text' required name="itemName" value={itemName} className={`item-name-input-sm text-center ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
                            }`}
                            onChange={(e) => handleItemsChange(e, "itemName")}
                        />
                    </div>
                </div>

                <div className='item-flex'>
                    <div>
                        <div className='invoice-body-1 text-pd lbl'>
                            Qty.
                        </div>
                        <div className=''>
                            <input
                                required
                                type="string"
                                className={`item-qty ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
                                    }`}
                                value={itemQuantity}
                                onChange={(e) => handleItemsChange(e, "itemQuantity")}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='invoice-body-1 text-pd lbl'>
                            Price
                        </div>
                        <div className=''>
                            <input
                                required
                                type="number"
                                className={`item-price ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
                                    }`}
                                value={itemPrice}
                                onChange={(e) => handleItemsChange(e, "itemPrice")}
                            />
                        </div>
                    </div>

                    <div className='text-center text-pd t-total'>
                        <div className='invoice-body-1 text-pd lbl'>total</div>
                        <div
                            className={`invoice-h3-small ${theme?.theme === 'light' ? 'text-light' : 'text-dark'
                                }`}
                        >
                            {Number(itemQuantity) * itemPrice}
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            const newInfo = { ...info };
                            newInfo.items = newInfo?.items.filter((item, idx) => idx !== id);
                            setItem(newInfo);
                        }}
                        className="item-delete t-del text-center text-pd"
                    >
                        <img src={deleteIcon} alt="delete" />
                    </div>

                </div>
            </div>

        </>
    );
};
