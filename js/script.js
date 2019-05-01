/**************************************************************
    Set focus on the first text field
 ***************************************************************/
//On page load focus on the first text field by default.
//also on load disable first option in dropmenu payment info and shirt design
$(this).ready(() => {
  $(`[name='user_name']`).focus();
  $("#design option:first").attr("disabled", "true");
  $(`[value="select_method"]`).attr("disabled", "true");
});
/**************************************************************
    ”Job Role” section
 ***************************************************************/
//if job role is set to other, else hide the text field.
$("#other-title").hide();
$("#title").change(function() {
  if ($(this).val() === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

/**************************************************************
    T-Shirt Info section
 ***************************************************************/
//Store shirts in seperate variables
let punsJS = [$("option:contains('JS Puns shirt only')")];
let heartJS = [$("option:contains('JS shirt only)')")];
//on theme change, update the color options
$("#colors-js-puns").css("display", "none");

//on change update the color options from the design option
$("#design").change(function() {
  if ($(this).val() === "js puns") {
    $("#colors-js-puns").css("display", "");
    $("#color").html(punsJS);
  }
  if ($(this).val() === "heart js") {
    $("#colors-js-puns").css("display", "");
    $("#color").html(heartJS);
  }

  //select the first option when updating color options
  $("#color option").removeAttr("selected");
  $("#color option:first").attr("selected", "selected");
});

/**************************************************************
    ”Register for Activities” section
 ***************************************************************/
let total = 0;
$(`.activities input`).change(function(e) {
  if (e.target.checked) {
    total += parseInt(e.target.value);
  } else if (!e.target.checked) {
    total -= parseInt(e.target.value);
  }
  //if JavaScript Libraries Workshop is selected disable Node.js Workshop
  if (e.target.name === "js-libs" && e.target.checked) {
    $(`input[name="node"]`).attr("disabled", "disabled");
  } else if (e.target.name === "js-libs" && !e.target.checked) {
    $(`input[name="node"]`).removeAttr("disabled");
  }
  //if Node.js Workshop is selected disable JavaScript Libraries Workshop
  if (e.target.name === "node" && e.target.checked) {
    $(`input[name="js-libs"]`).attr("disabled", "disabled");
  } else if (e.target.name === "node" && !e.target.checked) {
    $(`input[name="js-libs"]`).removeAttr("disabled");
  }
  //if JavaScript Frameworks Workshop is selected disable Express Workshop
  if (e.target.name === "js-frameworks" && e.target.checked) {
    $(`input[name="express"]`).attr("disabled", "disabled");
  } else if (e.target.name === "js-frameworks" && !e.target.checked) {
    $(`input[name="express"]`).removeAttr("disabled");
  }
  //if Express Workshop is selected disable JavaScript Frameworks Workshop
  if (e.target.name === "express" && e.target.checked) {
    $(`input[name="js-frameworks"]`).attr("disabled", "disabled");
  } else if (e.target.name === "express" && !e.target.checked) {
    $(`input[name="js-frameworks"]`).removeAttr("disabled");
  }
  //update the total value
  $(`.activities h3`).remove();
  $(`.activities`).append(`<h3>Total: $${total} </h3>`);
});
//give value to all activies of $100
$(`.activities input`).val(100);
//give value to only the first activity
$(`.activities input:first`).val(200);
//set the total value
$(`.activities`).append(`<h3>Total: $${total} </h3>`);
/**************************************************************
    "Payment Info" section
 ***************************************************************/
//remove the selet method option when clicked

$("#payment").change(function() {
  if ($(this).val() === "credit card") {
    $("#credit-card").css("display", "");
    $("fieldset div p").css("display", "none");
  } else if ($(this).val() === "paypal") {
    $("fieldset div p:first").css("display", "");
    $("fieldset div p:last").css("display", "none");
    $("#credit-card").css("display", "none");
  } else if ($(this).val() === "bitcoin") {
    $("fieldset div p:last").css("display", "");
    $("fieldset div p:first").css("display", "none");
    $("#credit-card").css("display", "none");
  } else {
    $("#credit-card").css("display", "");
    $("fieldset div p:first").css("display", "");
    $("fieldset div p:second").css("display", "");
  }
});

/**************************************************************
    Form validation
 ***************************************************************/
$(`button[type="submit"]`).click(function(e) {
  formReset();
  //validate name input
  if (!/^\D*[a-z]+/i.test($("#name").val())) {
    e.preventDefault();
    $("#name").css("border-color", "red");
    $(`[for="name"]`).append(`<p style="color: red;">Please Input a name</p>`);
  }
  //validate email input
  if (!/^[\w\.]+@[a-z]+\.[a-z]+$/i.test($("#mail").val())) {
    e.preventDefault();
    $("#mail").css("border-color", "red");
    $(`[for="mail"]`).append(
      `<p style="color: red;">Please Input a valid email</p>`
    );
  }
  //total can't be zero when submiting form
  if (total === 0) {
    e.preventDefault();
    $(".activities legend").css("color", "red");
  }
  //check if shirt design picked
  if ($("#design").val() !== "js puns" && $("#design").val() !== "heart js") {
    e.preventDefault();
    $("#design").css("border-color", "red");
    $(`.shirt legend`).css("color", "red");
  }
  //check if payment option picked
  if ($("#payment").val() !== "credit card" && $(this).val() !== "bitcoin") {
    e.preventDefault();
    $("#payment").css("border-color", "red");
    $(`[for="payment"]`).css("color", "red");
  }
  //if picked credit card check for valid fields
  if ($("#payment").val() === "credit card") {
    if (!/\d{13,16}/.test($("#cc-num").val())) {
      e.preventDefault();
      $("#cc-num").css("border-color", "red");
    }
    if (!/\d{5}/.test($("#zip").val())) {
      e.preventDefault();
      $("#zip").css("border-color", "red");
    }
    if (!/\d{3}/.test($("#cvv").val())) {
      e.preventDefault();
      $("#cvv").css("border-color", "red");
    }
  }
});
/**************************************************************
    function to reset form style
 ***************************************************************/
const formReset = () => {
  $(`[for="name"] p`).remove();
  $("[type='text']").css("border-color", "#c1deeb");
  $(`[for="mail"] p`).remove();
  $("#mail").css("border-color", "#c1deeb");
  $(".activities legend").css("color", "#184f68");
  $("#payment").css("border-color", "rgb(166, 166, 166)");
  $(`[for="payment"]`).css("color", "black");
  $("#design").css("border-color", "rgb(166, 166, 166)");
  $(`.shirt legend`).css("color", "#184f68");
};

/**************************************************************
    Real-time Error Messages & Conditional Error Message
 ***************************************************************/
//Check name input in real time
$("#name").on("keyup", e => {
  if (/^[a-z]+/i.test($("#name").val())) {
    $("#name").css("border-color", "#c1deeb");
    $(`[for="name"] p`).remove();
  } else if (!$("#name").val()) {
    $(`[for="name"] p`).remove();
    $("#name").css("border-color", "red");
    $(`[for="name"]`).append(`<p style="color: red;">Please Input a name</p>`);
  }
});
