import * as React from 'react';
import { memo, ReactElement } from 'react';
import { capitalize } from 'lodash';

// Components
import Button from '@root/forms/Button';

// Styles
import {
	AddressTitle,
	ButtonsWrapper,
	StyledAddressCard,
} from './AddressCard.styled';

type Address = {
  address: string;
  city: string;
  country: { title: string, value: any};
  id: number;
  postalCode: string;
  state: { title: string, value: any};
  types: string[];
};

interface AddressCardProps {
  address: Address;
  onRemoveAddress?: (address) => void;
	onEdit?: (address) => void;
}

const AddressCard = (props: AddressCardProps): ReactElement => {
	const { address, onEdit, onRemoveAddress } = props;

	return (
		<StyledAddressCard data-testid='address-card-test'>
			<AddressTitle>{`${address.types.join(', ').replace(/\w+/g, capitalize)} Address`}</AddressTitle>
			<span>{address.address}</span>
			<span>{`${address.city}, ${address.state.title} ${address.postalCode}`}</span>
			<span>{address.country.title}</span>
			<ButtonsWrapper>
				<Button buttonType='blueText' onClick={() => onEdit(address)}>Edit</Button>
				<Button buttonType='redText' onClick={() => onRemoveAddress(address)}>
					Remove
				</Button>
			</ButtonsWrapper>
		</StyledAddressCard>
	);
};

export default memo(AddressCard);
