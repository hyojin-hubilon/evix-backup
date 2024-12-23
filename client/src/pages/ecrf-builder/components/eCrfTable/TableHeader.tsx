/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Column, ColumnDef, ColumnDefTemplate, Header, HeaderContext } from "@tanstack/react-table";

interface CustomHeaderProps<TData> {
	header: Header<TData, unknown>;
}
  

const TableHeader = <TData, >({header}:CustomHeaderProps<TData>)  => {
	const { column } = header;
	const { columnDef } = column;
	
	//console.log(id, created, label, dataType, getResizerProps, getHeaderProps);
	const [expanded, setExpanded] = useState(columnDef.dataType || false);
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [inputRef, setInputRef] = useState(null);
	// const {styles, attributes} = usePopper(referenceElement, popperElement, {
	//   placement: "bottom",
	//   strategy: "absolute"
	// });
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
  
	// const types = [
	// 	{
	// 		onClick: (e) => {
	// 		// dataDispatch({type: "update_column_type", columnId: id, dataType: "text"});
	// 		setShowType(false);
	// 		setExpanded(false);
	// 		},
	// 		icon: <TextFieldsRoundedIcon />,
	// 		label: "Text"
	// 	},
	// 	{
	// 		onClick: (e) => {
	// 		// dataDispatch({type: "update_column_type", columnId: id, dataType: "number"});
	// 		setShowType(false);
	// 		setExpanded(false);
	// 		},
	// 		icon: <TagRoundedIcon />,
	// 		label: "Number"
	// 	}
	// ];
  
	let propertyIcon;
	switch (columnDef.dataType) {
		case "Number":
			propertyIcon = <TagRoundedIcon />;
			break;
		case "Text":
			propertyIcon = <FormatAlignLeftRoundedIcon />;
			break;
		default:
			break;
	}
  
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
			// inputRef.focus();
			// inputRef.select();
		}
	}, [inputRef]);
  
	// const typePopper = usePopper(typeReferenceElement, typePopperElement, {
	//   placement: "right",
	//   strategy: "fixed"
	// });
  
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			//dataDispatch({type: "update_column_header", columnId: id, label: header});
			//setExpanded(false);
		}
	}
  
	function handleChange(e) {
		//setHeader(e.target.value);
	}
  
	function handleBlur(e) {
		e.preventDefault();
		//dataDispatch({type: "update_column_header", columnId: id, label: header});
	}

	return columnDef.id !== '999999' ? (
		<>
			<div style={{width: columnDef.size}}className="th noselect">
				<div className="th-content">
					<span className="svg-icon svg-gray icon-margin">{propertyIcon}</span>
					{columnDef.label}
				</div>
				<div className="resizer" />
			</div>
			{/* {expanded && <div className='overlay' onClick={() => setExpanded(false)} />} */}
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
		<div className="th noselect">
			<div
				className="th-content"
				// onClick={(e) => dataDispatch({type: "add_column_to_left", columnId: 999999, focus: true})}
				>
				<span className="svg-icon svg-gray icon-margin">
					<AddRoundedIcon />
				</span>

			</div>
		</div>
	);
  
}

export default TableHeader;