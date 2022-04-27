
   export function scaleQuestion(position) {
   

    let scaleQuestion=[
        {
            question: "Scales Quiz",
            answers:[
                "Major(ionian)",
                "Natural Minor(aeolian)",
                "Harmonic Minor",
                "Major Pentatonic",
                "Minor Pentatonic",
            ],
            correctAnswer: "Major(ionian)",
            sound: "/questions/major.mp3",
        },
        {
            
            question: "Scales Quiz",
            answers:[
                "Major(ionian)",
                "Natural Minor(aeolian)",
                "Harmonic Minor",
                "Major Pentatonic",
                "Minor Pentatonic",
            ],
            correctAnswer: "Natural Minor(aeolian)",
            sound: "/questions/minor.mp3"
        },
        {
            
            question: "Scales Quiz",
            answers:[
                "Major(ionian)",
                "Natural Minor(aeolian)",
                "Harmonic Minor",
                "Major Pentatonic",
                "Minor Pentatonic",
            ],
            correctAnswer: "Harmonic Minor",
            sound: "/questions/harmonic.mp3"
        }
        ,
        {
            
            question: "Scales Quiz",
            answers:[
                "Major(ionian)",
                "Natural Minor(aeolian)",
                "Harmonic Minor",
                "Major Pentatonic",
                "Minor Pentatonic",
            ],
            correctAnswer: "Major Pentatonic",
            sound: "/questions/major-pentatonic.mp3"
        }
        ,
        {
            
            question: "Scales Quiz",
            answers:[
                "Major(ionian)",
                "Natural Minor(aeolian)",
                "Harmonic Minor",
                "Major Pentatonic",
                "Minor Pentatonic",
            ],
            correctAnswer: "Minor Pentatonic",
            sound: "/questions/minor-pentatonic.mp3"
        }
    ]
       return scaleQuestion[position]
   }
   

   export function chordsQuestion(position) {

let chordsQuestion=[
    {
          
        question: "Chords quiz",
        answers:[
            "B minor",
            "C major",
            "C minor",
            "D minor",
            "F major",
            "F minor",

        ],
        correctAnswer: "B minor",
        sound: "/questions/bminor.mp3"
    },
    {
        question: "Chords quiz",
        answers:[
            "B minor",
            "C major",
            "C minor",
            "D minor",
            "F major",
            "F minor",

        ],
        correctAnswer: "C major",
        sound: "/questions/cmajor.mp3"
    },
    {
        question: "Chords quiz",
        answers:[
            "B minor",
            "C major",
            "C minor",
            "D minor",
            "F major",
            "F minor",

        ],
        correctAnswer: "C minor",
        sound: "/questions/cminor.mp3"
    },
    {
        question: "Chords quiz",
        answers:[
            "B minor",
            "C major",
            "C minor",
            "D minor",
            "F major",
            "F minor",

        ],
        correctAnswer: "D minor",
        sound: "/questions/dminor.mp3"
    },
    {
        question: "Chords quiz",
        answers:[
            "B minor",
            "C major",
            "C minor",
            "D minor",
            "F major",
            "F minor",

        ],
        correctAnswer: "F major",
        sound: "/questions/fmajor.mp3"
    },
    {
        question: "Chords quiz",
        answers:[
            "B minor",
            "C major",
            "C minor",
            "D minor",
            "F major",
            "F minor",

        ],
        correctAnswer: "F minor",
        sound: "/questions/fminor.mp3"
    },

]
return chordsQuestion[position]
}

export function perfectPitchQuestion(position) {

let perfectPitchQuestion=[
    { question: "Perfect Pitch quiz",
    answers:[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",

    ],
    correctAnswer: "A",
    sound: "/questions/A2.mp3"},
    { question: "Perfect Pitch quiz",
    answers:[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",

    ],
    correctAnswer: "B",
    sound: "/questions/B2.mp3"},
    { question: "Perfect Pitch quiz",
    answers:[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",

    ],
    correctAnswer: "F",
    sound: "/questions/F2.mp3"},
    { question: "Perfect Pitch quiz",
    answers:[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",

    ],
    correctAnswer: "C",
    sound: "/questions/C2.mp3"},

]
return perfectPitchQuestion[position]
}
