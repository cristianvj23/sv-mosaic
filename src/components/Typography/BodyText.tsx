import * as React from "react";
import styled from "styled-components";

import { TypographyGenericProps } from "./TypographyTypes";
import theme from "../../utils/theme";

const Styled = styled.span`
	font-family: ${theme.fontFamily};
	font-size: 14px;
	color: ${theme.colors.black};
`

export default function BodyText(props: TypographyGenericProps) {
	const {
		children,
		attrs = {},
		...remaining
	} = props;

	return (
		<Styled
			{...attrs}
			{...remaining}
		>{props.children}</Styled>
	)
}