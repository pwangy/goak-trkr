import Goal from './Goal'

const GoalsList = ({ goals, handleUpdateGoal, handleDeleteGoal }) => {
	const mappedGoals = goals.map((goal) => (
		<Goal
			key={goal.id}
			goal={goal}
			onUpdate={handleUpdateGoal}
			onDelete={handleDeleteGoal}
		/>
	))

	return <ul>{mappedGoals}</ul>
}

export default GoalsList
