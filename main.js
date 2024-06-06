// 1
const url = "http://localhost:3000/products";
const tbody = document.querySelector('tbody');
const btnAdd = document.querySelector('.btn-add');
const content = document.querySelector('.content');
// console.log(tbody);
fetch(url).then(res =>res.json()).then(data => {
    // console.log(data);
    const html = data.map(pro =>{
        return `
        <tr>
            <td>${pro.id}</td>
            <td>${pro.name}</td>
            <td>${pro.price}</td>
            <td>${pro.desc}</td>
            <td>
                <button class="btn-update btn btn-success mb-4">Sửa</button>
                <button class="btn-del btn btn-success mb-4" data-id="${pro.id}" >Xóa</button>
            </td>
        </tr>
        `;
    }).join('');
    // console.log(html);

    tbody.innerHTML = html;

    // 2. Xoa
    const btnDel = document.querySelectorAll('.btn-del');
    console.log(btnDel);
    for (const btn of btnDel){
        btn.addEventListener('click', function(){
            if(confirm('Bạn có muốn xóa không !')){
                // alert(btn.dataset.id);
                const id = btn.dataset.id;
                removePro(id);
            }
        });
    }
}).catch(err => console.log(err)); // 1
const removePro = function(id){
    fetch(`${url}/${id}` , {
        method: 'DELETE',
    }).then(res => res.json()).then(() =>{
        alert('Bạn đã xóa thành công !');
    }).catch(err => console.log(err));
}

// 3
btnAdd.addEventListener('click', function(){
    content.innerHTML =/*html*/ `
    <form action="">
        <h2 class="content text-center w-75 mx-auto">THÊM SẢN PHẨM</h2>

        <input type="text" id="pro_name" class="form-control mb-4" placeholder="Tên sản phẩm">
        <input type="text" id="pro_price" class="form-control mb-4" placeholder="Giá">
        <input type="text" id="pro_desc" class="form-control mb-4" placeholder="Nội dung">
        <input type="submit" class="btn-submit btn btn-success" value="Thêm">
    
    </form>
    `;
    const btnSubmit = document.querySelector('.btn-submit');
    const pro_name = document.querySelector('#pro_name');
    const pro_price = document.querySelector('#pro_price');
    const pro_desc = document.querySelector('#pro_desc');

    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
        if(pro_name.value == ""){
            alert ('Vui lòng nhập tên sản phẩm !');
            pro_name.focus();
            return false;
        }else if(pro_desc.value == ""){
            alert ('Vui lòng nhập nội dung !');
            pro_desc.focus();
            return false;
        }else if(pro_price.value == ""){
            alert ('Vui lòng nhập giá !');
            pro_price.focus();
            return false;
        }else if(isNaN(Number(pro_price.value)) || Number(pro_price.value) <=0 ){
            alert('Giá sản phẩm phải là số và lớn hơn 0');
            pro_price.focus();
            return false;
        }
        const new_pro = {
            name: pro_name.value,
            price: pro_price.value,
            desc: pro_desc.value,
        }
        console.log(new_pro);
        addPro(new_pro);
    });
});
const addPro = function(data){
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(() =>{
        alert('Bạn đã thêm thành công!');
    }).catch(err => console.log(err));
}