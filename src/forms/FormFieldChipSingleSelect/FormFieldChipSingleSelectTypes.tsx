import { MosaicLabelValue } from "@root/types";

export type FormFieldChipSingleSelectDef = {
	/**
  	* Array of objects containing each of the options to be displayed within the dropdown.
  	*/
	options?: SelectableOption[];
	/**
	 * Used to get the selected options on the parent component.
	 */
	getOptions?: () => Promise<MosaicLabelValue[]>;
	/**
	* Function to be executed as callback when an option is selected
	*/
	onSelect?: (...args) => void;
}

interface SelectableOption extends MosaicLabelValue {
	/**
	 * Indicates whether the current option is selected or not
	 */
	selected?: boolean;
}
