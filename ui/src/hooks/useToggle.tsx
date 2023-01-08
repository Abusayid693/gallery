import {useState} from 'react';

/**
 * @returns [isOpen, toggle, setOpen, setClose]
 */

export const useToggle = (): [boolean, () => void, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const setClose = () => setIsOpen(false);
  const setOpen = () => setIsOpen(true);
  const toggle = () => setIsOpen(prev => !prev);

  return [isOpen, toggle, setOpen, setClose];
};
