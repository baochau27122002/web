"use strict";
(function () {
  const API_URL = "http://localhost:8000/api/register";
  window.addEventListener("load", init)
  function init() {
    let btn = document.getElementById("submit")
    btn.addEventListener("click", function (e) {
      e.preventDefault()

      const username = id("username").value
      const studentID = id("studentID").value
      const password = id("password").value
      console.log(username, studentID, password)
      register(username, studentID, password)
    });
  }
  function register(username, studentID, password) {
    // let params = new FormData();

    // params.append("username", user); 
    // params.append("studentID", studentID);// nó đang chưa lấy đc giá trị nè
    // params.append("password", password);
    const request = {
      'username': username,
      'studentID': studentID,
      'password': password,
    }
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then(statusCheck)
      .then((resp) => resp.text())
      .then(updateResults)
      .catch(console.error())

  }
  /* ------------------------------ Helper Functions  ------------------------------ */
  // function updateResults(txt) {
  //   console.log(txt)
  // }
  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the element that has the matches the selector passed.
   * @param {string} selector - selector for element
   * @return {object} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
