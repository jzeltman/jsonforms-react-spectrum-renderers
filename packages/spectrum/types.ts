import React from 'react';

export type arrayWithLabels = [
  {
    label: string;
  }
];

export type modalItemParentType = {
  items: arrayWithLabels;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};
