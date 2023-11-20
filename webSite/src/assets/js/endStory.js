
document.addEventListener("DOMContentLoaded", function() {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const storyElement = document.createElement("div");
    storyElement.classList.add("story");
    overlay.appendChild(storyElement);

    const backgroundMusic = document.createElement("audio");
    backgroundMusic.id = "backgroundMusic";
    backgroundMusic.loop = true;
    document.body.appendChild(backgroundMusic);

    const sourceElement = document.createElement("source");
    sourceElement.src = "/assets/audio/Rafael_Archangel_-_17_-_Sleep_Time.mp3";
    sourceElement.type = "audio/mp3";
    backgroundMusic.appendChild(sourceElement);

    const audioControl = document.createElement("div");
    audioControl.id = "audioControl";
    overlay.appendChild(audioControl);

    // Define the story sentences
    const storySentences = [
        "Après avoir affronté les domaines mystérieux de sa maison et les sources des perturbations,",
        "À la surprise de l'enfant, les monstres n'étaient pas aussi menaçants qu'ils en avaient l'air.",
        "Ils étaient des créatures ludiques, perdues et effrayées dans le monde humain.",
        "Avec gentillesse et compréhension, l'enfant se lia d'amitié avec les monstres et",
        "les a aidés à retrouver leur chemin vers leur royaume magique.",
        "En signe de gratitude, les monstres laissèrent derrière eux une pincée de magie",
        "qui transforma la maison autrefois ordinaire de l'enfant en un lieu de merveille et d'enchantement.",
        "À partir de ce jour, l'enfant et ses nouveaux amis vécurent harmonieusement,",
        "partageant des aventures magiques et créant des souvenirs précieux au cœur de Montréal."
      ];

    let sentenceIndex = 0;
    let wordIndex = 0;
    let letterIndex = 0;
    let sentenceTimeoutId = null;
    const letterAppearTime = 50;
    const wordAppearTime = 500;
    const sentenceFadeOutTime = 2000;
    const storyFadeOutTime = 2000;
    const storyFadeInTime = 2000;
    const skipButtonFadeOutTime = 1000;

    function showNextLetter(words, storyElement) {
        if (letterIndex < words[wordIndex].length) {
            const letterElement = document.createElement("span");
            letterElement.textContent = words[wordIndex][letterIndex];
            storyElement.appendChild(letterElement);

            letterIndex++;
            showNextLetter(words, storyElement);
        } else {
            storyElement.appendChild(document.createTextNode(" "));
            wordIndex++;
            showNextWord(words, storyElement);
        }
    }

    function showNextWord(words, storyElement) {
        if (wordIndex < words.length) {
            letterIndex = 0;
            showNextLetter(words, storyElement);
        } else {
            setTimeout(() => {
                storyElement.childNodes.forEach((node, index) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        setTimeout(() => {
                            node.classList.add("wordAppear");
                        }, letterAppearTime * index);
                    }
                });
            }, wordAppearTime);

            sentenceTimeoutId = setTimeout(() => {
                storyElement.classList.add("sentenceDisappear");
                setTimeout(() => {
                    storyElement.textContent = "";
                    storyElement.classList.remove("sentenceDisappear");
                    sentenceIndex++;
                    showNextSentence();
                }, sentenceFadeOutTime/2);
            }, sentenceFadeOutTime + (letterAppearTime * words.join("").length));
        }
    }

    function showNextSentence() {
        if (sentenceIndex < storySentences.length) {
            const words = storySentences[sentenceIndex].split(" ");
            wordIndex = 0;
            showNextWord(words, storyElement);
        } else {
            // reinitialize the story before going to the main game
            sentenceIndex = 0;
            wordIndex = 0;
            letterIndex = 0;
            clearTimeout(sentenceTimeoutId);
            overlay.classList.add("overlayFadeOut");
            setTimeout(() => {
                window.location.href = 'mainMenu.html';
            }, storyFadeOutTime);
        }
    }

    function skipToNextAnimation() {
        while (storyElement.firstChild) {
            storyElement.firstChild.remove();
        }
        sentenceIndex++;
        wordIndex = 0; // Reset wordIndex for the next sentence
        clearTimeout(sentenceTimeoutId);
        if (sentenceIndex < storySentences.length) {
            showNextSentence();
        } else {
            // reinitialize the story before going to the main game
            sentenceIndex = 0;
            wordIndex = 0;
            letterIndex = 0;
            clearTimeout(sentenceTimeoutId);
            overlay.classList.add("overlayFadeOut");
            setTimeout(() => {
                window.location.href = 'mainMenu.html';
            }, storyFadeOutTime);
        }
    }

    function addSkipButton() {
        const skipButton = document.createElement("button");
        skipButton.id = "skipButton";
        skipButton.textContent = "Skip Story" + "\u2192";
        skipButton.classList.add("skipButton");
        skipButton.addEventListener('click', function() {
            sentenceIndex = storySentences.length + 1;
            skipToNextAnimation();
        });
        overlay.appendChild(skipButton);
        return skipButton;
    }

    function addPlayButton() {
        const playButton = document.createElement("button");
        playButton.id = "playButton";
        playButton.textContent = "Play music";
        playButton.classList.add("playButton");
        playButton.addEventListener("click", function () {
            backgroundMusic.play();
            playButton.remove();
        });
        audioControl.appendChild(playButton);
        return playButton;
    }

    function addMuteButton() {
        const muteButton = document.createElement("button");
        muteButton.id = "muteButton";
        muteButton.textContent = "Mute";
        muteButton.classList.add("muteButton");
        muteButton.addEventListener("click", function () {
            if (backgroundMusic.volume === 0) {
                backgroundMusic.volume = 1;
                muteButton.textContent = "Mute";
            } else {
                backgroundMusic.volume = 0;
                muteButton.textContent = "Unmute";
            }
        });
        audioControl.appendChild(muteButton);
        return muteButton;
    }


    overlay.classList.add("overlayFadeIn");
    setTimeout(() => {
        overlay.classList.remove("overlayFadeIn");
        const muteButton = addMuteButton();
        const playButton = addPlayButton();
        const skipButton = addSkipButton();
        document.addEventListener("mousemove", function() {
            skipButton.classList.add('show');
            muteButton.classList.add('show');
            setTimeout(() => {
                skipButton.classList.remove('show');
                muteButton.classList.remove('show');
            }, skipButtonFadeOutTime);
        });

        document.addEventListener("click", function(event) {
            // Only call skipToNextAnimation if the event's target was not the skipButton
            if (event.target !== skipButton && event.target !== muteButton && event.target !== playButton) {
                skipToNextAnimation();
            }
        });

        showNextSentence();
    }, storyFadeInTime);
});

