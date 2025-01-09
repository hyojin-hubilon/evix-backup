import { ItemType } from "@/types/ecrf";
import { Box, Checkbox, FormControlLabel, FormGroup, Input, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

type InputItemType = {
	item: ItemType;
	onChange: (e: ItemType) => void;
}
const InputItem = ({ item, onChange }: InputItemType) => {
	return (
	<Box>
		<Stack spacing={1} maxWidth="inherit">
			<Box display="flex" mb={1}>
				<Typography variant="h5">{item.content?.title}</Typography>
				{ item.content?.required &&  <Typography sx={{fontSize: '0.7rem', color:'red'}}>* Required</Typography>}
			</Box>
			{
				item.content?.description && <Typography>{ item.content?.description }</Typography>
			}
			{
				(item.content?.placeholder && item.itemType === 'Text Input') && 
					<TextField
						size="small"
						placeholder={item.content?.placeholder}
					/>
			}
			{
				(item.content?.placeholder && item.itemType === 'Text Area') && 
					<TextField
						size="small"
						placeholder={item.content?.placeholder}
						multiline
						rows={3}
					/>
			}
			{
				(item.content?.options && item.itemType === 'Select Box') &&
					<Select size="small" value="Select">
						<MenuItem value="Select">
							<em>Select</em>
						</MenuItem>
						{
							item.content?.options.map((option, index) => {
								return <MenuItem value={option} key={index}>
									{option}
								</MenuItem>
							})
							
						}
					</Select> 
			}
			{
				(item.content?.options && item.itemType === 'Radio Buttons') &&
					<RadioGroup>
						{
							item.content?.options.map((option, index) => {
								return <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
							})
							
						}
					</RadioGroup> 
			}
			{
				(item.content?.options && item.itemType === 'Checkbox') &&
					<FormGroup>
						{
							item.content?.options.map((option, index) => {
								return <FormControlLabel key={index}
										control={
											<Checkbox name={option} />
										}
										label={option}
									/>
							})	
						}
					</FormGroup> 
			}
		
			{
				(item.itemType === 'Datepicker') &&
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
						<DatePicker   />
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