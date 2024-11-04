import { styled } from "@mui/material";


export const Item = styled('div', {
	shouldForwardProp: (prop) => prop !== "isDragging"
})<{isDragging : boolean}>(({isDragging}) => ({
	display: 'flex',
	userSelect: 'none',
	padding: '0.5rem',
	margin: '0 0  0.5rem 0',
	alignItems: 'flex-start',
	alignContent: 'flex-start',
	lineHeight: '1.5',
	borderRadius: '4px',
	background: '#fff',
	border: isDragging ? '1px dashed #000' : '1px solid #ddd',
	boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
	
}))

export const Clone = styled(Item)`
	+ div {
		transform: none!important;
		margin: 0 0 0.5rem!important;

		:last-child {
			display:none!important;
		}

		~ div {
		transform: none!important;
		margin: 0 0 0.5rem!important;

			&:last-child {
				display:none!important;
			}
		}		
  	}
`;


export const AddedItem = styled('div', {
	shouldForwardProp: (prop) => prop !== "isDragging"
})<{isDragging : boolean}>(({isDragging}) => ({
	display: 'flex',
	userSelect: 'none',
	margin: '0 0  0.5rem 0',
	alignItems: 'flex-start',
	alignContent: 'flex-start',
	lineHeight: '1.7',
	borderRadius: '3px',
	background: '#fff',
	border: isDragging ? '1px dashed #000' : '1px solid #ddd',
	'&:last-child' : {
		marginBottom : '0!important'
	}
}))


export const Handle = styled('div')`
	display: flex;
	align-items: flex-start;
	align-content: center;
	user-select: none;
	padding: 0.5rem;
	line-height: 1.5;
	border-radius: 3px 0 0 3px;
	background: #fff;
	border-right: 1px solid #ddd;
	color: #000;
	align-self: stretch;
`;

export const ItemContent = styled("div", {
	shouldForwardProp: (prop) => prop !== "isDraggingOver"
})<{ isDraggingOver?: boolean}>(
	({ theme, isDraggingOver }) => ({
		borderRadius: '3px',
		padding: '0.5rem',
		cursor: 'pointer',
		alignSelf: 'stretch',
		flex: 1,
		position:'relative'
}))

export const List = styled("div", {
		shouldForwardProp: (prop) => prop !== "isDraggingOver"
	})<{ isDraggingOver?: boolean}>(
		({ theme, isDraggingOver }) => ({
			border: isDraggingOver ? '1px dashed #000' : '1px solid #ddd',
			background: 'fff',
			padding: '0.5rem 0.5rem 0',
			borderRadius: '3px'
	}))
		
// flex: 0 0 150px;

export const Kiosk = styled("div", {
	shouldForwardProp: (prop) => prop !== "isDraggingOver"
})<{ isDraggingOver?: boolean}>(
	({ theme, isDraggingOver }) => ({
		border: isDraggingOver ? '1px dashed #000' : '1px solid #ddd',
		background: '#fff',
		borderRadius: '5px',
		padding: '1rem 1rem 0.5rem'
}))



export const DropBox = styled(List)`
	background: white;
  	margin: 0 0 0.5rem 0;
	padding: 1rem;
	min-height: 20px;
	border-radius: 5px;
`;

export const Notice = styled('div')`
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	padding: 1rem;
	margin: 0 0.5rem 0.5rem;
	border: 1px solid transparent;
	line-height: 1.5;
	color: #aaa;
`;

export const EditBox = styled('div')`
	background: white;
	padding: 1rem;
	border: 1px solid #ddd;
	border-radius: 5px;
`

export const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});