import { useState } from 'react'

const Goal = ({ goal, handleUpdateGoal, handleDeleteGoal }) => {
	const { id, title, description, status } = goal
	const [goalStatus, setGoalStatus] = useState(status)

	const handleDelete = () => {
		fetch(`/goals/${id}`, {
			method: 'DELETE'
		})
			.then((res) => {
				if (res.status === 204) {
					handleDeleteGoal(id)
					console.log('Goal deleted')
				} else {
					return res.json().then((errorObj) => {
						throw new Error(errorObj.error)
					})
				}
			})
            .catch((err) => {
                console.error(err)
                alert('Failed to delete goal')
            })
	}

    const handleStatusChange = (e) => {
        const newStatus = e.target.value
        setGoalStatus(newStatus)
        const updatedGoal = { ...goal, status: newStatus }
        handleUpdateGoal(updatedGoal)

        fetch(`/goals/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGoal)
        })
            .then((res) => {
                if (res.status === 202) {
                    alert('Goal Updated')
                    console.log('Goal updated')
                } else {
                    return res.json().then((errorObj) => {
                        throw new Error(errorObj.error)
                    })
                }
            })
            .catch((err) => {
                console.error(err)
                alert('Failed to update goal')
            })
    }

	return (
		<li>
			<span>{status}</span> |
			<select
				name='status-picker'
				value={goalStatus}
				onChange={handleStatusChange}>
				<option value='Not Started'>Not Started</option>
				<option value='In Progress'>In Progress</option>
				<option value='Completed'>Completed</option>
			</select> |
			<span className='title'>{title}</span> |
            <span>{description}</span> |
			<button className='delete' onClick={handleDelete}>
				Delete
			</button>
		</li>
	)
}

export default Goal


// make color of status change based on value