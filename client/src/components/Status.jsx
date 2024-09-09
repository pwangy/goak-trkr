const Status = () => {
    <div className='picker'>
        <select
				name='status-picker'
				value={goalStatus}
				onChange={(e) => onCategoryChange(e.target.value)}>
				<option value='Not Started'>Not Started</option>
				<option value='In Progress'>In Progress</option>
				<option value='Completed'>Completed</option>
			</select>
    </div>

}

export default Status