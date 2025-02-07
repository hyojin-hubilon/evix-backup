import { ItemType } from "@/types/ecrf";
import { Box, Checkbox, FormControlLabel, FormGroup, Input, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { use } from "i18next";
import { ChangeEvent, useEffect, useState } from "react";


export interface ChangedItmeType {
	changedItem: ItemType;
	answerIndex: number;
	answerKey: string;
	itemIndex: number;
}

export interface ItemErrorType {
	error: string | null;
	answerIndex: number;
	answerKey: string;
	itemIndex: number;
}

type InputItemType = {
	item: ItemType;
	answerIndex: number;
	answerKey: string;
	itemIndex: number;
	onChange: (e: ChangedItmeType) => void;
	submitCheck: boolean;
	onError: (e: ItemErrorType) => void;
}


const InputItem = ({ item, answerIndex, answerKey, itemIndex, onChange, submitCheck, onError }: InputItemType) => {
	const [itemValue, setItemValue] = useState<ItemType>(item);
	const [error, setError] = useState<string | null>(null);
	
	const itemValidateAndSet = () => {
		const changedItem = {...item, value: itemValue.value};
		onChange({changedItem, answerIndex, answerKey, itemIndex});

		if(itemValue.itemType === 'Table') {
			const changedItem = {...item, content: {...item.content, table: itemValue.content.table}};
			onChange({changedItem, answerIndex, answerKey, itemIndex});
		}

		let error: string | null = null;
		if (itemValue.itemType !== 'Table' && itemValue.content.required && !itemValue.value) {
			error = '필수 입력사항입니다.';
		} else if(itemValue.itemType === 'Checkbox' && itemValue.content.required && itemValue.value?.length == 0) {
			error = '필수 입력사항입니다.';
		} else {
			error = null;
		}

		setError(error);
		onError({error, answerIndex, answerKey, itemIndex});
	}

	const handleChangeValue = (value) => {
		const changedItem = {...itemValue, value: value};
		setItemValue(changedItem);
	}

	const handleChangeCheckBoxValue = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.checked) {
			const values = itemValue.value ? [...itemValue.value, e.target.name] : [e.target.name];
			const changedItem = {...itemValue, value: values};
			setItemValue(changedItem);
		} else {
			const values = Array.isArray(itemValue.value) ? itemValue.value.filter((v) => v !== e.target.name) : [];
			const changedItem = {...itemValue, value: values};
			setItemValue(changedItem);
		}
	}

	const handleChangeColumn = (e:string, rowIndex:number, colIndex:number) => {
		setItemValue((prev) => {
			const newTable = prev;
			if(newTable.content.table) {
				newTable.content.table[rowIndex][colIndex].INPUT = e;
			}
			return newTable;
		})
		
	}

	useEffect(() => {
		if(submitCheck) {
			itemValidateAndSet();
		}
	}, [submitCheck]);
	
	return (
	<Box>
		
		<Stack spacing={1} maxWidth="inherit">
			
				<Box display="flex" mb={0.5}>
					<Typography variant={itemValue.itemType ==='Headline' ? 'h3' : 'h5'}>{itemValue.content?.title}</Typography>
					{ itemValue.content?.required &&  <Typography sx={{fontSize: '0.7rem', color:'red'}}>*</Typography>}
				</Box>
				{
					itemValue.content?.description && <Typography variant="body1">{ itemValue.content?.description }</Typography>
				}
			

			{
				itemValue.itemType === 'Text Input' && 
						<>
						<TextField
							size="small"
							placeholder={itemValue.content?.placeholder}
							value={itemValue.value ? itemValue.value : ''}
							onChange={(e) => {handleChangeValue(e.target.value)}}
						/>
						</>
				
			}
			{
				itemValue.itemType === 'Text Area' && 
				<TextField
					size="small"
					placeholder={itemValue.content?.placeholder}
					multiline
					rows={3}
					value={itemValue.value ? itemValue.value : ''}
					onChange={(e) => { 
						handleChangeValue(e.target.value);
					}}
				/>
			}
			{
				item.itemType === 'Select Box' &&		
				<Select
					size="small"
					defaultValue="Select"
					value={itemValue.value === null ? 'Select' : itemValue.value}
					onChange={(e) => handleChangeValue(e.target.value)}>
					<MenuItem value="Select">
						<em>Select</em>
					</MenuItem>
					{
						itemValue.content?.options?.map((option, index) => {
							return <MenuItem value={option} key={index}>
								{option}
							</MenuItem>
						})
						
					}
				</Select>		
			}
			{
				itemValue.itemType === 'Radio Buttons' &&		
				<RadioGroup onChange={(e) => handleChangeValue(e.target.value)} value={itemValue.value}>
					{
						itemValue.content?.options?.map((option, index) => {
							return <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
						})
						
					}
				</RadioGroup> 
			}
			{
				itemValue.itemType === 'Checkbox' &&
				<FormGroup>
					{
						itemValue.content?.options?.map((option, index) => {
						return <FormControlLabel key={index}
								control={
									<Checkbox name={option} onChange={(e) => handleChangeCheckBoxValue(e)} checked={itemValue.value?.includes(option)}/>
								}
								label={option}
							/>
						})	
					}
				</FormGroup>
			}
		
			{
				itemValue.itemType === 'Datepicker' &&
					<Box alignItems="center" display="flex" gap={1}
						sx={{
							".MuiInputBase-input" : {
								height: "1.375em",
								padding: "8px 14px",
								width: 1
							},
							".MuiButtonBase-root" :{
								fontSize: "1.2em",

								".MuiSvgIcon-root": {
									fontSize: "1em"
								}
							}
						}}>
						<DatePicker
							value={itemValue.value ? dayjs(itemValue.value as string) : null}
							format="YYYY/MM/DD" 
							onChange={(e: Dayjs | null) => {
								handleChangeValue(e?.format('YYYY/MM/DD'));
						}} />
					</Box>
			}
			{
				// 테이블 미리보기
				itemValue.itemType === 'Table' && itemValue.content.table &&
				<Box sx={{overflowX: 'auto', maxWidth: '100%'}}>
					<table className="viewTable">
						<thead>
							<tr>
							{
								itemValue.content.table[0].map((column, i) => {
									return <th key={i}><div className="th-content">{column['COLUMN']}</div></th>
								})
							}
							</tr>
						</thead>
						<tbody>
						{
							itemValue.content.table.slice(1).map(
								(row, i) => {
									return <tr key={i}>
										{
											row.map((column, k) => {
												return <td key={k}>
													<div className="td-content">
														{ column['TEXT'] ? column['TEXT'] : <Input size="small" onChange={(e) => handleChangeColumn(e.target.value, i + 1, k)}/> }
													</div>
												</td>
											})
										}
									</tr>
								}
								
							)
						}
						</tbody>

					</table>
				</Box>
			}

			{				
				error &&
				<Box>
					<Typography sx={{color: 'red'}}>
						{error}
					</Typography>
				</Box>
			}
		</Stack>
	</Box>)
}

export default InputItem