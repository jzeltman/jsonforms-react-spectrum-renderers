/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import React from 'react';
import {
  CellProps,
  Formatted,
  isNumberFormatControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { SpectrumRendererProps } from '../index';
import { withVanillaCellProps } from '../util/index';
import { TextField } from '@adobe/react-spectrum';

export const SpectrumNumberFormatCell = (
  props: CellProps & SpectrumRendererProps & Formatted<number>
) => {
  const { id, label, enabled, uischema, path, handleChange, schema } = props;
  const maxLength = schema.maxLength;
  const formattedNumber: string = props.toFormatted(props.data);

  const onChange = (ev: any) => {
    const validStringNumber = props.fromFormatted(ev.currentTarget.value);
    handleChange(path, validStringNumber);
  };

  return (
    <TextField
      label={label}
      type='text'
      inputMode='numeric'
      value={formattedNumber}
      onChange={onChange}
      id={id}
      isDisabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      maxLength={maxLength}
    />
  );
};

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const spectrumNumberFormatCellTester: RankedTester = rankWith(
  4,
  isNumberFormatControl
);

export default withJsonFormsCellProps(
  withVanillaCellProps(SpectrumNumberFormatCell)
);
