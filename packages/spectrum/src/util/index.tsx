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
import isEmpty from 'lodash/isEmpty';
import {
  ControlElement,
  convertToValidClassName,
  getConfig,
  JsonFormsState,
  OwnPropsOfCell,
  OwnPropsOfControl,
  OwnPropsOfRenderer,
  RendererProps,
  StatePropsOfCell,
  StatePropsOfControl
} from '@jsonforms/core';
import { useJsonForms } from '@jsonforms/react';
import { getStyle, getStyleAsClassName } from '../reducers';
import { VanillaRendererProps } from '../index';
import { ComponentType } from 'react';
import { findStyle, findStyleAsClassName } from '../reducers/styling';

/**
 * A style associates a name with a list of CSS class names.
 */
export interface StyleDef {
  name: string;
  classNames: string[] | ((...args: any[]) => string[]);
}

/**
 * Add vanilla props to the return value of calling the given
 * mapStateToProps function.
 *
 * @param mapStateToProps existing mapStateToProps function
 * @returns {VanillaControlStateProps} vanilla-specific control props
 */
export const addVanillaControlProps = <P extends StatePropsOfControl>(
  mapStateToProps: (s: JsonFormsState, p: OwnPropsOfControl) => P
) => (
  state: JsonFormsState,
  ownProps: OwnPropsOfControl
): StatePropsOfControl & VanillaRendererProps => {
    const props: StatePropsOfControl = mapStateToProps(state, ownProps);
    const config = getConfig(state);
    const trim = config.trim;
    const controlElement = props.uischema as ControlElement;
    const isValid = isEmpty(props.errors);
    const styles = getStyle(state)('control');
    let classNames: string[] = !isEmpty(controlElement.scope)
      ? styles.concat([`${convertToValidClassName(controlElement.scope)}`])
      : [''];

    if (trim) {
      classNames = classNames.concat(getStyle(state)('control.trim'));
    }
    const labelClass = getStyleAsClassName(state)('control.label');
    const descriptionClassName = getStyleAsClassName(state)('input.description');
    const inputClassName = ['validate'].concat(isValid ? 'valid' : 'invalid');

    return {
      ...props,
      getStyleAsClassName: getStyleAsClassName(state),
      getStyle: getStyle(state),
      classNames: {
        wrapper: classNames.join(' '),
        input: inputClassName.join(' '),
        label: labelClass,
        description: descriptionClassName
      }
    };
  };

export const withVanillaControlProps = (Component: ComponentType<any>) => (props: any) => {
  const ctx = useJsonForms();
  const controlElement = props.uischema as ControlElement;
  const config = ctx.config;
  const trim = config && config.trim;
  const styles = findStyle(ctx.styles)('control');
  let classNames: string[] = !isEmpty(controlElement.scope)
    ? styles.concat([`${convertToValidClassName(controlElement.scope)}`])
    : [''];

  if (trim) {
    classNames = classNames.concat(findStyle(ctx.styles)('control.trim'));
  }
  const isValid = isEmpty(props.errors);
  const labelClass = findStyleAsClassName(ctx.styles)('control.label');
  const descriptionClassName = findStyleAsClassName(ctx.styles)('input.description');
  const inputClassName = ['validate'].concat(isValid ? 'valid' : 'invalid');
  return (
    <Component
      {...props}
      getStyleAsClassName={findStyleAsClassName(ctx.styles)}
      getStyle={findStyle(ctx.styles)}
      classNames={{
        wrapper: classNames.join(' '),
        input: inputClassName.join(' '),
        label: labelClass,
        description: descriptionClassName
      }}
    />
  );
}

/**
 * Add vanilla props to the return value of calling the given
 * mapStateToProps function.
 *
 * @param mapStateToProps an existing mapStateToProps function for retrieving layout props
 * @returns {VanillaLayoutProps} vanilla specific layout props
 */
export const addVanillaLayoutProps = (
  mapStateToProps: (s: JsonFormsState, p: OwnPropsOfRenderer) => RendererProps
) => (
  state: JsonFormsState,
  ownProps: OwnPropsOfRenderer
): RendererProps & VanillaRendererProps => {
    const props = mapStateToProps(state, ownProps);

    return {
      ...props,
      getStyleAsClassName: getStyleAsClassName(state),
      getStyle: getStyle(state)
    };
  };

export const addVanillaCellProps = (
  mapStateToCellsProps: (
    s: JsonFormsState,
    p: OwnPropsOfCell
  ) => StatePropsOfCell
) => (
  state: JsonFormsState,
  ownProps: OwnPropsOfCell
): StatePropsOfCell & VanillaRendererProps => {
    const props = mapStateToCellsProps(state, ownProps);
    const inputClassName = ['validate'].concat(
      props.isValid ? 'valid' : 'invalid'
    );
    return {
      ...props,
      className: inputClassName.join(' '),
      getStyleAsClassName: getStyleAsClassName(state),
      getStyle: getStyle(state)
    };
  };

const withVanillaCellPropsForType = (type: string) => (
  Component: ComponentType<any>
) => (props: any) => {
  const ctx = useJsonForms();
  const inputClassName = ['validate'].concat(
    props.isValid ? 'valid' : 'invalid'
  );
  const definedStyle = findStyleAsClassName(ctx.styles)(type);
  if (definedStyle) {
    inputClassName.push(definedStyle);
  }

  return (
    <Component
      {...props}
      getStyleAsClassName={findStyleAsClassName(ctx.styles)}
      getStyle={findStyle(ctx.styles)}
      className={inputClassName.join(' ')}
    />
  );
};

export const withVanillaCellProps = withVanillaCellPropsForType(
  'control.input'
);

export const withVanillaEnumCellProps = withVanillaCellPropsForType(
  'control.select'
);

/**
 * Pre-defined vanilla styles.
 *
 * @type {{name: string; classNames: string[]}[]}
 */
export const vanillaStyles = [
  {
    name: 'control',
    classNames: ['control']
  },
  {
    name: 'control.trim',
    classNames: ['trim']
  },
  {
    name: 'control.input',
    classNames: ['input']
  },
  {
    name: 'control.select',
    classNames: ['select']
  },
  {
    name: 'control.validation',
    classNames: ['validation']
  },
  {
    name: 'categorization',
    classNames: ['categorization']
  },
  {
    name: 'categorization.master',
    classNames: ['categorization-master']
  },
  {
    name: 'categorization.detail',
    classNames: ['categorization-detail']
  },
  {
    name: 'category.group',
    classNames: ['category-group']
  },
  {
    name: 'array.layout',
    classNames: ['array-layout']
  },
  {
    name: 'array.children',
    classNames: ['children']
  },
  {
    name: 'group.layout',
    classNames: ['group-layout']
  },
  {
    name: 'horizontal.layout',
    classNames: ['horizontal-layout']
  },
  {
    name: 'horizontal.layout.item',
    classNames: ([size]: number[]) => [`horizontal-layout-${size}`]
  },
  {
    name: 'vertical.layout',
    classNames: ['vertical-layout']
  },
  {
    name: 'array.table',
    classNames: ['array-table-layout', 'control']
  },
  {
    name: 'input.description',
    classNames: ['input-description']
  }
];