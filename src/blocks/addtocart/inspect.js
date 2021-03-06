import SearchProduct from '../../components/searchproduct'
import IconList from './iconlist'

const { __ } = wp.i18n
const { Component } = wp.element
const { InspectorControls, ColorPalette } = wp.editor
const {
  PanelBody,
  PanelRow,
  FormToggle,
	PanelColor,
} = wp.components


export default class Inspector extends Component {

  render() {

		const { attributes: { productID, backgroundColor, hasIcon }, setAttributes } = this.props

		const onChangeProduct = product => {
			setAttributes( {
				productID: product.id,
				label: __( 'Add', 'advanced-gutenberg-blocks' ) + ' ' + product.title.rendered + ' ' + __( 'to cart', 'advanced-gutenberg-blocks' )
			} )
		}

    return (
      <InspectorControls>
				<PanelBody title={ __( 'Search Product', 'advanced-gutenberg-blocks' ) }>
          <SearchProduct
						onChange= { product => onChangeProduct( product ) }
					/>
        </PanelBody>

				<PanelColor
          title={ __( 'Background Color', 'advanced-gutenberg-blocks' ) }
          colorValue={ backgroundColor }
          >
          <ColorPalette
            value={ backgroundColor }
            onChange={ backgroundColor => setAttributes( { backgroundColor } ) }
          />
        </PanelColor>

        <PanelBody
          title={ __( 'Icon', 'advanced-gutenberg-blocks' ) }
        >
          <PanelRow>
            <label
              htmlFor="icon-form-toggle"
              className="blocks-base-control__label"
            >
              { __( 'Display Icon?', 'advanced-gutenberg-blocks' ) }
            </label>
            <FormToggle
              id="icon-form-toggle"
              label={ __( 'Display Icon?', 'advanced-gutenberg-blocks' ) }
              checked={ !! hasIcon }
              onChange={ hasIcon => setAttributes( { hasIcon: ! hasIcon } ) }
            />
          </PanelRow>

          {
            !! hasIcon && (
              <IconList
								onChange={ icon => setAttributes( { icon } ) }
							/>
            )
          }

        </PanelBody>

      </InspectorControls>
    )
  }
}
