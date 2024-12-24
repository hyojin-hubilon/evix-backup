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
	const [typeReferenceElement, setTypeReferenceElement] = useState(null);
	const [typePopperElement, setTypePopperElement] = useState(null);
	const [showType, setShowType] = useState(false);
	// const buttons = [
	// 	{
	// 		onClick: (e) => {
	// 		// dataDispatch({type: "update_column_header", columnId: id, label: header});
	// 		// dataDispatch({type: "add_column_to_left", columnId: id, focus: false});
	// 		setExpanded(false);
	// 		},
	// 		icon: <WestRoundedIcon />,
	// 		label: "Insert left"
	// 	},
	// 	{
	// 		onClick: (e) => {
	// 		// dataDispatch({type: "update_column_header", columnId: id, label: header});
	// 		// dataDispatch({type: "add_column_to_right", columnId: id, focus: false});
	// 		setExpanded(false);
	// 		},
	// 		icon: <EastRoundedIcon />,
	// 		label: "Insert right"
	// 	},
	// 	{
	// 		onClick: (e) => {
	// 		// dataDispatch({type: "update_column_header", columnId: id, label: header});
	// 		// dataDispatch({type: "delete_column", columnId: id});
	// 		setExpanded(false);
	// 		},
	// 		icon: <DeleteOutlineRoundedIcon />,
	// 		label: "Delete"
	// 	}
	// ];
	
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
  
	// const typePopper = usePopper(typeReferenceElement, typePopperElement, {
	//   placement: "right",
	//   strategy: "fixed"
	// });
  
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
						style={{padding: '0.2rem'}}
						onChange={(e) => handleChangeLabel(e)}
						onBlur={(e) => handleBlur(e)}
						onKeyDown={(e) => handleKeyDown(e)}
					/>
				</Box>
			</Menu>
			{/* {expanded && (
				<div ref={setPopperElement} style={{...styles.popper, zIndex: 3}} {...attributes.popper}>
				<div
					className='bg-white shadow-5 border-radius-md'
					style={{
					width: 240
					}}>
					<div style={{paddingTop: "0.75rem", paddingLeft: "0.75rem", paddingRight: "0.75rem"}}>
					<div className='is-fullwidth' style={{marginBottom: 12}}>
						<input
						className='form-input'
						ref={setInputRef}
						type='text'
						value={header}
						style={{width: "100%"}}
						onChange={handleChange}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						/>
					</div>
					<span className='font-weight-600 font-size-75' style={{textTransform: "uppercase", color: grey(500)}}>
						Property Type
					</span>
					</div>
					<div style={{padding: "4px 0px"}}>
					<button
						className='sort-button'
						type='button'
						onMouseEnter={() => setShowType(true)}
						onMouseLeave={() => setShowType(false)}
						ref={setTypeReferenceElement}>
						<span className='svg-icon svg-text icon-margin'>{propertyIcon}</span>
						<span style={{textTransform: "capitalize"}}>{dataType}</span>
					</button>
					{showType && (
						<div
						className='shadow-5 bg-white border-radius-m'
						ref={setTypePopperElement}
						onMouseEnter={() => setShowType(true)}
						onMouseLeave={() => setShowType(false)}
						{...typePopper.attributes.popper}
						style={{
							...typePopper.styles.popper,
							width: 200,
							backgroundColor: "white",
							zIndex: 4,
							padding: "4px 0px"
						}}>
						{types.map((type) => (
							<button className='sort-button' onClick={type.onClick}>
							<span className='svg-icon svg-text icon-margin'>{type.icon}</span>
							{type.label}
							</button>
						))}
						</div>
					)}
					</div>
					<div
					key={shortId()}
					style={{
						borderTop: `2px solid ${grey(200)}`,
						padding: "4px 0px"
					}}>
					{buttons.map((button) => (
						<button type='button' className='sort-button' onMouseDown={button.onClick}>
						<span className='svg-icon svg-text icon-margin'>{button.icon}</span>
						{button.label}
						</button>
					))}
					</div>
				</div>
				</div>
			)} */}
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