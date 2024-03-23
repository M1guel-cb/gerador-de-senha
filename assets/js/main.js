const btn = document.querySelector("#btn")
const copy = document.querySelector("#password i")
const res = document.querySelector('#password p')
const pass = document.querySelector('#password')

function gerarSenha(size, types) {
    let password = ''

    if (types.length == 0 || size < 4 || size > 128 || isNaN(size)) {
        Toastify({
            text: "Erro! Tente selecionar um tipo e/ou alterar o tamanho da senha (4 a 128).",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
              background: "#EB1400",
            },
        }).showToast();
        return ''
    }

    types.forEach(type => {
        password += type[Math.floor(Math.random() * type.length)]
    });

    if (password.length < size) {
        while (password.length < size) {
            const type = types[Math.floor(Math.random() * types.length)]
            password += type[Math.floor(Math.random() * type.length)]
        }
    }

    return password
}

btn.addEventListener("click", () => {
    const listMin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const listMai = 'abcdefghijklmnopqrstuvwxyz'
    const listNum = '0123456789'
    const listCarc = "|,.;:/?\"'[]+-*=_!@#$%&"
    
    const size = document.querySelector('#size').value
    const min = document.querySelector("#min").checked
    const mai = document.querySelector("#mai").checked
    const num = document.querySelector("#num").checked
    const carc = document.querySelector("#carc").checked

    let tipos = []

    if (min) {
        tipos.push(listMin)
    }

    if (mai) {
        tipos.push(listMai)
    }

    if (num) {
        tipos.push(listNum)
    }

    if (carc) {
        tipos.push(listCarc)
    }

    const password = gerarSenha(size, tipos)
    if (password == '') {
        pass.style.display = "none"
    } else {
        pass.style.display = "flex"
    }
    res.innerHTML = password
})

copy.addEventListener('click', () => {
   navigator.clipboard.writeText(document.querySelector('#password p').textContent)
   Toastify({
    text: "Senha copiada com sucesso!",
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    style: {
      background: "#27EB25",
    },
  }).showToast();
})