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



    












// function analyze() {
//     const inpu = document.getElementById("Input").value.trim().split(" "); 
//     let decryptedStr = "";

//     // لكل رمز (شرطات ونقاط) في السلسلة المشفرة
//     for (let symbol of inpu) {
//         if (symbol === "----.") {
//             decryptedStr += "1";
//         } else if (symbol === "---..") {
//             decryptedStr += "2";
//         } else if (symbol === "--...") {
//             decryptedStr += "3";
//         } else if (symbol === "-....") {
//             decryptedStr += "4";
//         } else if (symbol === ".....") {
//             decryptedStr += "5";
//         } else if (symbol === "....-") {
//             decryptedStr += "6";
//         } else if (symbol === "...--") {
//             decryptedStr += "7";
//         } else if (symbol === "..---") {
//             decryptedStr += "8";
//         } else if (symbol === ".----") {
//             decryptedStr += "9";
//         } else if (symbol === "-----") {
//             decryptedStr += "0";
//         }
//         else {
//           decryptedStr += "#!"
//         }
//     }

//     document.getElementById("result").innerHTML = decryptedStr ;
//     console.log(decryptedStr);
//   }
  


  // مثال على الاستخدام:
  // const encryptedTime = document.getElementById(input);
  
//   const originalTimestamp = decryptTime(encryptedTime);

// console.log(`الرمز المشفر: ${encryptedTime}`);
// console.log(`الرقم الأصلي: ${originalTimestamp}`);
// console.log(`التاريخ والوقت المقابل: ${new Date(originalTimestamp)}`);









// function analyze() {
//     const text = document.getElementById('Input').value.toLowerCase();
//     const letters = {
//         '----.': '1',
//         '---..': '2',
//         '--...': '3',
//         '-....': '4',
//         '.....': '5',
//         '....-': '6',
//         '...--': '7',
//         '..---': '8',
//         '.----': '9',
//         '-----': '0'
//   };

//   let dis = "";
// const regex = /([.-]{5})/g;
//   const codes = text.match(regex);

//   if (!codes) {
//         dis = "#!";
//       } else {
//             for (let code of codes) {
//                   if (letters[code]) {
//                         dis += letters[code];
//                       } else if (letters === " "){
//         dis += " ";
//       }
//       else {
//         dis += "#!";
//       }
//     }
//   }

//   document.getElementById("result").innerHTML = dis;
// }




// les espase mamgadch
// const morseMapping = {
//   '----.': '1',
//   '---..': '2',
//   '--...': '3',
//   '-....': '4',
//   '.....': '5',
//   '....-': '6',
//   '...--': '7',
//   '..---': '8',
//   '.----': '9',
//   '-----': '0'
// };

// function analyze() {
//     let str = String(Date.now());
//     let output = "";
//     for (let char of str) {
//         output += morseMapping[char] || '#!';
//         output += " ";
//     }
//     resultDiv.innerHTML = output;
//     return output;
// }