import * as React from 'react';
import { ReactElement, memo } from 'react';

// Types and styles
import { MosaicFieldProps } from '@root/components/Field';
import { FormFieldCheckboxDef } from './FormFieldCheckboxTypes';
import { StyledCheckboxList } from './FormFieldCheckbox.styled';

const FormFieldCheckbox = (
	props: MosaicFieldProps<FormFieldCheckboxDef>
): ReactElement => {
	const {
		fieldDef,
		onChange,
		onBlur,
		value
	} = props;

	return (
		<StyledCheckboxList
			disabled={fieldDef?.disabled}
			checked={value}
			options={fieldDef.inputSettings?.options}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

export default memo(FormFieldCheckbox);
