import React, { useContext, useState } from 'react';
import './Item.css';
import { ThemeContextDefault } from '../../../context/ThemeContext';
import deleteIcon from '../../../assets/icon-delete.svg';
import {
  FillFormType,
  FillFormTypeError,
  ItemType,
} from '../../SideBarModalUI/SidebarTypes';

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

  return (
    <div className="item">
      <div>
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
          className={`item-name-input ${
            theme?.theme === 'light' ? 'item-light' : 'item-dark'
          }`}
        />
      </div>
      <div>
        <input
          required
          type="string"
          className={`item-qty ${
            theme?.theme === 'light' ? 'item-light' : 'item-dark'
          }`}
          value={itemQuantity}
          onChange={(e) => {
            const newInfo = { ...info };
            let itemsIndex = info?.items.findIndex((obj, idx) => idx === id);
            newInfo.items[itemsIndex]['itemQuantity'] = e.target.value;
            setItem(newInfo);
          }}
        />
      </div>
      <div>
        <input
          required
          type="number"
          className={`item-price ${
            theme?.theme === 'light' ? 'item-light' : 'item-dark'
          }`}
          value={itemPrice}
          onChange={(e) => {
            const newInfo = { ...info };
            let itemsIndex = info?.items.findIndex((obj, idx) => idx === id);
            newInfo.items[itemsIndex]['itemPrice'] = Number(e.target.value);
            setItem(newInfo);
          }}
        />
      </div>
      <div>
        <span
          className={`invoice-h3-small ${
            theme?.theme === 'light' ? 'text-light' : 'text-dark'
          }`}
        >
          {Number(itemQuantity) * itemPrice}
        </span>
      </div>
      <div
        onClick={() => {
          const newInfo = { ...info };
          newInfo.items = newInfo?.items.filter((item, idx) => idx !== id);
          setItem(newInfo);
        }}
        className="item-delete"
      >
        <img src={deleteIcon} alt="delete" />
      </div>
    </div>
  );
};
