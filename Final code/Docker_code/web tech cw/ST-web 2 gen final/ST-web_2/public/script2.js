    document.addEventListener("DOMContentLoaded", function () {
        const body = document.querySelector("body"),
            sidebar = body.querySelector(".sidebar"),
            toggle = body.querySelector(".toggle"),
            searchBtn = body.querySelector(".search-box");
    
        //toggle.addEventListener("click", () => {
        //    sidebar.classList.toggle("close");
        //});
    
        searchBtn.addEventListener("click", () => {
            sidebar.classList.remove("close");
        });
    
        function clearCheckboxes() {
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }
    
        var clearButton = document.querySelector(".clear");
        clearButton.addEventListener("click", clearCheckboxes);
    });
    



