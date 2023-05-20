import React, { useContext, useState } from 'react';
import './Item.css';
import { ThemeContextDefault } from '../../../context/ThemeContext';
import deleteIcon from '../../../assets/icon-delete.svg';
import {
  FillFormType,
  FillFormTypeError,
  ItemType,
} from '../../SideBarModalUI/SidebarTypes';
import { InvoiceGetFromClientType } from '../../SideBarModalUI/SidebarTypes';

type ItemListType = {
  key: number;
  id: number;
  error: FillFormTypeError;
  info: FillFormType;
  value: ItemType;
  setItem: any;
};

export const Item: React.FC<ItemListType> = ({
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
      <tr className="item-tr">
        <td className='text-center text-pd'>
          <input
            required
            type="text"
            value={itemName}
            onChange={(e) => handleItemsChange(e, "itemName")}
            className={`item-name-input ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
              }`}
          />
        </td>
        <td className='text-center text-pd'>
          <input
            required
            type="string"
            className={`item-qty ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
              }`}
            value={itemQuantity}
            onChange={(e) => handleItemsChange(e, "itemQuantity")}
          />
        </td>
        <td className='text-center text-pd'>
          <input
            required
            type="number"
            className={`item-price ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
              }`}
            value={itemPrice}
            onChange={(e) => handleItemsChange(e, "itemPrice")}
          />
        </td>
        <td className='text-center text-pd'>
          <span
            className={`invoice-h3-small ${theme?.theme === 'light' ? 'text-light' : 'text-dark'
              }`}
          >
            {Number(itemQuantity) * itemPrice}
          </span>
        </td>
        <td
          onClick={() => {
            const newInfo = { ...info };
            newInfo.items = newInfo?.items.filter((item, idx) => idx !== id);
            setItem(newInfo);
          }}
          className="item-delete text-center text-pd"
        >
          <img className="itm-del" src={deleteIcon} alt="delete" />
        </td>
      </tr>
    </>
  );
};
