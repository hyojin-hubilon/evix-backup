import { ItemType } from "@/types/ecrf";
import { Box, Checkbox, FormControlLabel, FormGroup, Input, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";


export interface ChangedItmeType {
	changedItem: ItemType;
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
}


const InputItem = ({ item, answerIndex, answerKey, itemIndex, onChange, submitCheck }: InputItemType) => {
	const [error, setError] = useState<string | null>(null);
	
	
	const itemValidate = () => {
		//table은 required가 없음으로 처리할까...
		let error: string | null = null;
		if (item.itemType !== 'Table' && item.content.required && !item.value) {
			error = '필수 입력사항입니다.';
		}
		return error;
	}

	const handleChangeValue = (value) => {
		const changedItem = {...item, value: value};
		console.log(changedItem);
		onChange({changedItem, answerIndex, answerKey, itemIndex});
	}

	const handleChangeCheckBoxValue = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.checked) {
			const values = item.value ? [...item.value, e.target.name] : [e.target.name];
			const changedItem = {...item, value: values};
			onChange({changedItem, answerIndex, answerKey, itemIndex});
		} else {
			const values = Array.isArray(item.value) ? item.value.filter((v) => v !== e.target.name) : [];
			const changedItem = {...item, value: values};
			onChange({changedItem, answerIndex, answerKey, itemIndex});
		}
	}
	
	return (
	<Box>
		
		<Stack spacing={1} maxWidth="inherit">
			
				<Box display="flex" mb={0.5}>
					<Typography variant={item.itemType ==='Headline' ? 'h3' : 'h5'}>{item.content?.title}</Typography>
					{ item.content?.required &&  <Typography sx={{fontSize: '0.7rem', color:'red'}}>*</Typography>}
				</Box>
				{
					item.content?.description && <Typography variant="body1">{ item.content?.description }</Typography>
				}
			

			{
				item.itemType === 'Text Input' && 
						<>
						<TextField
							size="small"
							placeholder={item.content?.placeholder}
							onChange={(e) => {handleChangeValue(e.target.value)}}
						/>
						</>
				
			}
			{
				item.itemType === 'Text Area' && 
				<TextField
					size="small"
					placeholder={item.content?.placeholder}
					multiline
					rows={3}
					onBlur={(e) => { 
						handleChangeValue(e.target.value);
					}}
				/>
			}
			{
				item.itemType === 'Select Box' &&		
				<Select
					size="small"
					defaultValue="Select"
					value={item.value === null ? 'Select' : item.value}
					onChange={(e) => handleChangeValue(e.target.value)}>
					<MenuItem value="Select">
						<em>Select</em>
					</MenuItem>
					{
						item.content?.options?.map((option, index) => {
							return <MenuItem value={option} key={index}>
								{option}
							</MenuItem>
						})
						
					}
				</Select>		
			}
			{
				item.itemType === 'Radio Buttons' &&		
				<RadioGroup onChange={(e) => handleChangeValue(e.target.value)} value={item.value}>
					{
						item.content?.options?.map((option, index) => {
							return <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
						})
						
					}
				</RadioGroup> 
			}
			{
				item.itemType === 'Checkbox' &&
				<FormGroup>
					{
						item.content?.options?.map((option, index) => {
						return <FormControlLabel key={index}
								control={
									<Checkbox name={option} onChange={(e) => handleChangeCheckBoxValue(e)} checked={item.value?.includes(option)}/>
								}
								label={option}
							/>
						})	
					}
				</FormGroup>
			}
		
			{
				item.itemType === 'Datepicker' &&
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
							value={item.value ? dayjs(item.value as string) : null}
							format="YYYY/MM/DD" 
							onChange={(e: Dayjs | null) => {
								handleChangeValue(e?.format('YYYY/MM/DD'));
						}} />
					</Box>
			}
			{
				// 테이블 미리보기
				item.itemType === 'Table' && item.content.table &&
				<Box sx={{overflowX: 'auto', maxWidth: '100%'}}>
					<table className="viewTable">
						<thead>
							<tr>
							{
								item.content.table[0].map((column, i) => {
									return <th key={i}><div className="th-content">{column['COLUMN']}</div></th>
								})
							}
							</tr>
						</thead>
						<tbody>
						{
							item.content.table.slice(1).map(
								(row, i) => {
									return <tr key={i}>
										{
											row.map((column, k) => {
												return <td key={k}>
													<div className="td-content">
														{ column['TEXT'] ? column['TEXT'] : <Input size="small" /> }
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