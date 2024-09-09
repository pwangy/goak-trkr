import { useState } from 'react'

const Form = ({ onAdd }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        const goalData = {
            title: title,
            description: description,
        }

        fetch("/goals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goalData),
        })
          .then((res) => res.json())
          .then((newGoal) => onAdd(newGoal));
    }

    return (
        <div className='new-goal-form'>
            <h2>Add a goal</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                placeholder="Goal title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <input
                type="text"
                name="description"
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Goal</button>
            </form>
        </div>
    )
}

export default Form