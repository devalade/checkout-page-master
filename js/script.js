// Scroll reveal
ScrollReveal().reveal('.container')

// grab all element
const form = document.getElementById("form");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const fullname = document.getElementById("fullname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const country = document.getElementById("country");
const postalCode = document.getElementById("postal_code");
const successMessage = document.getElementsByClassName("success--message");
const counters = document.querySelectorAll('.counter');
let total = document.querySelector(".total .price");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const fullnameValue = fullname.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const countryValue = country.value.trim();
    const postalCodeValue = postalCode.value.trim();

    if (emailValue === '') {
        // show error
        // add error
        setErrorFor(email, "Email cannot be blank");
    } else if (isEmail(email)) {
        setErrorFor(email, "Email is not valid");
    }else {
        //add success class
        setSucess(email);
    }

    if (phoneValue == '') {
        setErrorFor(phone, 'Phone cannot be blank');
    } else {
        setSucess(phone);
    }

    if (fullnameValue === '') {
        setErrorFor(fullname, "Fullname cannot be blank");
    } else {
        setSucess(fullname);
    }

    if (cityValue === '') {
        setErrorFor(city, "City cannot be blank");
    } else {
        setSucess(city);
    }

    if (countryValue === '') {
        setErrorFor(country, "Country cannot be blank");
    } else {
        setSucess(country);
    }

    if (postalCodeValue === '') {
        setErrorFor(postalCode, "Postal Code cannot be blank");
    } else {
        setSucess(postalCode);
    }

    if (addressValue === '') {
        setErrorFor(address, "Address cannot be blank");
    } else {
        setSucess(address);
        successMessage.className = 'success--message error';
    }
}

function setErrorFor(input, message) {
    const customInput = input.parentElement; // Custom Input
    const formGroup = customInput.parentElement; // Form Group
    const smallError = formGroup.querySelector('small');

    //add error message inside small
    smallError.innerText = message;

    // add error class
    input.classList.add('error');
    smallError.classList.add('error');
}

function setSucess(input) {
    const customInput = input.parentElement; // Custom Input
    const formGroup = customInput.parentElement; // Form Group
    const smallError = formGroup.querySelector('small');
    
    // remove error class
    input.classList.remove('error');
    smallError.classList.remove('error');
}

function isEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

counters.forEach((counter) => {
    const articleInfo = counter.parentElement;
    const articleName = articleInfo.children[0];
    const price = Number(articleInfo.children[0].children[1].firstChild.nodeValue.replace("$", ""))

    counter.children.increment.addEventListener('click', () => {
        let counterValue = Number(counter.children[1].value);
        counter.children[1].value = counterValue + 1;
        const temp = Number(total.textContent.replace("$", "")) + Number(price);
        total.textContent = "$" + temp.toFixed(2) ;
        console.log(total.textContent);
    })

    counter.children.decrement.addEventListener('click', () => {
        let counterValue = Number(counter.children[1].value);
        counter.children[1].value = counterValue > 1 ? counterValue - 1 : counterValue;
        const temp = counterValue > 1 ?  Number(total.textContent.replace("$", "")) - price : Number(total.textContent.replace("$", ""));
        total.textContent = "$" + temp.toFixed(2);
        console.log(total.textContent);
    })
})

function getTotal() {
    let temp = Number(document.querySelector('.shipping .price').textContent.replace("$", ""));
    counters.forEach((counter) => {
        const articleInfo = counter.parentElement;
        const articleName = articleInfo.children[0];
        const price = Number(articleInfo.children[0].children[1].firstChild.nodeValue.replace("$", ""));

        let counterValue = Number(counter.children[1].value);
        temp += price * counterValue;
    })
    return temp.toFixed(2);
}
total.innerHTML = '$' + getTotal();
console.log(total.textContent)
console.log(getTotal());
