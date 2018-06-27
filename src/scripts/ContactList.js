const contactCollectionModule = require("./ContactCollection")

const contactList = Object.create({}, {// builds contact list
  "buildContactList": {
    value: function(){
      contactCollectionModule.getContacts() //cal to contact collection
      .then((response) => {
        console.log("all contacts", response)
        const currentListRef = document.querySelector(".list-contacts-article")//ref to article
        if(currentListRef){
          currentListRef.remove()//clears dom
        }
        const contactsArticle = document.createElement("article")
        contactsArticle.className = "list-contacts-article edit-contact-article"
        const contactModule = require("./Contact")//this require moved into scope to avoid circular dependency
        response.forEach(contact => {
          contactsArticle.appendChild(contactModule.createContactComponent(contact))
        });
        document.querySelector("#display-container").appendChild(contactsArticle)
      })
    }
  }
})

module.exports = contactList
