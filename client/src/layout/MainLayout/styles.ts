import { Box, styled } from "@mui/material"

export const Triangle = styled(Box)(() => ({
	width: '0px',
	height: '0px',
	borderStyle: 'solid',
	borderWidth: '8px 8px 8px 0',
	borderColor: 'transparent #22ABF3 transparent transparent',
	position: 'absolute',
}))

export const OrangeTriangle = styled(Triangle)(() => ({
	borderColor: 'transparent #FF8A00 transparent transparent'
}))


export const BlueBox = styled(Box)(() => ({
	background: '#22ABF3',
	padding:'24px 24px 22px 24px',
	borderRadius: '12px',
	color: 'white',
	maxWidth: '416px',
	boxShadow: '0px 6px 10px 0px #0072AE54',
	'h5' : {		
		fontWeight:'700',
		fontSize: '15px',
		lineHeight : '1',
		margin:'0 0 12px'
	},
	'h6' : {		
		fontWeight:'700',
		fontSize: '14px',
		lineHeight : '1',
		margin:'0 0 5px'
	},
	'p': {
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '19.6px',
		margin: 0
	},
	'.btn-box': {
		marginTop:'12px',
		display: 'flex',
		justifyContent: 'flex-end',
		gap: '14px'
	},
	'button': {
		borderRadius: '50px',
		fontSize: '14px',
		fontWeight: '400',
		height: '32px',
		width: '90px',
		textAlign: 'center',
		opacity: '0.7',
		transition: 'opacity 0.3s'
	},
	'.skip' : {
		color: 'white',
		border:'1px solid #fff',
		'&:hover': {
			opacity: '1',
			transition: 'opacity 0.3s',
		}
	},
	'.start' : {
		color: '#22ABF3',
		background: '#fff',
		'&:hover': {
			color: '#22ABF3',
			background: '#fff',
			opacity: '1',
			transition: 'opacity 0.3s',
		}
	}

}))


export const OrangeBox = styled(BlueBox)(() => ({
	background: '#FF8A00',
	'.start' : {
		color: '#FF8A00',
		'&:hover': {
			color: '#FF8A00',
			background: '#fff',
			opacity: '1',
			transition: 'opacity 0.3s',
		}
	}
}))
