import React, { useState } from 'react';
import './App.css';

function App() 
{
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [contacts, setContacts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentContactId, setCurrentContactId] = useState(null);

    const addName = () => 
	{
        if (name) 
		{
            setCurrentContactId(null); // New contact
            setIsEditing(true);
        }
    }

    const addOrUpdateContact = () => 
	{
        if (phone && phoneType) 
		{
            if (currentContactId === null) 
			{ // Adding the new contact
                const newContact = 
				{
                    id: Date.now(),
                    name,
                    numbers: [{ type: phoneType, value: phone }]
                };
                setContacts([...contacts, newContact]);
            } else 
			{ // Updating the existing contact
                const updatedContacts = contacts.map(contact => 
				{
                    if (contact.id === currentContactId) 
					{
                        return {
                            ...contact,
                            numbers: [...contact.numbers, { type: phoneType, value: phone }]
                        };
                    }
                    return contact;
                });
                setContacts(updatedContacts);
            }
            setIsEditing(false);
            setPhone('');
            setPhoneType('');
            setName(''); // Resetting the name after adding or updating the contact 
        }
    };

    const startUpdateContact = (contactId) => 
	{
        setCurrentContactId(contactId);
        setIsEditing(true);
    }

    const deleteContact = (id) => 
	{
        const newContacts = contacts.filter(contact => contact.id !== id);
        setContacts(newContacts);
    };

    return (
        <div className="container">
            <h1>Contact List</h1>
            {isEditing ? (
                <div className="input-group">
                    <p>Adding number for {contacts.find(contact => contact.id === currentContactId)?.name || name}</p>
                    <input
                        type="text"
                        placeholder="Phone Type (e.g. mobile)"
                        value={phoneType}
                        onChange={(e) => setPhoneType(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={addOrUpdateContact}>Add/Update Contact</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={addName}>Next</button>
                </div>
            )}

            <ul>
                {contacts.map(contact => 
				(
                    <li key={contact.id} className="contact-item">
                        <p>{contact.name}</p>
                        {contact.numbers.map((number, idx) => 
						(
                            <div key={idx}>
                                <p>{number.type}: {number.value}</p>
                            </div>
                        ))}
                        <button onClick={() => deleteContact(contact.id)}>Delete</button>
                        <button onClick={() => startUpdateContact(contact.id)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;







