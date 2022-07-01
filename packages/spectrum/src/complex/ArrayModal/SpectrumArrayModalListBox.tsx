import React from 'react';
import { ListBox } from '@adobe/react-spectrum';
import { SpectrumArrayModalItems } from './SpectrumArrayModalItems';
import { modalItemParentType } from '../../../types';

export const SpectrumArrayModalListBox: React.FC<modalItemParentType> = ({
  items,
  selectedIndex,
  setSelectedIndex,
}) => {
  const handleListBoxChange = (i: Selection) => {
    setSelectedIndex(i);
  };
  return (
    <ListBox
      aria-label='Select'
      items={items}
      margin='size-100'
      onSelectionChange={(keys: Selection): any => handleListBoxChange(keys)}
      selectedKeys={String(selectedIndex)}
      selectionMode='single'
      width='calc(100% - size-200)'
      maxHeight='size-2400'
    >
      <SpectrumArrayModalItems items={items} />
    </ListBox>
  );
};
