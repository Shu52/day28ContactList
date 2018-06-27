const $ = require("jquery")

const contactCollectionModule = require("./ContactCollection")
const contactListModule = require("./ContactList")

const addNewContact = () => {//add new contact function. gets input values from form, called by event listener
  const newContactName = $(".name-form-field").val()
  const newContactPhone = $(".phone-form-field").val()
  const newContactAddr = $(".addr-form-field").val()
  console.log("add button clicked", newContactName, newContactPhone, newContactAddr);
  contactCollectionModule.postContact(newContactName, newContactPhone, newContactAddr) //post contact to database
  .then((response) => {
    console.log("response", response)
    contactListModule.buildContactList()//refresh dom
  })
}
const editContact = () => { //edit function
  const contactId = event.currentTarget.parentNode.id //sets contact id to parent node id
  ContactCollectionModule.getContact(contactId) //call to contact collection module method
  .then((response) => {
    console.log("contact to be edited", response.phone);//shows that response is an object. logging phone property
    buildContactForm(response) // calls build edit contact form and fills argument in build edit contact form
  })
}

const contactForm = Object.create({}, {//creates dom elements, called in main.js
  buildContactForm: {
    value: function() {
      const formArticle = document.createElement("article")

      const nameSection = document.createElement("section")

      const nameLabel = document.createElement("label")
      nameLabel.textContent = "Name: "
      nameSection.appendChild(nameLabel)

      const nameField = document.createElement("input")
      nameField.setAttribute("type", "text")
      nameField.className = "name-form-field name-edit-field"
      nameSection.appendChild(nameField)

      formArticle.appendChild(nameSection)

      const phoneSection = document.createElement("section")

      const phoneLabel = document.createElement("label")
      phoneLabel.textContent = "Phone: "
      phoneSection.appendChild(phoneLabel)

      const phoneField = document.createElement("input")
      phoneField.setAttribute("type", "tel")
      phoneField.className = "phone-form-field phone-edit-field"
      phoneSection.appendChild(phoneField)

      formArticle.appendChild(phoneSection)

      const addrSection = document.createElement("section")

      const addrLabel = document.createElement("label")
      addrLabel.textContent = "Address: "
      addrSection.appendChild(addrLabel)

      const addrFieldOne = document.createElement("input")
      addrFieldOne.setAttribute("type", "text")
      addrFieldOne.className = "addr-form-field addr-edit-field"
      addrSection.appendChild(addrFieldOne)
      formArticle.appendChild(addrSection)

      const addButton = document.createElement("button")
      addButton.textContent = "Add"
      addButton.setAttribute("type","submit")
      addButton.addEventListener("click", addNewContact)//calls above function
      formArticle.appendChild(addButton)

      document.querySelector("#display-container").appendChild(formArticle)
    }
  }
})

module.exports = contactForm, editContact
