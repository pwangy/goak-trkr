/* eslint-disable react/prop-types */
import Goal from './Goal'

const GoalsList = ({ goals, handleUpdateGoal, handleDeleteGoal }) => {
	const mappedGoals = goals.map((goal) => (
		<Goal
			key={goal.id}
			goal={goal}
			handleUpdateGoal={handleUpdateGoal}
			handleDeleteGoal={handleDeleteGoal}
		/>
	))

	return <ul>{mappedGoals}</ul>
}

export default GoalsList
