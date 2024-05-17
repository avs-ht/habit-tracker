import styles from './widthContainer.module.scss'

interface IProps {
	children: React.ReactNode
	width?: number
	paddingInline?: number
}
type TypeCustomWidth = { [key: string]: string } | undefined

export const WidthContainer = ({
	children,
	width = 0,
	paddingInline = 20,
}: IProps) => {
	const customWidth: TypeCustomWidth =
		width === 0
			? {
					'--custom-width': `100%`,
					paddingInline: `${paddingInline}px`,
				}
			: {
					'--custom-width': `${width}px`,
					paddingInline: `${paddingInline}px`,
				}

	return (
		<div style={customWidth} className={styles.container}>
			{children}
		</div>
	)
}
