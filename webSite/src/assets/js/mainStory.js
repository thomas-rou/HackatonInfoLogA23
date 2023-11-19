
document.addEventListener("DOMContentLoaded", function() {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const storyElement = document.createElement("div");
    storyElement.classList.add("story");
    overlay.appendChild(storyElement);

    // Define the story sentences
    const storySentences = [
        "Once upon a time, as the snow gently covered the streets of the city of Montreal,",
        "a young child discovered a strange phenomenon in his own house.",
        "Mysterious sounds echoed through the dark hallways,",
        "and fleeting shadows danced in the forgotten corners.",
        "The child then set out to investigate the origin of these nocturnal disturbances.",
        "Armed with his tenacity and ingenious spirit,",
        "he set out to chase away the mysterious monsters hiding in the corners of his home."
    ];

    let sentenceIndex = 0;
    let wordIndex = 0;
    let letterIndex = 0;
    let sentenceTimeoutId = null;
    const letterAppearTime = 50;
    const wordAppearTime = 500;
    const sentenceFadeOutTime = 2000;
    const storyFadeOutTime = 2000;
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
                window.location.href = 'mainGame.html';
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
                window.location.href = 'mainGame.html';
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

    const skipButton = addSkipButton();
    document.addEventListener("mousemove", function() {
        skipButton.classList.add('show');
        setTimeout(() => {
            skipButton.classList.remove('show');
        }, skipButtonFadeOutTime);
    });

    document.addEventListener("click", function(event) {
        // Only call skipToNextAnimation if the event's target was not the skipButton
        if (event.target !== skipButton) {
            skipToNextAnimation();
        }
    });

    showNextSentence();
});

