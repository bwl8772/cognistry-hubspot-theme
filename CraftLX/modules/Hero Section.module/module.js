// Create a class attribute:
const att = document.createAttribute("playsline");
// Set the value of the class attribute:
att.value = "";
// Add the class attribute to the first h1:
const vid = document.getElementsByTagName("video")[0];
vid.setAttributeNode(att);