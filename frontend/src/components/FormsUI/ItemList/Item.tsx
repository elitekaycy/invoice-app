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

export const Item: React.FC<ItemListType> = ({
  id,
  info,
  value,
  setItem,
}): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const [item, setNewItem] = useState(value);

  const { itemName, itemPrice, itemQuantity } = value;

  const parseMoney = (money: number): number => {
    console.log("type of money is ", typeof money, money)
    console.log(itemPrice, itemQuantity)

    return money
  }

  return (
    <>
      <tr className="">
        <td className='text-center'>
          <input
            required
            type="text"
            name="itemName"
            value={itemName}
            onChange={(e) => {
              const newInfo = { ...info };
              let itemsIndex = info?.items.findIndex((obj, idx) => idx === id);
              newInfo.items[itemsIndex]['itemName'] = e.target.value;
              setItem(newInfo);
            }}
            className={`item-name-input ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
              }`}
          />
        </td>
        <td className='text-center'>
          <input
            required
            type="string"
            className={`item-qty ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
              }`}
            value={itemQuantity}
            onChange={(e) => {
              const newInfo = { ...info };
              let itemsIndex = info?.items.findIndex((obj, idx) => idx === id);
              newInfo.items[itemsIndex]['itemQuantity'] = e.target.value;
              setItem(newInfo);
            }}
          />
        </td>
        <td className='text-center'>
          <input
            required
            type="number"
            className={`item-price ${theme?.theme === 'light' ? 'item-light' : 'item-dark'
              }`}
            value={itemPrice}
            onChange={(e) => {
              const newInfo = { ...info };
              let itemsIndex = info?.items.findIndex((obj, idx) => idx === id);
              newInfo.items[itemsIndex]['itemPrice'] = Number(e.target.value);
              setItem(newInfo);
            }}
          />
        </td>
        <td className='text-center'>
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
          className="item-delete text-center"
        >
          <img src={deleteIcon} alt="delete" />
        </td>
      </tr>
    </>
  );
};
