const $ = require("jquery")
//object that holds post, get, delete, edit, get only one contact, and put methods
const contactCollection = Object.create({}, {
  "postContact": {
    value: function(name, phone, address) {//this method accepts three arguments and set values to post
      return $.ajax({
        url: "http://localhost:3000/contacts",
        method: "POST",
        data: {
          name: name,
          phone: phone,
          address: address
        }
      })
    }
  },
  "getContacts": {//gets all contacts, needed to build contact list
    value: function() {
      return $.ajax("http://localhost:3000/contacts")
    }
  },
  "deleteContact": {//delete contact by selected id
    value: function(id){
      return $.ajax({
        url: `http://localhost:3000/contacts/${id}`,
        method: "DELETE"
      })
    }
  },
  "getContact": {//get one contact by selected id. needed before edit
    value: function(id) {
      return $.ajax(`http://localhost:3000/contacts/${id}`)
    }
  },
  "putContact": {//edits existing contact, takes four argument
    value: function(id, name, phone, address){
      return $.ajax({
        url: `http://localhost:3000/contacts/${id}`,
        method: "PUT",
        data: {
          name: name,
          phone: phone,
          address: address
        }
      })
    }
  }
})

module.exports = contactCollection
