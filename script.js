document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "EnQ-JXNDLRk01FMG5xFYedJDf-fli_SadhDJJUiT-jc";
  const formEl = document.querySelector("form");
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    search_image();
  });
  console.log(formEl);
  const input = document.getElementById("input");
  const container_image = document.getElementById("container-image");
  const show_more = document.getElementById("show_more");

  let input_data = "";
  let page = 1;

  async function search_image() {
    input_data = input.value;
    const url = `https://api.unsplash.com/search/photos?
    page=${page}&query=${input_data}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      container_image.innerHTML = "";
    }
    results.map((result) => {
      const div2 = document.createElement("div");
      div2.classList.add("container", "my-4", "d-flex", "text-center");
      const div3 = document.createElement("div");
      div3.classList.add("card", "mx-2","text-center");
      const image = document.createElement("img");
      image.src = result.urls.small;
       
      const card_title = document.createElement("h5");
      card_title.classList.add("card-title", "text-center");
      card_title.textContent = result.alt_description;
      
      div3.appendChild(image);
      div3.appendChild(card_title);
    
      div2.append(div3);
      container_image.appendChild(div2);
    });
    page++;
    if (page > 1) {
      show_more.style.display = "block";
    }
  }

  show_more.addEventListener("click", () => {
    search_image();
  });
});
