import * as React from "react";
import { memo, ReactElement } from "react";

// Styled components
import styled from "styled-components";

// Utils
import theme, { BREAKPOINTS, Views } from "@root/theme/theme";

const BIG_SCREEN_BREAKPOINT = BREAKPOINTS.topComponent.bigScreenView + "px";

export const FormTitle = styled.span`
	font-family: ${theme.museoFont};
	color: ${theme.newColors.almostBlack["100"]};
	font-size: ${pr => pr.type && pr.type === Views.drawer ? "20px" : "28px"};
	font-weight: ${pr => pr.type === Views.drawer ? theme.fontWeight.normal : theme.fontWeight.light};

	@media (max-width: ${theme.breakpoints.mobile}) {
		margin: 0;
	}
`;

const Description = styled.span`
	color: ${theme.newColors.grey3["100"]};
	font-family: ${theme.museoFont};
	font-weight: ${theme.fontWeight.light};
	font-size: 14px;
	margin-top: 5px;

	@media (max-width: ${theme.breakpoints.mobile}) {
		align-self: center;
	}
`;

export const TitleRow = styled.div`
	display: flex;
	font-family: ${theme.fontFamily};
	${pr => pr.view === Views.mobile ?
		`flex-direction: row;
		justify-content: space-between;

		@media (min-width: ${BIG_SCREEN_BREAKPOINT}) {
			justify-content: flex-start;
		}
		padding: 20px;
		`
		:
		`
		flex-direction: column;
		margin-right: auto;
		`
}
`;

type TitleWrapperProps = {
	title: string;
	description: string;
	view: string
}

const TitleWrapper = (props: TitleWrapperProps): ReactElement => {
	const {
		title,
		description,
		view,
	} = props;

	return (
		<TitleRow view={view}>
			<FormTitle>{title}</FormTitle>
			{description && <Description>{description}</Description>}
		</TitleRow>
	);
};

export default memo(TitleWrapper);
