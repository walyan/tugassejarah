const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 100;
let questionCounter = 0;
let availableQuesions = [];
let timer;
let TIMER_DURATION = 10000; 

let questions = [
  {
    question: "Siapakah tokoh utama yang membaca teks Proklamasi Kemerdekaan Indonesia pada 17 Agustus 1945?",
    choice1: "Bung Tomo",
    choice2: "Soekarno",
    choice3: "Mohammad Hatta",
    choice4: "Ahmad Yani",
    answer: 2
  },
  {
    question: "Apa nama kerajaan Hindu-Buddha tertua di Indonesia?",
    choice1: "Tarumanagara",
    choice2: "Kutai",
    choice3: "Sriwijaya",
    choice4: "Majapahit",
    answer: 2
  },
  {
    question: "Peristiwa G30S/PKI terjadi pada tahun:",
    choice1: "1945",
    choice2: "1955",
    choice3: "1965",
    choice4: "1975",
    answer: 3
  },
  {
    question: "Peristiwa Sumpah Pemuda terjadi pada tanggal:",
    choice1: "28 Oktober 1928",
    choice2: "17 Agustus 1945",
    choice3: "20 Mei 1908",
    choice4: "10 November 1945",
    answer: 1
  },
  {
    question: "Kerajaan Majapahit mencapai puncak kejayaannya pada masa pemerintahan:",
    choice1: "Raden Wijaya",
    choice2: "Gajah Mada",
    choice3: "Hayam Wuruk",
    choice4: "Tribhuwana Tunggadewi",
    answer: 3
  },
  {
    question: "Siapa pahlawan nasional yang terkenal dengan taktik perang gerilya melawan penjajah?",
    choice1: "Pangeran Diponegoro",
    choice2: "Jenderal Soedirman",
    choice3: "Cut Nyak Dien",
    choice4: "Ki Hajar Dewantara",
    answer: 2
  },
  {
    question: "Perjanjian Linggarjati terjadi pada tahun:",
    choice1: "1945",
    choice2: "1946",
    choice3: "1947",
    choice4: "1948",
    answer: 2
  },
  {
    question: "Apa nama naskah kuno yang menjadi bukti keberadaan Kerajaan Sriwijaya?",
    choice1: "Prasasti Kedukan Bukit",
    choice2: "Prasasti Ciaruteun",
    choice3: "Prasasti Talang Tuo",
    choice4: "Prasasti Kota Kapur",
    answer: 1
  },
  {
    question: "Siapa tokoh di balik organisasi Budi Utomo yang didirikan pada 1908?",
    choice1: "Soekarno",
    choice2: "Mohammad Hatta",
    choice3: "Dr. Sutomo",
    choice4: "R.A. Kartini",
    answer: 3
  },
  {
    question: "Kapan peristiwa Bandung Lautan Api terjadi?",
    choice1: "1945",
    choice2: "1946",
    choice3: "1947",
    choice4: "1948",
    answer: 2
  },
  {
    question: "Perjanjian Renville ditandatangani pada tahun:",
    choice1: "1945",
    choice2: "1946",
    choice3: "1947",
    choice4: "1948",
    answer: 3
  },
  {
    question: "Apa nama kitab yang ditulis oleh Mpu Tantular?",
    choice1: "Sutasoma",
    choice2: "Negarakertagama",
    choice3: "Arjunawiwaha",
    choice4: "Ramayana",
    answer: 1
  },
  {
    question: "Sultan Agung adalah raja terkenal dari kerajaan:",
    choice1: "Majapahit",
    choice2: "Demak",
    choice3: "Mataram Islam",
    choice4: "Banten",
    answer: 3
  },
  {
    question: "Kapan VOC dibubarkan oleh pemerintah Belanda?",
    choice1: "1799",
    choice2: "1800",
    choice3: "1811",
    choice4: "1824",
    answer: 1
  },
  {
    question: "Siapa yang dikenal sebagai 'Bapak Pendidikan Nasional'?",
    choice1: "Ki Hajar Dewantara",
    choice2: "Soekarno",
    choice3: "H.O.S Tjokroaminoto",
    choice4: "Dr. Wahidin Sudirohusodo",
    answer: 1
  },
  {
    question: "Siapa pahlawan wanita dari Aceh yang memimpin perlawanan terhadap Belanda?",
    choice1: "Kartini",
    choice2: "Martha Christina Tiahahu",
    choice3: "Cut Nyak Dien",
    choice4: "Dewi Sartika",
    answer: 3
  },
  {
    question: "Kerajaan Samudera Pasai dikenal sebagai:",
    choice1: "Kerajaan Hindu pertama di Indonesia",
    choice2: "Kerajaan Islam pertama di Indonesia",
    choice3: "Kerajaan terbesar di Nusantara",
    choice4: "Kerajaan penghasil rempah-rempah utama",
    answer: 2
  },
  {
    question: "Perang Diponegoro berlangsung pada tahun:",
    choice1: "1825-1830",
    choice2: "1808-1811",
    choice3: "1873-1904",
    choice4: "1908-1918",
    answer: 1
  },
  {
    question: "Siapa tokoh yang memimpin Peristiwa 10 November 1945 di Surabaya?",
    choice1: "Soedirman",
    choice2: "Bung Tomo",
    choice3: "Douwes Dekker",
    choice4: "Hatta",
    answer: 2
  },
  {
    question: "Dimana Proklamasi Kemerdekaan Indonesia dibacakan?",
    choice1: "Istana Merdeka",
    choice2: "Jl. Pegangsaan Timur No. 56",
    choice3: "Lapangan Ikada",
    choice4: "Monas",
    answer: 2
  },
  {
    question: "Perang Aceh melawan Belanda berakhir pada tahun:",
    choice1: "1900",
    choice2: "1904",
    choice3: "1910",
    choice4: "1920",
    answer: 2
  },
  
  {
    question: "Apa nama kerajaan Islam pertama di Pulau Jawa?",
    choice1: "Demak",
    choice2: "Mataram Islam",
    choice3: "Cirebon",
    choice4: "Banten",
    answer: 1
  },
  {
    question: "Peristiwa Malari terjadi pada tahun:",
    choice1: "1974",
    choice2: "1965",
    choice3: "1988",
    choice4: "1998",
    answer: 1
  },
  {
    question: "Dimana pertempuran besar melawan Belanda yang dikenal dengan 'Puputan' terjadi?",
    choice1: "Aceh",
    choice2: "Bali",
    choice3: "Sulawesi",
    choice4: "Sumatera",
    answer: 2
  },
  {
    question: "Siapa yang menulis buku 'Indonesische Overpeinzingen'?",
    choice1: "Soekarno",
    choice2: "Hatta",
    choice3: "Tan Malaka",
    choice4: "Sutan Sjahrir",
    answer: 3
  },
  {
    question: "Siapa tokoh nasional yang dikenal sebagai pemimpin Perang Padri?",
    choice1: "Tuanku Imam Bonjol",
    choice2: "Diponegoro",
    choice3: "Hassanuddin",
    choice4: "Patimura",
    answer: 1
  },
  {
    question: "Apa nama perjanjian yang mengakhiri konflik Indonesia-Belanda pada tahun 1949?",
    choice1: "Perjanjian Linggarjati",
    choice2: "Perjanjian Renville",
    choice3: "Konferensi Meja Bundar",
    choice4: "Perjanjian Kalijati",
    answer: 3
  },
  {
    question: "Kapan Kerajaan Tarumanegara berdiri?",
    choice1: "Abad ke-4",
    choice2: "Abad ke-5",
    choice3: "Abad ke-6",
    choice4: "Abad ke-7",
    answer: 2
  },
  {
    question: "Peristiwa Serangan Umum 1 Maret terjadi pada tahun:",
    choice1: "1948",
    choice2: "1949",
    choice3: "1950",
    choice4: "1951",
    answer: 2
  },
  {
    question: "Prasasti Ciaruteun ditemukan di daerah mana?",
    choice1: "Jawa Tengah",
    choice2: "Jawa Barat",
    choice3: "Sumatera Selatan",
    choice4: "Sulawesi Selatan",
    answer: 2
  },
  {
    question: "Apa nama kapal perang Belanda yang tenggelam pada Perang Laut Aru?",
    choice1: "De Zeven Provinciën",
    choice2: "Hr. Ms. Evertsen",
    choice3: "Hr. Ms. Karel Doorman",
    choice4: "Hr. Ms. Java",
    answer: 3
  },
  {
    question: "Siapa raja Majapahit pertama?",
    choice1: "Hayam Wuruk",
    choice2: "Raden Wijaya",
    choice3: "Kertarajasa",
    choice4: "Tribhuwana Tunggadewi",
    answer: 2
  },
  {
    question: "Apa tujuan utama dari Politik Etis?",
    choice1: "Eksploitasi sumber daya",
    choice2: "Kemajuan pendidikan rakyat",
    choice3: "Menguatkan kekuasaan Belanda",
    choice4: "Menyebarkan agama Kristen",
    answer: 2
  },
  {
    question: "Siapa pendiri Sarekat Islam?",
    choice1: "H.O.S Tjokroaminoto",
    choice2: "Ki Hajar Dewantara",
    choice3: "Douwes Dekker",
    choice4: "Dr. Sutomo",
    answer: 1
  },
  {
    question: "Apa nama sistem tanam paksa yang diterapkan Belanda pada abad ke-19?",
    choice1: "Cultuurstelsel",
    choice2: "Pajak Tanah",
    choice3: "Politik Etis",
    choice4: "Forced Plantations",
    answer: 1
  },
  {
    question: "Peristiwa Reformasi Indonesia dimulai pada tahun:",
    choice1: "1997",
    choice2: "1998",
    choice3: "1999",
    choice4: "2000",
    answer: 2
  },
  {
    question: "Siapa raja terkenal dari Kerajaan Kutai?",
    choice1: "Purnawarman",
    choice2: "Mulawarman",
    choice3: "Aswawarman",
    choice4: "Jayabaya",
    answer: 2
  },
  {
    question: "Apa nama kerajaan yang didirikan oleh Raden Patah?",
    choice1: "Demak",
    choice2: "Majapahit",
    choice3: "Banten",
    choice4: "Mataram",
    answer: 1
  },
  {
    question: "Prasasti Tugu berisi tentang:",
    choice1: "Penggalian sungai oleh Raja Purnawarman",
    choice2: "Kehidupan rakyat Kutai",
    choice3: "Kebijakan Raja Hayam Wuruk",
    choice4: "Pengangkatan Gajah Mada",
    answer: 1
  },
  {
    question: "Siapa yang dikenal sebagai 'Macan Kemayoran' dalam perjuangan Indonesia?",
    choice1: "Tan Malaka",
    choice2: "Bung Tomo",
    choice3: "Mohammad Yamin",
    choice4: "KH. Hasyim Asy'ari",
    answer: 4
  },
  {
    question: "Perjanjian Tuntang ditandatangani pada tahun:",
    choice1: "1811",
    choice2: "1812",
    choice3: "1813",
    choice4: "1814",
    answer: 1
  },
  {
    question: "Tokoh yang menulis konsep Trisakti adalah:",
    choice1: "Soekarno",
    choice2: "Hatta",
    choice3: "Soeharto",
    choice4: "Tan Malaka",
    answer: 1
  },
  {
    question: "Kerajaan yang terkenal dengan perdagangan rempah-rempah adalah:",
    choice1: "Sriwijaya",
    choice2: "Majapahit",
    choice3: "Ternate",
    choice4: "Tarumanegara",
    answer: 3
  },
  {
    question: "Tokoh wanita dari Maluku yang memimpin perlawanan terhadap Belanda adalah:",
    choice1: "Martha Christina Tiahahu",
    choice2: "Cut Nyak Dien",
    choice3: "Dewi Sartika",
    choice4: "Kartini",
    answer: 1
  },
  {
    question: "Peristiwa Deklarasi Djuanda terjadi pada tahun:",
    choice1: "1956",
    choice2: "1957",
    choice3: "1958",
    choice4: "1959",
    answer: 2
  },
  {
    question: "Tokoh nasional yang dikenal sebagai pemimpin diplomasi pada KMB adalah:",
    choice1: "Soekarno",
    choice2: "Hatta",
    choice3: "Mohammad Roem",
    choice4: "Ali Sastroamidjojo",
    answer: 3
  },
  {
    question: "Raden Ajeng Kartini lahir di kota:",
    choice1: "Jepara",
    choice2: "Semarang",
    choice3: "Yogyakarta",
    choice4: "Surakarta",
    answer: 1
  },
  {
    question: "Kapan Budi Utomo didirikan?",
    choice1: "1908",
    choice2: "1909",
    choice3: "1910",
    choice4: "1911",
    answer: 1
  },
  {
    question: "Siapa yang menyampaikan pidato terkenal 'Indonesia Menggugat'?",
    choice1: "Soekarno",
    choice2: "Hatta",
    choice3: "Sjahrir",
    choice4: "Tan Malaka",
    answer: 1
  },
  {
    question: "Tokoh yang memimpin kerajaan Gowa-Tallo melawan Belanda adalah:",
    choice1: "Sultan Hasanuddin",
    choice2: "Pangeran Antasari",
    choice3: "Tuanku Imam Bonjol",
    choice4: "Diponegoro",
    answer: 1
  }



];



const INCORRECT_TAX = 2;
const UNANSWERED_TAX = 2;
const MAX_QUESTIONS = 50;


startGame = () => {
  questionCounter = 0;
  score = 100;
  correctAnswers = 0;
  incorrectAnswers = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};


getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    
    localStorage.setItem("mostRecentScore", score);
    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("incorrectAnswers", incorrectAnswers);

    
    return window.location.assign("../html/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;

  clearTimeout(timer);
  timer = setTimeout(() => {
    if (acceptingAnswers) {
      decrementScore(UNANSWERED_TAX); 
      incorrectAnswers++; 
      getNewQuestion();
    }
  }, TIMER_DURATION);
};


choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX); 
      incorrectAnswers++; 
    } else {
      correctAnswers++; 
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});


decrementScore = (num) => {
  score -= num;
  if (score < 0) score = 0; 
  scoreText.innerText = score;
};

startGame();