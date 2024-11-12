document.addEventListener("DOMContentLoaded", function() {
    const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
    if (!onlineUser) return (window.location.href = "../index.html");
    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
      Swal.fire({
        title: "Confirm Logout",
        text: "Are you sure you want to log out?",
        icon: "warning",
        confirmButtonColor: "#4880ff",
        cancelButtonColor: "#C13739",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout !",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("onlineUser");

          Swal.fire({
            title: "You’ve Logged Out!",
            text: "You’ve successfully logged out. See you next time!",
            icon: "success",
          }).then(() => {
            window.location.href = "../index.html";
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: "Logout Canceled",
            text: "You’re still logged in, and all your data is secure.",
            icon: "error",
          });
        }
      });
    });
})