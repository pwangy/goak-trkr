import { useEffect, useState } from 'react'
import GoalsList from '../components/GoalsList'
import Form from '../components/Form'
import Filter from '../components/Filter'

const Trkr = () => {
	const [goals, setGoals] = useState([])
    const [filteredGoals, setFilteredGoals] = useState([])

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
                setFilteredGoals(data)
				console.log('Response received:', data)
			})
			.catch((err) => console.error('Error:', err.message))
	}, [])

	const handleDeleteGoal = (id) => {
		const updatedGoals = goals.filter((goal) => goal.id !== id)
		setGoals(updatedGoals)
        setFilteredGoals(updatedGoals)
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
        setFilteredGoals(updatedGoals)
	}

	const handleAddGoal = (newGoal) => {
		const updatedGoals = [...goals, newGoal]
		setGoals(updatedGoals)
        setFilteredGoals(updatedGoals)
    }

    const handleFilterChange = (filters) => {
        if (filters.all) {
            setFilteredGoals(goals)
        } else {
            const filtered = goals.filter((goal) => {
                if (filters.notStarted && goal.status === 'Not Started') return true
                if (filters.inProgress && goal.status === 'In Progress') return true
                if (filters.completed && goal.status === 'Completed') return true
                return false
            })
            setFilteredGoals(filtered)
        }
	}

	return (
		<>
			<Form onAdd={handleAddGoal} />
            <Filter onFilterChange={handleFilterChange} />
			<GoalsList
				goals={filteredGoals}
				handleUpdateGoal={handleUpdateGoal}
				handleDeleteGoal={handleDeleteGoal}
			/>
		</>
	)
}

export default Trkr
