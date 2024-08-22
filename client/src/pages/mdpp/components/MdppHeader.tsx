import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

type MdppHeaderType = {
	title:string;
	backBtn?: boolean;
}
const MdppHeader = ({title, backBtn}:MdppHeaderType) => {
	const navigate = useNavigate();
	return (
		<Box display="flex" alignItems="center" justifyContent="center"
			sx={{height: '38px'}}
		>
			{
				backBtn &&
				<Link 
					to={'..'}
					onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
					style={{
						width: '38px',
						height: '38px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						left: '11px'
					}}
				>
					{/*뒤로가기 버튼 svg*/}
					<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"> 
						<path d="M9 1L2 8L9 15" stroke="#424242" stroke-width="1.5"/>
					</svg>
				</Link>
			}
			
			<Typography variant="h5">
				{ title }
			</Typography>
		</Box>
	)
	
}

export default MdppHeader;