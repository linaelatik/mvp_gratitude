// Array to hold the user’s gratitude items
let gratitudeItems = [];

// Grab DOM elements
const gratitudeInput = document.getElementById("gratitude-input");
const gratitudeList = document.getElementById("gratitude-list");
const emailSection = document.getElementById("email-section");
const completionMessage = document.getElementById("completion-message");
const emailInput = document.getElementById("email-input");
const submitBtn = document.getElementById("submit-btn");

// 1. Add gratitude item on 'Enter'
gratitudeInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const item = gratitudeInput.value.trim();
    if (item) {
      gratitudeItems.push(item);
      renderGratitudeList();
      gratitudeInput.value = "";

      if (gratitudeItems.length === 10) {
        // Show email section after 10 items
        emailSection.style.display = "block";
      }
    }
  }
});

// 2. Render the gratitude list
function renderGratitudeList() {
  gratitudeList.innerHTML = ""; // clear before re-render
  gratitudeItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    gratitudeList.appendChild(li);
  });
}

// 3. Handle submission
submitBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  if (!email) {
    alert("Please enter a valid email address.");
    return;
  }

  // Prepare data to send to the server
  const data = {
    email,
    items: gratitudeItems,
  };

  try {
    // Send data to server
    const response = await fetch("http://localhost:3000/api/gratitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Show a confirmation message
      emailSection.style.display = "none";
      completionMessage.style.display = "block";
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Could not submit. Please check your connection.");
  }
});
