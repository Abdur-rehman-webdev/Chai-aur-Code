// Code snippet of Form practice code

// .................................................................

let data = {
  fName: "",
  lName: "",
  email: "",
  phone: "",
  id: "",
  size: "",
};

$w.onReady(function () {});

function formData(fName, lName, email, phone, id, size) {
  data.fName = fName;
  data.lName = lName;
  data.email = email;
  data.phone = phone;
  data.id = id;
  data.size = size;
  return data;
}

$w("#button1").onClick((event) => {
  if (!$w("#fName").value || !$w("#lName").value || !$w("#email").value) {
    $w("#error").show();
    $w("#error").text = "All the Fields Required!";
    setTimeout(() => {
      $w("#error").hide();
    }, 2000);
    return;
  }
  let object = formData(
    $w("#fName").value,
    $w("#lName").value,
    $w("#email").value,
    $w("#phone").value,
    $w("#id").value,
    $w("#size")
  );
  console.log(object);
});

// .................................................................

// Create contact form and triggers emails

// ................................................................

import { contacts, triggeredEmails } from "wix-crm-frontend";

$w.onReady(function () {
  $w("#submit").onClick(async () => {
    const firstName = $w("#fName").value;
    const lastName = $w("#lName").value;
    const email = $w("#email").value;
    const phone = $w("#phone").value;

    const contactInfo = {
      name: { first: firstName, last: lastName },
      emails: [{ email: email }],
      phones: [{ phone: phone }],
    };

    let resolvedContact;

    try {
      resolvedContact = await contacts.appendOrCreateContact(contactInfo);
      console.log("Resolved to contact", resolvedContact);

      if (resolvedContact.identityType !== "CONTACT") {
        console.log(
          "Current contact is already a site member. Not sending a welcome email."
        );

        return;
      } else {
        const emailId = "UZHQTyg";
        const contactId = resolvedContact.contactId;
        const options = {
          variables: { firstName: firstName, lastName: lastName },
        };

        await triggeredEmails.emailContact(emailId, contactId, options);
        console.log("Emailed contact");
      }
    } catch (error) {
      console.error(error);
    }
  });
});

// Code sinipit for Repeater data through code :

$w.onReady(function () {
  const staticData = [
    { _id: "1", language: "English", greetings: "Hello" },
    { _id: "2", language: "Spanish", greetings: "Hello" },
    { _id: "3", language: "Italian", greetings: "Hello" },
    { _id: "4", language: "German", greetings: "Hello" },
    { _id: "5", language: "Russian", greetings: "Hello" },
  ];
  $w("#myRepeater").onItemReady(($item, itemData, index) => {
    $item("#language").text = index + ":" + itemData.language;
    $w("#greetings").text = itemData.language;
  });

  $w("#myRepeater").data = staticData;
});

// ................................................................

// Todo Program in Wix / Velo

// ...............................................................
import wixData from "wix-data";

$w.onReady(function () {
  $w("#addTaskButton").onClick(addTask);

  $w("#repeater1").onItemReady(($item, itemData) => {
    $item("#taskTitle").text = itemData.taskTitle;

    $item("#taskCheckbox").checked = itemData.isCompleted;

    styleTaskTitle($item, itemData.isCompleted);

    $item("#taskCheckbox").onChange((event) => {
      taskCheckbox_change(event, itemData._id, itemData.taskTitle, $item);
    });

    $item("#deleteButton").onClick(() => {
      deleteTask(itemData._id);
    });
  });
});

function addTask() {
  const taskTitle = $w("#taskInput").value;

  if (taskTitle) {
    wixData
      .insert("ToDoList", { taskTitle: taskTitle, isCompleted: false })
      .then(() => {
        console.log("Task is added");
        $w("#dataset1").refresh();
        $w("#taskInput").value = "";
      });
  }
}

function taskCheckbox_change(event, itemId, taskTitle, $item) {
  const isChecked = event.target.checked;

  wixData
    .update("ToDoList", {
      _id: itemId,
      taskTitle: taskTitle,
      isCompleted: isChecked,
    })
    .then(() => {
      console.log("Task status updated");
      styleTaskTitle($item, isChecked);
      $w("#dataset1").refresh();
    });
}

function styleTaskTitle($item, isCompleted) {
  const taskTitleElement = $item("#taskTitle");

  if (isCompleted) {
    taskTitleElement.style.color = "gray";
  } else {
    taskTitleElement.style.color = "black";
  }
}

