const db = require("../models");
const Contacts = db.contacts;

// Create contact
exports.create = (req, res) => 
{
    if (!req.body.name) {
        res.status(400).send(
		{
            message: "Name is required!"
        });
        return;
    }

    const contact = 
	{
        name: req.body.name
    };

    Contacts.create(contact)
        .then(data => 
		{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(
			{
                message: err.message || "Some error occurred while creating the Contact."
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => 
{
    Contacts.findAll()
        .then(data => 
		{
            res.send(data);
        })
        .catch(err => 
		{
            res.status(500).send(
			{
                message: err.message || "Some error occurred."
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => 
{
    const id = req.params.contactId;

    Contacts.findByPk(id)
        .then(data => 
		{
            if (!data) 
			{
                res.status(404).send({ message: "Contact not found with id " + id });
            } else 
			{
                res.send(data);
            }
        })
        .catch(err => 
		{
            res.status(500).send({ message: "Error retrieving Contact with id=" + id });
        });
};
