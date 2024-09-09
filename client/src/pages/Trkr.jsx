import { useEffect, useState } from 'react'
import GoalsList from '../components/GoalsList'
import Form from '../components/Form'

const Trkr = () => {
	const [goals, setGoals] = useState([])

	useEffect(() => {
		fetch('/goals')
			.then((res) => {
				console.log('Response received:', res)
				if (!res.ok) {
					return res.text().then((text) => {
						throw new Error(text)
					})
				}
				return res.json()
			})
			.then((data) => {
				setGoals(data)
				console.log('Response received:', data)
			})
			.catch((err) => console.error('Error:', err.message))
	}, [])

	const handleDeleteGoal = (id) => {
		const updatedGoals = goals.filter((goal) => goal.id !== id)
		setGoals(updatedGoals)
	}

	const handleUpdateGoal = (updatedGoal) => {
		const updatedGoals = goals.map((goal) => {
			if (goal.id === updatedGoal.id) {
				return updatedGoal
			} else {
				return goal
			}
		})
		setGoals(updatedGoals)
	}

	const handleAddGoal = (newGoal) => {
		const updatedGoals = [...goals, newGoal]
		setGoals(updatedGoals)
	}

	return (
		<>
			<Form onAdd={handleAddGoal} />
			<GoalsList
				goals={goals}
				handleUpdateGoal={handleUpdateGoal}
				handleDeleteGoal={handleDeleteGoal}
			/>
		</>
	)
}

export default Trkr