function deleteTask(itemId) {
  wixData
    .remove("ToDoList", itemId)
    .then(() => {
      console.log("Task deleted");
      $w("#dataset1").refresh();
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
}

// Code snippet of program of Phone book

import wixData from "wix-data";
import wixLocation from "wix-location";
import wixWindow from "wix-window";

$w.onReady(function () {
  loadContacts();

  $w("#saveButton").onClick(saveContact);
  $w("#updateButton").onClick(updateContact);

  $w("#repeater").onItemReady(($item, itemData) => {
    setupRepeaterItem($item, itemData);
  });
});

function loadContacts() {
  wixData
    .query("PhoneBook")
    .find()
    .then((results) => {
      $w("#repeater").data = results.items;
    })
    .catch((err) => console.error("Load Error:", err));
}

function saveContact() {
  const name = $w("#nameInput").value;
  const phoneNumber = $w("#phoneNumberInput").value;
  const email = $w("#emailInput").value;

  if (name && phoneNumber && email) {
    wixData
      .insert("PhoneBook", { name, phoneNumber, email })
      .then(() => {
        loadContacts();
        clearForm();
        console.log("Contact saved successfully");
      })
      .catch((err) => console.error("Save Error:", err));
  } else {
    console.log("Please fill in all fields");
  }
}

function updateContact() {
  const id = $w("#contactId").value;
  const name = $w("#nameInput").value;
  const phoneNumber = $w("#phoneNumberInput").value;
  const email = $w("#emailInput").value;

  if (id && name && phoneNumber && email) {
    wixData
      .update("PhoneBook", { _id: id, name, phoneNumber, email })
      .then(() => {
        loadContacts();
        clearForm();
        console.log("Contact updated successfully");
      })
      .catch((err) => console.error("Update Error:", err));
  } else {
    console.log("Please select a contact and fill in all fields");
  }
}

function setupRepeaterItem($item, itemData) {
  $item("#nameText").text = itemData.name;
  $item("#phoneText").text = itemData.phoneNumber;
  $item("#emailText").text = itemData.email;

  $item("#editButton").onClick(() => {
    $w("#contactId").value = itemData._id;
    $w("#nameInput").value = itemData.name;
    $w("#phoneNumberInput").value = itemData.phoneNumber;
    $w("#emailInput").value = itemData.email;
  });

  $item("#deleteButton").onClick(() => {
    console.log("Delete button clicked");
    wixWindow
      .openLightbox("DeleteConfirmation", { id: itemData._id })
      .then((result) => {
        if (result === "confirmed") {
          wixData
            .remove("PhoneBook", itemData._id)
            .then(() => {
              loadContacts();
              console.log("Contact deleted successfully");
            })
            .catch((err) => console.error("Delete Error:", err));
        }
      });
  });

  $item("#viewButton").onClick(() => {
    console.log(`Navigating to details page for ID: ${itemData._id}`);
    wixLocation.to(`/phonebookdetails?id=${itemData._id}`);
  });
}

function clearForm() {
  $w("#nameInput").value = "";
  $w("#phoneNumberInput").value = "";
  $w("#emailInput").value = "";
  $w("#contactId").value = "";
}

// Details page code
import wixData from "wix-data";
import wixLocation from "wix-location";

$w.onReady(function () {
  const queryParams = wixLocation.query;
  const contactId = queryParams.id;

  if (contactId) {
    wixData
      .get("PhoneBook", contactId)
      .then((contact) => {
        if (contact) {
          $w("#nameText").text = contact.name;
          $w("#phoneNumberText").text = contact.phoneNumber;
          $w("#emailText").text = contact.email;
        } else {
          console.error("Contact not found");
          $w("#nameText").text = "Contact not found";
        }
      })
      .catch((err) => console.error("Error loading contact:", err));
  } else {
    console.error("No contact ID provided");
    $w("#nameText").text = "No contact ID provided";
  }
});

// Light Box Code

import wixWindow from "wix-window";

let contactId;

$w.onReady(function () {
  const context = wixWindow.lightbox.getContext();
  contactId = context.id;

  $w("#confirmDeleteButton").onClick(() => {
    wixWindow.lightbox.close("confirmed");
  });

  $w("#cancelButton").onClick(() => {
    wixWindow.lightbox.close("cancelled");
  });
});

// ...............................................................
