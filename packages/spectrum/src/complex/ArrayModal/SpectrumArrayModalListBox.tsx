import React, { useState } from 'react';
import { ListBox } from '@adobe/react-spectrum';
import { SpectrumArrayModalItems } from './SpectrumArrayModalItems';
import {
  ItemsWithLabelsArrayObject,
  ListBoxUseStateSelectionTypes,
  Selection,
} from '../../../types';

export const SpectrumArrayModalListBox: React.FC<ItemsWithLabelsArrayObject> = ({
  items,
}) => {
  const [selected, setSelected]: ListBoxUseStateSelectionTypes = useState(
    new Set([0])
  );
  const handleSelectionChange = (keys: Selection) => {
    setSelected(keys);
    return;
  };

  return (
    <ListBox
      aria-label='Select'
      items={items}
      margin='size-100'
      onSelectionChange={handleSelectionChange}
      selectedKeys={selected}
      selectionMode='single'
      width='calc(100% - size-200)'
      maxHeight='size-2400'
    >
      <SpectrumArrayModalItems items={items} />
    </ListBox>
  );
};
