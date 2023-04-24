import React from 'react';
import './Item.css';
import { Item } from './Item';
import {
  FillFormType,
  FillFormTypeError,
} from '../../SideBarModalUI/SidebarTypes';

type ItemType = {
  info: FillFormType;
  error: FillFormTypeError;
  setItemArray: any;
};

export const ItemListContainer: React.FC<ItemType> = ({
  info,
  error,
  setItemArray,
}: ItemType): JSX.Element => {
  return (
    <div className="item-list-container">
      <div className="item-header">
        <span className="invoice-body-1 label itm-name">Item name</span>
        <span className="invoice-body-1 label itm-qty">Qty.</span>
        <span className="invoice-body-1 label itm-price">Item Price</span>
        <span className="invoice-body-1 label itm-total">Total</span>
      </div>

      {info?.items &&
        info?.items.map((item, idx) => (
          <Item
            key={idx}
            id={idx}
            error={error}
            info={info}
            value={item}
            setItem={setItemArray}
          />
        ))}
    </div>
  );
};
