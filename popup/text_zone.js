const textArea = document.querySelector("#deciduous_text_zone");

const leafButton = document.querySelector("#leaf-button");
const copyButton = document.querySelector("#copy-button");

leafButton.addEventListener("click", appendLeaf);
copyButton.addEventListener("click", copyTreeToClipboard);

function appendLeaf() {
  const leafText = textArea.value;
  const currentTreePromise = browser.storage.local.get("deciduousTree");
  
  currentTreePromise.then((result) => {
    const tree = result.deciduousTree

    if(tree) {
      setToStorage(tree, leafText);
    } else {
      setToStorage("", leafText)
    }

    leafText.value = "";
  }, onError);
}

function setToStorage(currentTree, text) {
  const storingLeaf = browser.storage.local.set({"deciduousTree": `${currentTree} \n \n ${text}`});

  storingLeaf.then(() => {
    window.close();
  }, onError)
}

function copyTreeToClipboard() {
  const currentTreePromise = browser.storage.local.get("deciduousTree");

  currentTreePromise.then((result) => {
    const tree = result.deciduousTree

    writeToClipboard(tree);
    clearStorage();
  })
}

function writeToClipboard(content) {
  navigator.clipboard.writeText(content).then(() => {
    window.close();
  }, onError)
}

function clearStorage() {
  browser.storage.local.clear().then(() => {
    console.log("cleared storage");
  }, onError);
}

function onError(error) {
  console.log(error);
}
