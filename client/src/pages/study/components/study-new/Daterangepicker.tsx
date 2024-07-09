import { Box, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export type DateRage = {
	startDt:Dayjs,
	endDt:Dayjs
}

type DataRangePickerProps = {
	startDt?: string | Date | Dayjs | null | undefined;
	endDt?: string | Date | Dayjs | null | undefined;
	changeDate: (range: DateRage) => void
}

const DateRangePicker = ({startDt, endDt, changeDate} : DataRangePickerProps) => {
	const [ startDate, setStartDate ] = useState(dayjs(startDt));
	const [ endDate, setEndDate ] = useState(dayjs(endDt));

	const changeStartDate = (e) => {
		setStartDate(e);
		const newDate = {startDt : e, endDt: endDate}
		changeDate(newDate);
	}

	const changeEndDate = (e) => {
		setEndDate(e);
		const newDate = {startDt : startDate, endDt: e}
		changeDate(newDate);
	}

	return (
		<Box alignItems="center" display="flex" gap={1}
			sx={{
				".MuiInputBase-input" : {
					height: "1.375em",
					padding: "8px 14px",
					width: "9em"
				},
				".MuiButtonBase-root" :{
					fontSize: "1.2em",

					".MuiSvgIcon-root": {
						fontSize: "1em"
					}
				}
		}}>
			<DatePicker value={startDate} maxDate={endDate} onChange={(e) => changeStartDate(e)} />
			<Typography> ~ </Typography>
			<DatePicker value={endDate} minDate={startDate} onChange={(e) => changeEndDate(e)} />
		</Box>
	)
}

export default DateRangePicker;