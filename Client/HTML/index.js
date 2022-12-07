fetch("http://localhost:8000/api/annoucements",
  {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(statusCheck)
  .then((res) => {
    return res.json()
  })
  .then((completedata) => {
    let data = ""
    completedata.map((values) => {
      data += `<li class="media ms-4 me-4"> 
    <img src="../HTML/img/news.png" class="mr-3 mt-4" alt="..." style="width:40px"> 
    <div class="media-body mb-3">
    <h5 class="mt-0 mb-1">${values.title}</h5>
    <p>${values.content}</p>
    </div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 p1-2 mb-1 border-bottom">
    </div>
    </li>`
    })
    document.getElementById("list").innerHTML = data
  })
  .catch((err) => {
    console.log(err)
  })

async function statusCheck(res) {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res;
}

