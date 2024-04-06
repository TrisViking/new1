// Lấy tham chiếu đến nút:
let mybutton = document.getElementById("myBtn"); 
// Khi người dùng cuộn trang xuống 1200px từ đầu trang, hiển thị nút
window.onscroll = function() {scrollFunction()};/* Sự kiện onscroll được gắn với cửa sổ trang web. Khi người dùng cuộn trang xuống, hàm scrollFunction sẽ được gọi. */

function scrollFunction() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// Khi người dùng nhấn vào nút, cuộn lên đầu trang
function topFunction() {
  // Nút top sẽ ẩn đi
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}