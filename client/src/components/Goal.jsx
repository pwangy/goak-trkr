/* eslint-disable react/prop-types */
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
					alert('Goal deleted')
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Not Started':
                return { background: '#b294d1' }
            case 'In Progress':
                return { background: '#a8f0f0' }
            case 'Completed':
                return { background: '#b3e6b3' }
            default:
                return {}
        }
    }

	return (
		<li className='goal-item'>
            <div>
                <select
                    name='status-picker'
                    value={goalStatus}
                    onChange={handleStatusChange}
                    style={getStatusColor(goalStatus)}>
                    <option value='Not Started'>Not Started</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Completed'>Completed</option>
                </select>
                &nbsp;&nbsp;
                <span className='title'>{title}</span>
                <span className='desc'>| {description}</span>
                &nbsp;&nbsp;
            </div>
			<button className='delete' onClick={handleDelete}>Delete</button>
		</li>
	)
}

export default Goal