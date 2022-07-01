import React from 'react';
import { Item } from '@adobe/react-spectrum';
import { arrayWithLabels } from '../../../types';

export const SpectrumArrayModalItems: React.FC<{
  items: arrayWithLabels;
}> = ({ items }) => (
  <>
    {items.map(({ label }, i) => (
      <Item key={i}>{label}</Item>
    ))}
  </>
);
