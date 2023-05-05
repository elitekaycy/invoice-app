import React from 'react';
import './Item.css';
import { Item } from './Item';
import {
  FillFormType,
  FillFormTypeError,
} from '../../SideBarModalUI/SidebarTypes';
import { AddNewItem } from '../../ButtonsUI/AddNewItem';

type ItemType = {
  info: FillFormType;
  fieldError: { field: boolean, item: boolean },
  error: FillFormTypeError;
  setItemArray: any;
};

export const ItemListContainer: React.FC<ItemType> = ({
  info,
  error,
  setItemArray,
  fieldError
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

      <AddNewItem
        handleClick={() => {
          const newInfo: FillFormType = { ...info };
          newInfo.items = [
            ...newInfo?.items,
            {
              itemName: '',
              itemPrice: 0,
              itemQuantity: '',
            },
          ];

          setItemArray(newInfo);
        }}
      />

      {!fieldError.field && <div className='invoice-body-1 item-error'>- all field must be filled</div>}
      {fieldError.item && <div className='invoice-body-1 item-error'>- an item must be added</div>}


    </div>
  );
};
