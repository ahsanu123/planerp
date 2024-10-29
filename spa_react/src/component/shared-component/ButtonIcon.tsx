import { observer } from 'mobx-react-lite';
import { Button, Text } from '@primer/react';
import './ButtonIcon.scss';

interface ButtonIconProps {
  children: React.ReactNode;
  icon?: JSX.Element;
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
      block
      size='small'
    >
      {icon}
      <Text>
        {' '}
        {children}
      </Text>
    </Button>
  );
};



export const ButtonIcon = observer(ButtonIconComponent);
