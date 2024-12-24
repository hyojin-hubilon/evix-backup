/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ChangeEvent, useEffect, useState } from "react";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Column, ColumnDef, ColumnDefTemplate, Header, HeaderContext } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { editColumns } from "@/store/reducers/table";
import { Box, Button, Menu, MenuItem, Popper, OutlinedInput } from '@mui/material';

interface CustomHeaderProps<TData> {
	header: Header<TData, unknown>;
}
  

const TableHeader = <TData, >({header}:CustomHeaderProps<TData>)  => {
	const { column } = header;
	const { columnDef } = column;


	const dispatch = useDispatch();
	
	// column 수정 메뉴 관련
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);


	const [label, setLabel] = useState(columnDef.label);
	
	const subMenu = [
		{
			onClick: (e) => {
				dispatch(editColumns({type: "update_column_header", columnId: columnDef.id, label: label}));
				dispatch(editColumns({type: "add_column_to_left", columnId: columnDef.id}));
				handleClose();
			},
			icon: <WestRoundedIcon sx={{fontSize: '1rem'}}/>,
			label: "Insert left"
		},
		{
			onClick: (e) => {
				dispatch(editColumns({type: "update_column_header", columnId: columnDef.id, label: label}));
				dispatch(editColumns({type: "add_column_to_right", columnId: columnDef.id}));
				handleClose();
			},
			icon: <EastRoundedIcon sx={{fontSize: '1rem'}}/>,
			label: "Insert right"
		},
		{
			onClick: (e) => {
				dispatch(editColumns({type: "update_column_header", columnId: columnDef.id, label: label}));
				dispatch(editColumns({type: "delete_column", columnId: columnDef.id}));
				handleClose();
			},
			icon: <DeleteOutlineRoundedIcon sx={{fontSize: '1rem'}} />,
			label: "Delete"
		}
	];
	
	// useEffect(() => {
	// 	if (created) {
	// 		setExpanded(true);
	// 	}
	// }, [created]);
  
	useEffect(() => {
		setLabel(columnDef.label);
	}, [columnDef.label]);
  
	useEffect(() => {
		if (inputRef) {
			inputRef.focus();
			inputRef.select();
		}
	}, [inputRef]);
  
	
	const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			dispatch(editColumns({type: "update_column_header", columnId: columnDef.id, label: label, focus: false}));
			handleClose();
		}
	}
  
	const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) =>{
		setLabel(e.target.value);
	}
  
	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		e.preventDefault();
		dispatch(editColumns({type: "update_column_header", columnId: columnDef.id, label: label, focus: false}));
	}

	return columnDef.id !== '999999' ? (
		<>
			<div style={{width: columnDef.size}} className="th noselect" onClick={(e) => handleClick(e)}>
				<div className="th-content">
						<span className="svg-icon svg-gray icon-margin"><FormatAlignLeftRoundedIcon /></span>
						{ label }
				</div>
				<div className="resizer" />
			</div>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<Box sx={{p:'0.5rem', width:'200px'}}>
					<input
						className='form-input'
						ref={setInputRef}
						type='text'
						
						value={label}
						style={{padding: '0.2rem', width:'100%'}}
						onChange={(e) => handleChangeLabel(e)}
						onBlur={(e) => handleBlur(e)}
						onKeyDown={(e) => handleKeyDown(e)}
					/>
				</Box>

				{subMenu.map((button, i) => (
						<button type="button" className="sort-button" onClick={button.onClick} key={i}>
							<span className="svg-icon svg-text icon-margin">{ button.icon }</span>
							{button.label}
						</button>
				))}
			</Menu>
		</>
	) : (
		<div className="th noselect" style={{width: '40px', borderRight: '1px solid #e0e0e0', minWidth:'40px'}}>
			<div
				className="th-content" 
				style={{display:'flex', justifyContent:'center', alignItems:'center', width:'inherit'}}
				onClick={(e) => dispatch(editColumns({type: "add_column_to_left", columnId: '999999', focus: true}))}
				>
				<span className="svg-icon svg-gray">
					<AddRoundedIcon />
				</span>

			</div>
		</div>
	);
  
}

export default TableHeader;