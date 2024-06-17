document.addEventListener("DOMContentLoaded", () => {
    const countItems = document.querySelector(".count-items")
    const addToCartElm = document.getElementById("add")
    const minusElm = document.getElementById("minus")
    const plusElm = document.getElementById("plus")
    const inputElm = document.getElementById("num-items")
    const sideBar = document.getElementById("sidebar")
    const cartMenu = document.querySelector(".cart-menu")
    const titleElm = document.getElementById("title")
    const priceElm = document.getElementById("price")
    const cartIcon = document.getElementById("cart-icon")

    let totalPrice = 0
    let countCart = parseInt(countItems.textContent)



    minusElm.addEventListener("click", (e) => {
        e.preventDefault()
        let inputValue = inputElm.value
        if (inputValue > 0) {
            inputValue--
            inputElm.value = inputValue

        }

    })

    plusElm.addEventListener("click", (e) => {
        e.preventDefault()
        let inputValue = inputElm.value
        if (!isNaN(inputValue)) {
            inputValue++
            inputElm.value = inputValue

        }

    })



    addToCartElm.addEventListener("click", (e) => {
        e.preventDefault()

        const quantity = parseInt(inputElm.value);
        const price = parseFloat(priceElm.textContent.slice(1))

        if (!isNaN(quantity) && quantity > 0) {
            countCart += quantity
            countItems.textContent = countCart
            totalPrice += price * quantity
            cartMenu.innerHTML = `<div class="items">
                                    <img src="./images/image-product-1.jpg" alt="product 1"  id="cart-photo">
                            
                                    <p>${titleElm.textContent}<br> ${priceElm.textContent} x ${countCart} <span id="total-price">$${totalPrice.toFixed(2)}</span></p>
                                    <img id="delete" src="./images/icon-delete.svg" alt="delete icon">
                                   
                                  </div>`
            document.querySelector(".sidebar-btn").innerHTML = `<button>Checkout</button>`

            document.getElementById("delete").addEventListener("click", () => {
                cartMenu.innerHTML = '';
                document.querySelector(".sidebar-btn").innerHTML = ''
                countCart = 0;
                totalPrice = 0;
                countItems.textContent = countCart;
                cartMenu.innerHTML = "Your cart is empty"
            })

        }

        inputElm.value = 0

    })


    cartIcon.addEventListener("click", () => {
        sideBar.style.display = "block"
    })

    document.body.addEventListener("click", (e) => {
        if (!sideBar.contains(e.target) && e.target !== cartIcon) {
            sideBar.style.display = "none"
        }
    })

    // ---------------------Change images

    const mainImg = document.querySelector(".main-picture")
    const smallImgs = document.querySelectorAll(".small-img")

    smallImgs.forEach(smallImg => {
        smallImg.addEventListener("click", () => {
            mainImg.src = smallImg.src.replace('-thumbnail', '')
        })
    })

    // ----------------------------LightBox
    const createModal = () => {
        // Create modal elements
        const modal = document.createElement('div')
        modal.classList.add('modal')
        modal.style.display = 'none'

        const modalContent = document.createElement('div')
        modalContent.classList.add('modal-content')

        const closeBtn = document.createElement('button')
        closeBtn.classList.add('close-btn')
        closeBtn.innerHTML = '&times;'
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none'
        })

        const modalMainImg = document.createElement('img')
        modalMainImg.classList.add('main-picture-modal')
        modalMainImg.src = mainImg.src

        const otherPicturesDiv = document.createElement('div')
        otherPicturesDiv.classList.add('other-pictures')

        smallImgs.forEach((smallImg) => {
            const smallImgCol = document.createElement('div')
            smallImgCol.classList.add('small-img-col')
            
            const smallImgClone = document.createElement('img')
            smallImgClone.src = smallImg.src
            smallImgClone.classList.add('small-img-modal')
            smallImgClone.addEventListener('click', () => {
                modalMainImg.src = smallImgClone.src.replace('-thumbnail', '')
            })

            smallImgCol.appendChild(smallImgClone)
            otherPicturesDiv.appendChild(smallImgCol)
        })

        

        modalContent.appendChild(closeBtn)
        modalContent.appendChild(modalMainImg)
        modalContent.appendChild(otherPicturesDiv)
        modal.appendChild(modalContent)


     // Add left and right slider buttons
    const leftSlider = document.createElement('button')
    leftSlider.classList.add('slider', 'left-slider')
    leftSlider.innerHTML = '&#10094;'
    leftSlider.addEventListener('click', () => {
        // Logic to go to the previous image in smallImgs array
        for (let i = 0; i < smallImgs.length; i++) {
            if (modalMainImg.src === smallImgs[i].src.replace('-thumbnail', '')) {
                const prevIndex = (i - 1 + smallImgs.length) % smallImgs.length
                modalMainImg.src = smallImgs[prevIndex].src.replace('-thumbnail', '')
                break
            }
        }
    })

    const rightSlider = document.createElement('button')
    rightSlider.classList.add('slider', 'right-slider')
    rightSlider.innerHTML = '&#10095;'
    rightSlider.addEventListener('click', () => {
        //go to the next image
        for (let i = 0; i < smallImgs.length; i++) {
            if (modalMainImg.src === smallImgs[i].src.replace('-thumbnail', '')) {
                const nextIndex = (i + 1) % smallImgs.length
                modalMainImg.src = smallImgs[nextIndex].src.replace('-thumbnail', '')
                break
            }
        }
    })

    modalContent.appendChild(leftSlider)
    modalContent.appendChild(rightSlider)

        document.body.appendChild(modal)

        // Close the modal when clicking outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none'
            }
        })

        return modal
    }

    const modal = createModal()

    mainImg.addEventListener('click', () => {
        modal.style.display = 'flex'
        modal.querySelector('.main-picture-modal').src = mainImg.src
    })

    smallImgs.forEach((smallImg) => {
        smallImg.addEventListener('click', () => {
            const thumbSrc = smallImg.src
            const mainSrc = thumbSrc.replace('-thumbnail', '')
            mainImg.src = mainSrc;
        })
    })



    // ------------------Slider for smallScreen

    let currentIndex = 0

    const showImage = (index) => {
        const mainSrc = smallImgs[index].src.replace('-thumbnail', '')
        mainImg.src = mainSrc;
    }

    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + smallImgs.length) % smallImgs.length;
        showImage(currentIndex)
    })

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % smallImgs.length;
        showImage(currentIndex)
    })

    // Initialize with the first image
    showImage(currentIndex)

    // -------------------------BurgerMenu 
    const burgerMenu = document.querySelector(".burger-menu")
    let menuList
    let menuOverlay = document.querySelector(".menu-overlay")

    burgerMenu.addEventListener("click", () => {
        if (!menuList) {
            menuList = document.createElement("div");
            menuList.classList.add("menu-list");
            menuList.innerHTML = `
                <ul class="list-burger">
                    <li ><a href="#">Collections</a></li>
                    <li><a href="#">Men</a></li>
                    <li ><a href="#">Women</a></li>
                    <li ><a href="#">About</a></li>
                    <li ><a href="#">Contact</a></li>
                </ul>`
            document.body.appendChild(menuList)  // Append to the body or a suitable parent element
            
        }

        // Toggle visibility
        if (menuList.style.display === "block") {
            menuList.style.display = "none"
            menuOverlay.style.display = "none"
        } else {
            menuList.style.display = "block"
            menuOverlay.style.display = "block"
        }

         
    });

    // Close the menu and overlay when clicking outside of it
    document.addEventListener("click", (event) => {
        if (
            menuList &&
            menuOverlay &&
            !burgerMenu.contains(event.target) &&
            !menuList.contains(event.target)
        ) {
            menuList.style.display = "none"
            menuOverlay.style.display = "none"
        }
    })
})

