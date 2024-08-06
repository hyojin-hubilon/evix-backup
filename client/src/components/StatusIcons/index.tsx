export const NewIcon = ({color} : {color?: string}) => {
	
	const iconColor = color ? color : 'white';

	return (
		<span style={{ width: '14px', height: '15px', display: 'inline-block', verticalAlign: 'middle' }}>
			<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_493_759)">
					<path d="M13.5 7.5C13.5 8.78558 13.1188 10.0423 12.4046 11.1112C11.6903 12.1801 10.6752 13.0132 9.48744 13.5052C8.29972 13.9972 6.99279 14.1259 5.73191 13.8751C4.47104 13.6243 3.31285 13.0052 2.40381 12.0962C1.49476 11.1872 0.875699 10.029 0.624895 8.76809C0.374091 7.50721 0.502813 6.20028 0.994782 5.01256C1.48675 3.82484 2.31987 2.80968 3.38879 2.09545C4.45771 1.38122 5.71442 1 7 1" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M10.5 1L5.5 6L4.5 10L8.5 9L13.5 4" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					</g>
				<defs>
					<clipPath id="clip0_493_759">
						<rect width="14" height="14" fill={iconColor} transform="translate(0 0.5)"/>
					</clipPath>
				</defs>
			</svg>
		</span>

	)
}

export const OngoingIcon = ({color} : {color?: string}) => {
	
	const iconColor = color ? color : 'white';

	return (
		<span style={{ width: '14px', height: '16px', display: 'inline-block', verticalAlign: 'middle' }}>
			<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_493_765)">
				<path d="M7 14C10.5899 14 13.5 11.0899 13.5 7.5C13.5 3.91015 10.5899 1 7 1C3.41015 1 0.5 3.91015 0.5 7.5C0.5 11.0899 3.41015 14 7 14Z" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M5.5 5L9.5 7.5L5.5 10V5Z" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
				</g>
				<defs>
				<clipPath id="clip0_493_765">
				<rect width="14" height="14" fill={iconColor} transform="translate(0 0.5)"/>
				</clipPath>
				</defs>
			</svg>
		</span>

	)
}

export const CompletedIcon = ({color} : {color?: string}) => {
	
	const iconColor = color ? color : 'white';

	return (
		<span style={{ width: '14px', height: '16px', display: 'inline-block', verticalAlign: 'middle' }}>
			<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_493_771)">
					<path d="M4 8.5L6.05 10.14C6.10506 10.1853 6.16952 10.2178 6.23872 10.2351C6.30791 10.2524 6.38009 10.2541 6.45 10.24C6.52058 10.2268 6.58749 10.1985 6.64616 10.1571C6.70483 10.1156 6.75389 10.0621 6.79 10L10 4.5" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M7 14C10.5899 14 13.5 11.0899 13.5 7.5C13.5 3.91015 10.5899 1 7 1C3.41015 1 0.5 3.91015 0.5 7.5C0.5 11.0899 3.41015 14 7 14Z" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
				</g>
				<defs>
					<clipPath id="clip0_493_771">
						<rect width="14" height="14" fill={iconColor} transform="translate(0 0.5)"/>
					</clipPath>
				</defs>
			</svg>
		</span>

	)
}

export const ExpirationIcon = ({color} : {color?:string}) => {
	
	const iconColor = color ? color : 'white';
	
	return (
		<span style={{ width: '14px', height: '16px', display: 'inline-block', verticalAlign: 'middle' }}>
			<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_493_798)">
					<path d="M7 1C8.28558 1 9.54229 1.38122 10.6112 2.09545C11.6801 2.80968 12.5133 3.82484 13.0052 5.01256C13.4972 6.20028 13.6259 7.50721 13.3751 8.76809C13.1243 10.029 12.5052 11.1872 11.5962 12.0962C10.6872 13.0052 9.52897 13.6243 8.26809 13.8751C7.00722 14.1259 5.70028 13.9972 4.51256 13.5052C3.32484 13.0132 2.30968 12.1801 1.59545 11.1112C0.881223 10.0423 0.500004 8.78558 0.500004 7.5C0.497944 5.63797 1.21436 3.84694 2.5 2.5" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M0.5 3L2.5 2.5L3 4.5" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M7 4V8L9.6 9.3" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
				</g>
				<defs>
					<clipPath id="clip0_493_798">
						<rect width="14" height="14" fill={iconColor} transform="translate(0 0.5)"/>
					</clipPath>
				</defs>
			</svg>
		</span>

	)
}


export const PauseIcon = ({color} : {color?:string}) => {
	
	const iconColor = color ? color : 'white';
	
	return (
		<span style={{ width: '14px', height: '16px', display: 'inline-block', verticalAlign: 'middle' }}>
			<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_493_777)">
					<path d="M7 14C10.5899 14 13.5 11.0899 13.5 7.5C13.5 3.91015 10.5899 1 7 1C3.41015 1 0.5 3.91015 0.5 7.5C0.5 11.0899 3.41015 14 7 14Z" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M5.5 5V10" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M8.5 5V10" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
				</g>
				<defs>
					<clipPath id="clip0_493_777">
						<rect width="14" height="14" fill={iconColor} transform="translate(0 0.5)"/>
					</clipPath>
				</defs>
			</svg>
		</span>

	)
}

export const StopIcon = ({color} : {color?:string}) => {
	
	const iconColor = color ? color : 'white';
	
	return (
		<span style={{ width: '14px', height: '16px', display: 'inline-block', verticalAlign: 'middle' }}>
			<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_493_784)">
					<path d="M7 14C10.5899 14 13.5 11.0899 13.5 7.5C13.5 3.91015 10.5899 1 7 1C3.41015 1 0.5 3.91015 0.5 7.5C0.5 11.0899 3.41015 14 7 14Z" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M8.5 5H5.5C4.94772 5 4.5 5.44772 4.5 6V9C4.5 9.55228 4.94772 10 5.5 10H8.5C9.05228 10 9.5 9.55228 9.5 9V6C9.5 5.44772 9.05228 5 8.5 5Z" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
				</g>
				<defs>
					<clipPath id="clip0_493_784">
						<rect width="14" height="14" fill={iconColor} transform="translate(0 0.5)"/>
					</clipPath>
				</defs>
			</svg>
		</span>

	)
}