import { observer } from 'mobx-react-lite';
import { Button } from '@primer/react';
import './ButtonIcon.scss';

interface ButtonIconProps {
  children: React.ReactNode;
  icon?: React.ElementType;
}
const ButtonIconComponent: React.FC<ButtonIconProps> = (props) => {
  const {
    children,
    icon,
  } = props;


  return (
    <Button
      className='button-icon-container'
      variant='invisible'
      style={{
        width: '100%',
      }}
      size='small'
    >
      {children}
    </Button>
  );
};



export const ButtonIcon = observer(ButtonIconComponent);
