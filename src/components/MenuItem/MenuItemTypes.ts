import { MosaicObject } from "../../types";
import { SvgIconComponent } from "@mui/icons-material";

export interface MenuItemProps {
	label: string | JSX.Element
	color?: "red" | "blue"
	disabled?: boolean
	selected?: boolean
	onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
	mIcon?: SvgIconComponent
	attrs?: MosaicObject
}