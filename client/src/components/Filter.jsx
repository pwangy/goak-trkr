/* eslint-disable react/prop-types */
import { useState } from 'react'

const Filter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        all: true,
        notStarted: false,
        inProgress: false,
        completed: false,
    })

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        const newFilters = { ...filters, [name]: checked }

        if (name === 'all' && checked) {
            newFilters.notStarted = true
            newFilters.inProgress = true
            newFilters.completed = true
        } else if (name === 'all' && !checked) {
            newFilters.notStarted = false
            newFilters.inProgress = false
            newFilters.completed = false
        } else {
            newFilters.all = newFilters.notStarted && newFilters.inProgress && newFilters.completed
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <section>
            <p>Display</p>
            <label>
                <input
                    type="checkbox"
                    name="all"
                    checked={filters.all}
                    onChange={handleCheckboxChange}
                />
                All
            </label>
            <label>
                <input
                    type="checkbox"
                    name="notStarted"
                    checked={filters.notStarted}
                    onChange={handleCheckboxChange}
                />
                Not Started
            </label>
            <label>
                <input
                    type="checkbox"
                    name="inProgress"
                    checked={filters.inProgress}
                    onChange={handleCheckboxChange}
                />
                In Progress
            </label>
            <label>
                <input
                    type="checkbox"
                    name="completed"
                    checked={filters.completed}
                    onChange={handleCheckboxChange}
                />
                Completed
            </label>
        </section>
    )
}

export default Filter