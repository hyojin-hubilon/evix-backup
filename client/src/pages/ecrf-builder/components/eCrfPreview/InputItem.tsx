import { ItemType, ItemWithValue } from "@/types/ecrf";
import { Box, Checkbox, FormControlLabel, FormGroup, Input, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { error } from "console";
import dayjs, { Dayjs } from "dayjs";
import { Field } from "formik";
import { validate } from 'uuid';

type InputItemType = {
	item: ItemWithValue;
	answerIndex: number;
	keyIndex: string | number;
	itemIndex: number;
	onChange: (e: ItemWithValue) => void;
}
const InputItem = ({ item, answerIndex, keyIndex, itemIndex, onChange }: InputItemType) => {
	//console.log(answerIndex, keyIndex, itemIndex, item);

	
	const itemValidate = (value) => {
		let error: string | null = null;
		if (item.content.required && !value) {
			error = '필수 입력사항입니다.';
		}
		return error;
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
				<Field name={`answers[${answerIndex}].${keyIndex}[${itemIndex}].value`} validate={itemValidate}>
					{({
						field,
						form: { touched, errors }
					} : { field: { name: string; onChange: (e: React.ChangeEvent<{ value: unknown }>) => void }, form: {touched, errors} }) => (
						<>
						<TextField
							size="small"
							placeholder={item.content?.placeholder}
							name={field.name}
							onChange={(e) => field.onChange(e as React.ChangeEvent<{ value: unknown }>)}
						/>
						{
							errors && 
							<Box>
								<Typography sx={{color: 'red'}}>
									{errors.answers[answerIndex][keyIndex][itemIndex].value}
								</Typography>
							</Box>
							}
						</>
						
					)}
				</Field>
			}
			{
				item.itemType === 'Text Area' && 
				<Field name={`answers[${answerIndex}].${keyIndex}[${itemIndex}].value`} validate={itemValidate}>
					{({
						field
					} : { field: { name: string; onChange: (e: React.ChangeEvent<{ value: unknown }>) => void } }) => (
						<TextField
							size="small"
							placeholder={item.content?.placeholder}
							multiline
							rows={3}
							name={field.name}
							onChange={(e) => field.onChange(e as React.ChangeEvent<{ value: unknown }>)}
						/>
					)}
				</Field>
			}
			{
				item.itemType === 'Select Box' &&
				<Field name={`answers[${answerIndex}].${keyIndex}[${itemIndex}].value`} validate={itemValidate}>
					{({
						field
					} : { field: { name: string; onChange: (e: React.ChangeEvent<{ value: unknown }>) => void } }) => (
					<Select
						size="small"
						value="Select"
						name={field.name}
						onChange={(e) => field.onChange(e as React.ChangeEvent<{ value: unknown }>)}>
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
					)} 
				</Field>
			}
			{
				item.itemType === 'Radio Buttons' &&
				<Field name={`answers[${answerIndex}].${keyIndex}[${itemIndex}].value`} validate={itemValidate}>
					{({
						field
					} : { field: { name: string; onChange: (e: React.ChangeEvent<{ value: unknown }>) => void } }) => (
						<RadioGroup name={field.name} onChange={(e) => field.onChange(e as React.ChangeEvent<{ value: unknown }>)}>
							{
								item.content?.options?.map((option, index) => {
									return <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
								})
								
							}
						</RadioGroup> 
					)}
				</Field>
			}
			{
				item.itemType === 'Checkbox' &&
				<Field name={`answers[${answerIndex}].${keyIndex}[${itemIndex}].value`} validate={itemValidate}>
					{({
						field
					} : { field: { name: string; onChange: (e) => void } }) => (
				
					<FormGroup>
						{
							item.content?.options?.map((option, index) => {
							return <FormControlLabel key={index}
									control={
										<Checkbox name={option} onChange={field.onChange}/>
									}
									label={option}
								/>
							})	
						}
					</FormGroup> 
					)}
				</Field>
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
							<Field name={`answers[${answerIndex}].${keyIndex}[${itemIndex}].value`} validate={itemValidate}>
								{({
									field,
									form: { setFieldValue }
								}: {field: { name: string, value:string }, form : {setFieldValue: (name, value) => void}}) => (
									<DatePicker
										name={field.name}
										value={dayjs(field.value)}
										format="YYYY/MM/DD" 
										onChange={(e: Dayjs | null) => {
										setFieldValue(`answers[${answerIndex}].${keyIndex}[${itemIndex}].value`, e?.format('YYYY/MM/DD'));
									}} />
								)}
							</Field>
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
		</Stack>
	</Box>)
}

export default InputItem