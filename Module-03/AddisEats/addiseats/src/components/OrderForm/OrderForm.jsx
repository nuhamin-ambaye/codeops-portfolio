import React from 'react'
import { useState } from 'react'

function OrderForm () {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        area: ''
    })

const isValidPhone = /^(?:\+251|0)[79]\d{8}$/.test(form.phone);

function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
}

function handleSubmit(e){
    e.preventDefault();
    console.log("Form submitted: ", form);
}

    return (
        <form onSubmit={handleSubmit}>
        <h3>TeleBirr delivery details</h3>

        <div>
            <label>Name: </label>
            <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Abebe Kebede"
            />
        </div>

        <div>
            <label>Phone: </label>
            <input 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            placeholder="Start with 09.., 07.. or +251.."
            />
            {form.phone && !isValidPhone && (
                <p className="err" style={{ color: 'red' }}>
                    Use 09.., 07.. or +251.. format.
                </p>
            )}
        </div>

        <div>
            <label>Area: </label>
            <input 
            name="area" 
            value={form.area} 
            onChange={handleChange} 
            placeholder="Kazanchis"
            />
        </div>

        <button type="submit">Submit Order</button>
        </form>
    )
}

export default OrderForm