import React, { Key, useState } from 'react';
import { Picker } from '@adobe/react-spectrum';
import { SpectrumArrayModalItems } from './SpectrumArrayModalItems';
import {
  ItemsWithLabelsArrayObject,
  PickerUseStateSelectionTypes,
} from '../../../types';

export const SpectrumArrayModalPicker: React.FC<ItemsWithLabelsArrayObject> = ({
  items,
}) => {
  const [selected, setSelected]: PickerUseStateSelectionTypes = useState(0);
  const handleSelectionChange = (key: Key) => {
    setSelected(key);
    return;
  };

  return (
    <Picker
      aria-label='Select'
      margin='size-100'
      onSelectionChange={handleSelectionChange}
      selectedKey={selected}
      width='calc(100% - size-200)'
    >
      <SpectrumArrayModalItems items={items} />
    </Picker>
  );
};
