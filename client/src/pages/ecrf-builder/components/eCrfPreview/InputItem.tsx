import { ItemType } from "@/types/ecrf";
import { Box, Checkbox, FormControlLabel, FormGroup, Input, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Field } from 'formik';
import { error } from 'console';

type InputItemType = {
	item: ItemType;
	answerIndex: number;
	keyIndex: string | number;
	itemIndex: number;
	onChange: (e: ItemType) => void;
}

interface FormikFieldType {
	field: { name: string; value:string, error: string, onChange: (e : string) => void };
	form: { errors: any; setFieldValue: (name: string, value: string) => void };
	meta : { error: string | null, touched: boolean };
}


const InputItem = ({ item, answerIndex, keyIndex, itemIndex, onChange }: InputItemType) => {
	// console.log(`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`);

	
	const itemValidate = (value) => {
		//table은 required가 없음으로 처리할까...
		let error: string | null = null;
		if (item.itemType !== 'Table' && item.content.required && !value) {
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
				<Field name={`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`} validate={itemValidate}>
					{({
						field,
						form: { errors },
						meta
					} : FormikFieldType) => (
						<>
						<TextField
							size="small"
							placeholder={item.content?.placeholder}
							name={field.name}
							onChange={(e) => field.onChange(e.target.value)}
						/>
						{
							
							meta.error &&
							<Box>
								<Typography sx={{color: 'red'}}>
									{meta.error}
								</Typography>
							</Box>
							}
						</>
						
					)}
				</Field>
			}
			{
				item.itemType === 'Text Area' && 
				<Field name={`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`} validate={itemValidate}>
					{({
						field,
						form: { errors },
						meta
					} : FormikFieldType ) => (
						<>
							<TextField
								size="small"
								placeholder={item.content?.placeholder}
								multiline
								rows={3}
								name={field.name}
								onChange={(e) => field.onChange(e.target.value)}
							/>
							{
							
							meta.error &&
							<Box>
								<Typography sx={{color: 'red'}}>
									{meta.error}
								</Typography>
							</Box>
							}
						</>
					)}
				</Field>
			}
			{
				item.itemType === 'Select Box' &&
				<Field name={`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`} validate={itemValidate}>
					{({
						field,
						form: { errors },
						meta
					} : FormikFieldType) => (
						<>
							<Select
								size="small"
								defaultValue="Select"
								name={field.name}
								onChange={(e) => field.onChange(e.target.value)}>
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
							{
							
							meta.error &&
							<Box>
								<Typography sx={{color: 'red'}}>
									{meta.error}
								</Typography>
							</Box>
							}
						</>
					)} 
				</Field>
			}
			{
				item.itemType === 'Radio Buttons' &&
				<Field name={`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`} validate={itemValidate}>
					{({
						field,
						form: { errors },
						meta
					} : FormikFieldType) => (
						<>
						<RadioGroup name={field.name} onChange={(e) => field.onChange(e.target.value)}>
							{
								item.content?.options?.map((option, index) => {
									return <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
								})
								
							}
						</RadioGroup> 
						{
							meta.error &&
							<Box>
								<Typography sx={{color: 'red'}}>
									{meta.error}
								</Typography>
							</Box>
						}
						</>
					)}
				</Field>
			}
			{
				item.itemType === 'Checkbox' &&
				<Field name={`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`} validate={itemValidate}>
					{({
						field,
						form: { errors },
						meta
					} : FormikFieldType) => (
						<>
							<FormGroup>
								{
									item.content?.options?.map((option, index) => {
									return <FormControlLabel key={index}
											control={
												<Checkbox name={option} onChange={(e) => field.onChange(e.target.value)} />
											}
											label={option}
										/>
									})	
								}
							</FormGroup>
							{
							meta.error &&
							<Box>
								<Typography sx={{color: 'red'}}>
									{meta.error}
								</Typography>
							</Box>
						}
					</>
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
							<Field name={`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`} validate={itemValidate}>
								{({
									field,
									form: { setFieldValue, errors },
									meta
								}: {field: { name: string, value:string }, form : {setFieldValue: (name, value) => void, errors:any}, meta:{error}}) => (
									<>
									<DatePicker
										name={field.name}
										value={dayjs(field.value)}
										format="YYYY/MM/DD" 
										onChange={(e: Dayjs | null) => {
										setFieldValue(`answers[${answerIndex}][${keyIndex}][${itemIndex}].value`, e?.format('YYYY/MM/DD'));
									}} />

									{
										meta.error &&
										<Box>
											<Typography sx={{color: 'red'}}>
												{meta.error}
											</Typography>
										</Box>
									}
									</>
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