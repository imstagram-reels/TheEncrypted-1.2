    
    
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
        import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

        // إعدادات Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCOjAC8Ac9HRrdfmCC40ga_UUjmO7HIe4Q",
            authDomain: "theencrypted-7a9d4.firebaseapp.com",
            databaseURL: "https://theencrypted-7a9d4-default-rtdb.firebaseio.com",
            projectId: "theencrypted-7a9d4",
            storageBucket: "theencrypted-7a9d4.firebasestorage.app",
            messagingSenderId: "918846542921",
            appId: "1:918846542921:web:3b6938838b2c3b97319b98"
        };

        // تهيئة Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        // المتغيرات وعناصر HTML
        let newTime;
        const userForm = document.getElementById("userForm");
        const resultDiv = document.getElementById("result");
        const inputField = document.getElementById("input");
        const usersList = document.getElementById("usersList"); // العنصر الخاص بعرض البيانات

        // دالة لتحويل الوقت
        function analyze() {
            let str = String(Date.now());
            let output = "";
            for (let char of str) {
                if (char === '1') output += ".----";
                else if (char === '2') output += "..---";
                else if (char === '3') output += "...--";
                else if (char === '4') output += "....-";
                else if (char === '5') output += ".....";
                else if (char === '6') output += "-....";
                else if (char === '7') output += "--...";
                else if (char === '8') output += "---..";
                else if (char === '9') output += "----.";
                else if (char === '0') output += "-----";
                else output += "#!";
                output += " ";
            }
            resultDiv.innerHTML = output;
            return output; // نرجع القيمة المشفرة
        }

        // دالة لإرسال البيانات إلى Firebase
        function writeUserData(userId, name) {
            set(ref(database, 'users/' + userId), {
                input: name,
            })
            .catch((error) => {
                console.error("error" + error);
            });
        }
        
        // دالة لقراءة البيانات وعرضها
        function displayUsers() {
            const dbRef = ref(database);
            get(child(dbRef, 'users')).then((snapshot) => {
                if (snapshot.exists()) {
                    const users = snapshot.val();
                    usersList.innerHTML = '';
                    for (let id in users) {
                        const li = document.createElement('li');
                        li.textContent = `${users[id].input}`;
                        usersList.appendChild(li);
                    }
                } else {
                    usersList.textContent = "لا توجد بيانات";
                }
            }).catch((error) => {
                console.error(error);
            });
        }

        // التعامل مع الفورم عند الإرسال
        userForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = inputField.value;
            if (name.trim() === "") {
                document.getElementById("result").innerHTML = "Data entry is required to complete the process."
                return;
            }
            newTime = Date.now();
            analyze(); // تشغيل دالة التشفير فقط للعرض
            writeUserData(newTime, name); // إرسال البيانات إلى Firebase
            userForm.reset();
            console.log(newTime)
        });

        // دالة لنسخ النص
        window.copyText = function() {
            const resultText = resultDiv.textContent;
            navigator.clipboard.writeText(resultText).then(() => {
            }).catch(err => {
                console.error('copy error', err);
            });
        }
        
        // نعرض البيانات مباشرة عند فتح الصفحة
        displayUsers();

    window.addEventListener("load", () => {
      const loader = document.getElementById("re-div");
      setTimeout(() => {
        loader.classList.add("hidden");
      }, 250);
    });
