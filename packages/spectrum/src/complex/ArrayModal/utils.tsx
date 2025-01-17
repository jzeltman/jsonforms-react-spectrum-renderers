/*
  The MIT License

  Copyright (c) 2020 headwire.com, Inc
  https://github.com/headwirecom/jsonforms-react-spectrum-renderers

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
import { ErrorObject } from 'ajv';
import Add from '@spectrum-icons/workflow/Add';
import { UISchemaElement } from '@jsonforms/core';
import {
  ActionButton,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
  Header,
  Flex,
  Heading,
} from '@adobe/react-spectrum';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import SpectrumProvider from '../../additional/SpectrumProvider';

export function getUIOptions(
  uischema: UISchemaElement,
  defaultLabel: string
): UIOptions {
  return {
    addButtonPosition:
      uischema.options?.addButtonPosition === 'bottom' ? 'bottom' : 'top',
    addButtonLabel:
      uischema.options?.addButtonLabel || `Add to ${defaultLabel}`,
    addButtonLabelType:
      uischema.options?.addButtonLabelType === 'inline' ? 'inline' : 'tooltip',
  };
}

export function AddButton(
  props: Pick<UIOptions, 'addButtonLabel' | 'addButtonLabelType'> & {
    onPress: () => void;
  }
) {
  const { addButtonLabel, addButtonLabelType, onPress } = props;
  const button = (
    <SpectrumProvider>
      <ActionButton UNSAFE_className='add-button' onPress={onPress}>
        <Add aria-label='Add' />
        {addButtonLabelType === 'inline' && <Text>{addButtonLabel}</Text>}
      </ActionButton>
    </SpectrumProvider>
  );

  return addButtonLabelType === 'tooltip' ? (
    <SpectrumProvider>
      <TooltipTrigger delay={0}>
        {button}
        <Tooltip>{addButtonLabel}</Tooltip>
      </TooltipTrigger>
    </SpectrumProvider>
  ) : (
    button
  );
}

export function ArrayHeader(
  props: UIOptions & {
    add: () => void;
    labelText: string;
    allErrorsMessages: string[];
  }
) {
  return (
    <Header>
      <Flex direction='row' alignItems='center' justifyContent='space-between'>
        <Heading level={4}>{props.labelText}</Heading>
        <View marginEnd='auto'>
          {props.allErrorsMessages.length ? (
            <ErrorIndicator
              errors={props.allErrorsMessages.map((message, index) => (
                <React.Fragment key={`${message}-${index}`}>
                  {message}
                  <br />
                  {index === props.allErrorsMessages.length - 1 ? null : <br />}
                </React.Fragment>
              ))}
            />
          ) : null}
        </View>
        {props.addButtonPosition === 'top' && (
          <AddButton {...props} onPress={props.add} />
        )}
      </Flex>
    </Header>
  );
}

export function ArrayFooter(props: UIOptions & { add: () => void }) {
  return props.addButtonPosition === 'bottom' ? (
    <View paddingTop='size-125'>
      <AddButton {...props} onPress={props.add} />
    </View>
  ) : null;
}

interface UIOptions {
  addButtonPosition: 'top' | 'bottom';
  addButtonLabel?: string;
  addButtonLabelType: 'tooltip' | 'inline';
}

export function getChildError(e: ErrorObject[], path: string) {
  const childPropErrors = e.filter(
    (localError) => localError.dataPath === path
  );

  if (childPropErrors.length > 0) {
    // TODO: is it possible to have multiple errors on a property?
    return childPropErrors[0].message;
  } else {
    return '';
  }
}

export let indexOfFittingSchemaObject: any = {};
