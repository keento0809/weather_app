const selected = document.querySelector("#favorites");

export function createOptions(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const optionTag = document.createElement("option");
    optionTag.innerHTML = `
      <option value=${dataArr[i]}>
        ${dataArr[i]}
      </option>
    `;
    selected.append(optionTag);
  }
}
