/* eslint-disable react/prop-types */
import { useState } from 'react'

const Form = ({ onAdd }) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [errors, setErrors] = useState({})

    const validate = (name, value) => {
        const errors = {}
        if (name === 'title' && value.length > 25) {
            errors.title = 'Title must be 25 characters or less'
        }
        if (name === 'description' && value.length > 200) {
            errors.description = 'Description must be 200 characters or less'
        }
        return errors
    }

	const handleTitleChange = (e) => {
        const { value } = e.target
        setTitle(value)
        const validationErrors = validate('title', value)
		setErrors((prevErrors) => ({ ...prevErrors, title: validationErrors.title }))
    }

    const handleDescriptionChange = (e) => {
        const { value } = e.target
        setDescription(value)
        const validationErrors = validate('description', value)
        setErrors((prevErrors) => ({ ...prevErrors, description: validationErrors.description }))
    }

	const handleSubmit = (e) => {
		e.preventDefault()

		const goalData = {
			title: title,
			description: description
		}

		fetch('/goals', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(goalData)
		})
			.then((res) => res.json())
			.then((newGoal) => {
                onAdd(newGoal)
                setTitle('')
                setDescription('')
				setErrors({})
            })
            .catch((err) => console.error(err.message))
	}

	return (
		<div className='new-goal-form'>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						name='title'
						placeholder='Goal title'
						value={title}
						className='input-title'
						onChange={handleTitleChange}
						maxLength={25}
						required={true}
					/>
					{errors.title && <p className='error'>{errors.title}</p>}
				</div>
				<div>
					<input
						type='text'
						name='description'
						placeholder='Short description'
						value={description}
						className='input-desc'
						onChange={handleDescriptionChange}
						maxLength={200}
					/>
					{errors.description && <p className='error'>{errors.description}</p>}
				</div>
				<button type='submit'>Add Goal</button>
			</form>
		</div>
	)
}

// title = db.Column(db.String(25), nullable=False)
// description = db.Column(db.String(200))

export default Form
