const textArea = document.querySelector("#deciduous_text_zone");

const leafButton = document.querySelector("#leaf-button");
const copyButton = document.querySelector("#copy-button");

leafButton.addEventListener("click", appendLeaf);
copyButton.addEventListener("click", copyTreeToClipboard);

function appendLeaf() {
  const leafText = textArea.value;
  const currentTreePromise = browser.storage.local.get("deciduousTree");

  currentTreePromise.then((result) => {
    // what happens if this is empty to begin with??

    const tree = result[0].deciduousTree

    // check that we can read the current value of the tree
    console.log(`current tree: ${tree}`)
    
    setToStorage(tree, leafText);
    leafText.value = "";
  }, onError);
}

function setToStorage(currentTree, text) {
  // is there a more elegant way to append?
  const storingLeaf = browser.storage.local.set({"deciduousTree": `${currentTree} \n \n ${text}`});

  // check that we're correctly appending the current text to the tree
  console.log(`storing this: ${currentTree} \n \n ${text}`)

  storingLeaf.then(() => {
    window.close();
  }, onError)
}

function copyTreeToClipboard() {
  const currentTreePromise = browser.storage.local.get("deciduousTree");

  currentTreePromise.then((result) => {
    const tree = result[0].deciduousTree

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
  }, isError);
}

function onError(error) {
  console.log(error);
}
