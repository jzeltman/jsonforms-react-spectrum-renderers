import React, { Key, useCallback } from 'react';
import { Picker } from '@adobe/react-spectrum';
import { SpectrumArrayModalItems } from './SpectrumArrayModalItems';
import { modalItemParentType } from '../../../types';

export const SpectrumArrayModalPicker: React.FC<modalItemParentType> = ({
  selectedIndex,
  setSelectedIndex,
  items,
}) => {
  const handlePickerChange = useCallback(
    (newOneOfIndex: Key) => {
      newOneOfIndex = Number(newOneOfIndex);
      setSelectedIndex(newOneOfIndex);
    },
    [setSelectedIndex]
  );

  return (
    <Picker
      aria-label='Select'
      margin='size-100'
      onSelectionChange={handlePickerChange}
      selectedKey={String(selectedIndex)}
      width='calc(100% - size-200)'
    >
      <SpectrumArrayModalItems items={items} />
    </Picker>
  );
};
