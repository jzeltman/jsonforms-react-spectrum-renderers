import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContainer,
  Divider,
  Heading,
} from '@adobe/react-spectrum';
import React, { useState } from 'react';
import { arrayWithLabels } from '../../../types';
import { SpectrumArrayModalListBox } from './SpectrumArrayModalListBox';
import { SpectrumArrayModalPicker } from './SpectrumArrayModalPicker';

export const SpectrumArrayModal = ({
  oneOfRenderInfos,
  usePickerInsteadOfListBox: isPicker,
}: {
  oneOfRenderInfos: arrayWithLabels;
  usePickerInsteadOfListBox: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOnConfirm = () => {
    handleClose();
  };

  return (
    <DialogContainer onDismiss={handleClose}>
      {open && (
        <Dialog>
          <div style={{ gridColumn: '1 / -1' }}>
            <Heading margin='size-100'>Add a new item</Heading>
            <Divider />
            {isPicker ? (
              <SpectrumArrayModalPicker items={oneOfRenderInfos} />
            ) : (
              <SpectrumArrayModalListBox items={oneOfRenderInfos} />
            )}
          </div>
          <ButtonGroup>
            <Button variant='secondary' onPress={handleClose}>
              Cancel
            </Button>
            <Button variant='cta' onPress={handleOnConfirm} autoFocus>
              Confirm
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogContainer>
  );
};
