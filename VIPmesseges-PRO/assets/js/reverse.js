let decodedText = "";
    function analyze() {
      const morseInput = document.getElementById('input').value.trim();

      const morseToTextMap = {
        '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
        '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0',
      };

      let words = morseInput.split(" ");

      for (let code of words) {
        if (morseToTextMap[code]) {
          decodedText += morseToTextMap[code];
        }
        else if (morseInput.trim() === "") {
            document.getElementById("result").innerHTML = "Data entry is required to complete the process.";
        }
        else {
          decodedText += "#"; // رمز غير معروف
        }
      }

      // document.getElementById("result").innerText = decodedText;
      console.log(decodedText)
      window.analyze = analyze; // نخليها global باش onclick يقدر يناديها
    }



const results = document.getElementById("result");
// const userIdInput = decodedText;
const analyzeBtn = document.getElementById("button-analyze-and-time"); // زر جديد

analyzeBtn.addEventListener("click", function() {
  const userId = decodedText.trim();
  if (userId) {
    getUserById(userId);
  } else {
    results.textContent = "Data entry is required to complete the process.";
  }
});

function getUserById(userId) {
  const dbRef = ref(database);
  get(child(dbRef, 'users/' + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        results.innerHTML = `<strong></strong> ${user.input}`;
      } else {
        results.textContent = "Server error. Please try again later.";
      }
    })
    .catch((error) => {
      console.error(error);
      results.textContent = "❌ حدث خطأ، تحقق من Console";
    });
}
    window.addEventListener("load", () => {
      const loader = document.getElementById("re-div");
      setTimeout(() => {
        loader.classList.add("hidden");
      }, 250);
    });
