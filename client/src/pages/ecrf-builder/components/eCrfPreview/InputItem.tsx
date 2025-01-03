type InputItemType = {
	item: any;
	onChange: (e: any) => void;
	value?: any;
}
const InputItem = ({ item, onChange, value }: InputItemType) => {
	return (
	<>
		{/* itemType별로 인풋넣기, validate(required check) 필요 */}
		Input Item
	</>)
}

export default InputItem