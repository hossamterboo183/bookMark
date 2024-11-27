
var siteName=document.getElementById("siteName")
var siteUrl=document.getElementById("booksUrl")
var books=[]
if(localStorage.getItem('Allbooks')!=null){
    books=JSON.parse(localStorage.getItem('Allbooks'))
    Display()
}

function submit(){
    if(validateUrl() && NameValidate()){
    var book={
        bookname:siteName.value,
        bookurl:siteUrl.value
    };
books.push(book)
    
    Display()
    localStorage.setItem('Allbooks',JSON.stringify(books))
    clearInput()
    }else{
        var message=""
        Swal.fire({
            icon: "error",
            title: "Site URL must be a valid one",
            text: "Site name must contain at least 3 characters",
          });
    }
}
function Display(){
    var cartona=''
    for(var i=0;i<books.length;i++){
        cartona+= ` <tr>
        <td>${i}</td>
        <td>${books[i].bookname}</td>
        <td>
          <button class="btn btn-success" onclick="visitUrl(${i})">
            <i class="fa-solid fa-eye me-2"></i>visite
          </button>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deleteBook(${i})">
            <i class="fa-solid fa-trash me-2"></i>delete
          </button>
        </td>
      </tr>`
    }
    document.getElementById("tableBody").innerHTML=cartona

}
function clearInput(){
    siteName.value=""
    siteUrl.value=""
}
function deleteBook(i){
    books.splice(i,1)
    Display()
    localStorage.setItem('Allbooks',JSON.stringify(books))

}
function visitUrl(i){
    window.open(books[i].bookurl,'_blank')
}
function NameValidate(){
    //use \w to match alphanumeric characters and underscore and 0-9
    //use \s to match whitespace
    var regex=/^\w{3,50}(\s+\w+)*$/
    //use \u0600-\u06FF\ w to match arabic characters
    var regexArabic=/^[\u0600-\u06FF\s]+$/

    if(regex.test(siteName.value)||regexArabic.test(siteName.value)){
        document.getElementById('nameError').classList.replace('d-block','d-none')
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        return true;
    
    }else{
        document.getElementById('nameError').classList.replace('d-none','d-block')
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')
        return false;
        
    }

}
function validateUrl(){
    //http//example.com,
    //url start with https//>>>>>>option
    /*([a-z A-Z 0-9 ]+\.) >>>to contain >>>>example.*/
    //[a-z A-Z]{2,6} >>>to contain >>>>com or org
    // /s to contain whitespace
    var pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\S*)$/;
    if(pattern.test(siteUrl.value)){
        document.getElementById('urlError').classList.replace('d-block','d-none')
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        return true
    }else{
        document.getElementById('urlError').classList.replace('d-none','d-block')
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
        return false
    }
}