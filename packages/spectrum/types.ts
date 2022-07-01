import { Key } from 'react';

export type Selection = Set<Key>;

export type arrayWithLabels = [
  {
    label: string;
  }
];

export type ItemsWithLabelsArrayObject = {
  items: arrayWithLabels;
};

export type PickerUseStateSelectionTypes = [
  any,
  React.Dispatch<React.SetStateAction<any>>
];

export type ListBoxUseStateSelectionTypes = [
  any,
  React.Dispatch<React.SetStateAction<Set<any>>>
];
