import * as React from 'react';
import { memo, useState, useMemo, ReactElement, MouseEvent } from 'react';

// Components
import Button from '@root/forms/Button';

// Types
import { AssetProperties, ImageVideoDocumentLinkBrowsingDef } from '.';
import { MosaicFieldProps } from '@root/components/Field';
import {
	AssetCard,
	AssetLabel,
	AssetLabelTooltip,
	AssetPropertiesColumn,
	AssetValue,
	BrowseOptionsContainer,
	BrowseSpan,
	BrowsingContainer,
	ButtonsWrapper,
	Column,
	ImageVideoLinkDocumentBrowsingContainer,
	MenuColumn,
	MoreText,
	StyledAnchor,
	StyledImg,
	StyledTooltip,
	TableRow,
	Td,
} from './ImageVideoLinkDocumentBrowsing.styled';

// Components
import MenuFormFieldCard from '@root/forms/MenuFormFieldCard';
import BrowseOption from './BrowseOption';

const DOCUMENT = 'document';
const IMAGE = 'image';
const LINK = 'link';
const VIDEO = 'video';

const ImageVideoLinkDocumentBrowsing = (
	props: MosaicFieldProps<ImageVideoDocumentLinkBrowsingDef, AssetProperties[]>
): ReactElement => {
	const { fieldDef, value } = props;

	// State variables
	const [assetType, setAssetType] = useState('');

	/**
	 * The Browse button should execute the function
	 * corresponding to the asset that was loaded.
	 */
	const handleBrowse = (e: MouseEvent<HTMLElement>, assetType: string) => {
		e.preventDefault();
		switch (assetType) {
		case DOCUMENT:
			fieldDef?.inputSettings?.handleSetDocument();
			break;

		case VIDEO:
			fieldDef?.inputSettings?.handleSetVideo();
			break;

		case LINK:
			fieldDef?.inputSettings?.handleSetLink();
			break;

		default:
			fieldDef?.inputSettings?.handleSetImage();
			break;
		}
		setAssetType(assetType);
	};

	/**
	 * Executes the remove function that comes from the
	 * Form component. This function sets the Form field value
	 * to an empty array.
	 * @param e click event
	 */
	const handleRemove = (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		fieldDef?.inputSettings?.handleRemove();
	};

	const tootltipContent = useMemo(
		() =>
			Array.isArray(value) &&
			value?.map((property) => (
				<TableRow key={`${property.label}-${property.value}`}>
					<Td>
						<AssetLabelTooltip>{property.label}</AssetLabelTooltip>
					</Td>
					<Td>{property.value}</Td>
				</TableRow>
			)),
		[value]
	);

	// Only show the first four asset's properties on the card
	const assetPropertiesRows = useMemo(
		() =>
			Array.isArray(value) &&
			value?.slice(0, 4).map((property, idx) => (
				<TableRow key={`${property.label}-${property.value}`}>
					<Td>
						<AssetLabel>{property.label}</AssetLabel>
					</Td>
					<Td>
						{property.label === 'URL' ? (
							<StyledAnchor href={property.value}>
								{property.value}
							</StyledAnchor>
						) : (
							<AssetValue>{property.value}</AssetValue>
						)}
						{idx === 3 && value.length > 4 && (
							<>
								<AssetValue>...</AssetValue>
								<StyledTooltip
									placement='top'
									text={
										<table>
											<tbody>{tootltipContent}</tbody>
										</table>
									}
									type='advanced'
								>
									<MoreText>More</MoreText>
								</StyledTooltip>
							</>
						)}
					</Td>
				</TableRow>
			)),
		[value]
	);

	const hasOptions =
		fieldDef?.inputSettings?.handleSetImage ||
		fieldDef?.inputSettings?.handleSetVideo ||
		fieldDef?.inputSettings?.handleSetDocument ||
		fieldDef?.inputSettings?.handleSetLink;

	return (
		<ImageVideoLinkDocumentBrowsingContainer>
			{(Array.isArray(value) && value?.length === 0) || !value ? (
				<BrowsingContainer>
					<BrowseSpan>{ !hasOptions ? 'No browsing options' : 'Browse:'}</BrowseSpan>
					<BrowseOptionsContainer>
						{fieldDef?.inputSettings?.handleSetImage && (
							<BrowseOption disabled={fieldDef?.disabled} handleBrowse={handleBrowse} assetType='image'/>
						)}
						{fieldDef?.inputSettings?.handleSetVideo && (
							<BrowseOption disabled={fieldDef?.disabled} handleBrowse={handleBrowse} assetType='video'/>
						)}
						{fieldDef?.inputSettings?.handleSetDocument && (
							<BrowseOption disabled={fieldDef?.disabled} handleBrowse={handleBrowse} assetType='document'/>
						)}
						{fieldDef?.inputSettings?.handleSetLink && (
							<BrowseOption disabled={fieldDef?.disabled} handleBrowse={handleBrowse} assetType='link'/>
						)}
					</BrowseOptionsContainer>
				</BrowsingContainer>
			) : (
				<AssetCard>
					{fieldDef?.inputSettings?.src &&
						!(assetType === DOCUMENT || assetType === LINK) && (
						<Column>
							<StyledImg
								src={fieldDef?.inputSettings?.src}
								data-testid='image-test'
								width={257}
								height={168}
							/>
						</Column>
					)}
					<AssetPropertiesColumn 
						hasImage={fieldDef?.inputSettings?.src && (assetType === IMAGE || assetType === VIDEO)}
					>
						<table>
							<tbody>{assetPropertiesRows}</tbody>
						</table>
					</AssetPropertiesColumn>
					{fieldDef?.inputSettings?.options && (
						<MenuColumn>
							<MenuFormFieldCard
								disabled={fieldDef?.disabled}
								options={fieldDef?.inputSettings?.options}
							/>
						</MenuColumn>
					)}
					<ButtonsWrapper>
						<Button
							buttonType='blueText'
							disabled={fieldDef?.disabled}
							onClick={(e) => handleBrowse(e, assetType)}
						>
							Browse
						</Button>
						<Button
							buttonType='redText'
							disabled={fieldDef?.disabled}
							onClick={(e) => handleRemove(e)}
						>
							Remove
						</Button>
					</ButtonsWrapper>
				</AssetCard>
			)}
		</ImageVideoLinkDocumentBrowsingContainer>
	);
};

export default memo(ImageVideoLinkDocumentBrowsing);
