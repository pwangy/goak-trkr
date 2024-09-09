
const Goal = ({ goal, handleUpdateGoal, handleDeleteGoal }) => {
    const {id, title, description, status} = goal

    const handleDelete = () => {
        fetch(`/goals/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status === 204) {
                    handleDeleteGoal(id)
                    console.log('Goal deleted')
                } else {
                    return res.json().then(errorObj => {
                        throw new Error(errorObj.error)
                    })
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <li>
			<span>{status}</span> | 
            <span>{title}</span> | 
            <span>{description}</span> | 
			<button> Update Status</button>
			<button className='delete' onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default Goal