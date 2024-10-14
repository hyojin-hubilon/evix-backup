import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material';

const BasicArrow = styled('div')(() => ({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	zIndex: '10',
	width: '30px',
	height: '30px',
	overflow: 'hidden',
	border: '0',
	background: 'rgba(0,0,0,0.1)',
	transition: 'background 0.2s',
	borderRadius: '50%',
	cursor: 'pointer',
	color: '#fff',

	'&:hover' : {
		background: 'rgba(0,0,0,0.3)',
		transition: 'background 0.2s',
	},

	'.MuiSvgIcon-root' : {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		fontSize: '17px'
	}

}))

export const SlickPrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<BasicArrow
			className={className}
			style={{ left:'-10px', ...style }}
			onClick={onClick}
		>
			<KeyboardArrowLeftIcon />
		</BasicArrow>
	);
}

export const SlickNextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<BasicArrow
			className={className}
			style={{ right: '-10px', ...style }}
			onClick={onClick}
		>
			<KeyboardArrowRightIcon />
		</BasicArrow>
	);
}
  
