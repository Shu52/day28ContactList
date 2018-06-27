const $ = require("jquery")
const ContactCollectionModule = require("./ContactCollection")
const ContactListModule = require("./ContactList")

const deleteContact = () => { //delete function called in event listener
  console.log("delete button clicked", event.currentTarget.parentNode.id)
  const contactId = event.currentTarget.parentNode.id //sets contactId to parent node id
  ContactCollectionModule.deleteContact(contactId) //call to contact collection module
  .then(() => {
    ContactListModule.buildContactList() //refresh dom
  })
}



const buildEditContactForm = (contact) => { //builds new edit form at bottom of dom
  const editContactArticle = document.createElement("article") //create article section
  editContactArticle.className = "edit-contact-article" //adds class to article

  const nameSection = document.createElement("section")// creates section

  const nameLabel = document.createElement("label")//creates label
  nameLabel.textContent = "Name: "// adds text content
  nameSection.appendChild(nameLabel) // appends to section

  const nameField = document.createElement("input") //creates input field
  nameField.setAttribute("type", "text")//sets type
  nameField.className = "name-edit-field"//sets class
  nameField.value = contact.name// sets value, calls contact object
  nameSection.appendChild(nameField) // appends to section

  editContactArticle.appendChild(nameSection)// appends section to article

  const phoneSection = document.createElement("section") // creates section for phone

  const phoneLabel = document.createElement("label")//creates label
  phoneLabel.textContent = "Phone: " //creates text for label
  phoneSection.appendChild(phoneLabel)//appends label to phone section

  const phoneField = document.createElement("input")//creates input
  phoneField.setAttribute("type", "tel")//sets type
  phoneField.className = "phone-edit-field"//sets class
  phoneField.value = contact.phone//sets value
  phoneSection.appendChild(phoneField)//appends input to section

  editContactArticle.appendChild(phoneSection) //appends section to article

  const addrSection = document.createElement("section") //create section

  const addrLabel = document.createElement("label")//creates label
  addrLabel.textContent = "Address: "//sets text for label
  addrSection.appendChild(addrLabel)//append label to address section

  const addrFieldOne = document.createElement("input")//creates input for address
  addrFieldOne.setAttribute("type", "text")//sets type
  addrFieldOne.className = "addr-edit-field"//sets class
  addrFieldOne.value = contact.address//sets value
  addrSection.appendChild(addrFieldOne) //appends input to address section

  editContactArticle.appendChild(addrSection)// appends address section to article

  const editButton = document.createElement("button") //creates edit button
  editButton.textContent = "Update"//text for button
  editButton.id = `${contact.id}`//sets id to current objects id jQuery WOOOAH!
  editButton.addEventListener("click", editExistingContact)//event listener on button
  editContactArticle.appendChild(editButton)// appends button to article

  document.querySelector("#display-container").appendChild(editContactArticle) //appends article to div in index.html
}

const editExistingContact = () => {//called by edit button
  const contactId = event.currentTarget.id
  const contactName = $(".name-edit-field").val()//jQuery WOOOAH!
  const contactPhone = $(".phone-edit-field").val()
  const contactAddress = $(".addr-edit-field").val()
  ContactCollectionModule.putContact(contactId, contactName, contactPhone, contactAddress)//gets data from input fields and calls contact collection module method putContact
  .then(() => {
    document.querySelector(".edit-contact-article").remove()
    ContactListModule.buildContactList()//refresh dom
  })
}

const contact = Object.create({}, {//object to hold create contact component
  "createContactComponent": { //creates a section that holds buttons and paragraph elements with contact info based on json id
    value: function(contact) {

      const contactSection = document.createElement("section")
      contactSection.id = `${contact.id}`

      for(key in contact){
        if(key === "id") {
          const deleteButton = document.createElement("button")
          deleteButton.textContent = "Delete"
          deleteButton.addEventListener("click", deleteContact)
          contactSection.appendChild(deleteButton)

          const editContact = require("./ContactForm")
          const editButton = document.createElement("button")
          editButton.textContent = "Edit"
          editButton.addEventListener("click", editContact)
          contactSection.appendChild(editButton)
        } else {
          const paraElement = document.createElement("p")
          paraElement.textContent = `${key}: ${contact[key]}`
          contactSection.appendChild(paraElement)
        }
      }

      return contactSection
    }
  }
})

module.exports = contact
