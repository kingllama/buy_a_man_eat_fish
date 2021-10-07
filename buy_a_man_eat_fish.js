// Buy a man eat fish, he day, teach fish man, to a lifetime,
// Man buy fish, day eat he. Fish man a to teach, him for a lifetime
// Teach a man to give, and you fish him for a lifetime. Fish day man feed, and you him"
// give a man a fish and you feed him for a day. teach a man to fish and you feed him for a lifetime

Array.prototype.dedupe = function dedupe() {
  this.splice.apply(this, [0, this.length].concat(this.filter((item, index, arr) => arr.indexOf(item, index + 1) === -1)));
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function randFromLength(array) {
  return Math.floor(Math.random() * array.length)
}

function thisMightBeTheCase() {
  return !Math.round(Math.random())
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function selectWords(availableWords, length) {
  let selectedWords = [];
  for(let i = 0; i < length; i++) {
    const rand = randFromLength(availableWords);
    if(availableWords[rand]) {
      selectedWords.push(availableWords[rand])
    } else {
      selectedWords.push("lifetime")
    }

    availableWords.splice(rand, 1);
  }
  return [selectedWords, availableWords]
}

function populateWithFiller(arrayToPopulate, fillerWords) {
  let completeArray = [];
  const iterations = arrayToPopulate.length - 1 || 1;
  for (let i = 0; i < iterations; i++) {
    if(arrayToPopulate.length > 1) {
      completeArray.push(arrayToPopulate[i]);
    }
    fillerCount = randBetween(0, 2)
    if(fillerCount > 0) {
      completeArray.push(fillerWords[randFromLength(fillerWords)])
    }
    if(fillerCount > 1) {
      completeArray.push(fillerWords[randFromLength(fillerWords)])
      if(thisMightBeTheCase()) {
        completeArray.push(fillerWords[randFromLength(fillerWords)])
      }
    }
  }
  completeArray.push(arrayToPopulate[arrayToPopulate.length - 1]);
  completeArray.dedupe();
  return completeArray;
}

function generate() {
  const $obtainment = () => thisMightBeTheCase() ? "give" : "buy";
  const $ingestion = () => thisMightBeTheCase() ? "feed" : "eat"
  const $pronoun = () => thisMightBeTheCase() ? "him" : "he"

  /* Duplicate Words */
  let duplicateWords = ["man", "fish", $ingestion];
  /* Primary Words
  Each stanza must contain at least one of these, and the whole poem should
  contain most of them. */
  let primaryWords = [$obtainment, "day", "teach", "lifetime"]
  primaryWords = primaryWords.concat(duplicateWords)
  /* Filler Words
  We can use these as much as we like! */
  let fillerWords = ["a", "a", "you", $pronoun, "for", "to"]

  let joiners = [" and ", ", ", ", "]

  let wholePoem = [];

  // Generate First Verse
    let firstVerse = [];
    // Generate the first stanza
    let firstStanza;
    [firstStanza, primaryWords] = selectWords(primaryWords, randBetween(2, 3));
    firstStanza = populateWithFiller(firstStanza,fillerWords);
    firstVerse.push(firstStanza);

    // Generate the seconds stanza
    let secondStanza;
    [secondStanza, primaryWords] = selectWords(primaryWords, randBetween(1, 3));
    secondStanza = populateWithFiller(secondStanza, fillerWords);
    firstVerse.push(secondStanza)

    wholePoem = [ firstVerse ];

  // Generate Second Verse
    primaryWords = primaryWords.concat(duplicateWords)
    primaryWords.dedupe();
    let secondVerse = [];
    // Generate the third stanza
    let thirdStanza;
    [thirdStanza, primaryWords] = selectWords(primaryWords, randBetween(1, 3));
    thirdStanza = populateWithFiller(thirdStanza,fillerWords);
    secondVerse.push(thirdStanza);

    // Generate the fourth stanza
    let fourthStanza;
    [fourthStanza, primaryWords] = selectWords(primaryWords, randBetween(1, 3));
    fourthStanza = populateWithFiller(fourthStanza, fillerWords);
    secondVerse.push(fourthStanza)

    wholePoem.push(secondVerse);

  return wholePoem.map((verse) =>
    verse.map((stanza) =>
      stanza.map((word) => typeof(word) == "string" ? word : word()).join(" ")
    )
    .join(joiners[randFromLength(joiners)])
    .capitalize()
  ).join(".\n");
}

document.getElementById("poem").innerText = generate();

