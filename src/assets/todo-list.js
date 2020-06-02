$(document).ready(function() {
    function renderTodoList(todoData) {
        let html = "";
        for (let i = 0; i < todoData.length; i++) {
            html += `<li data-id="${todoData[i].id}">${todoData[i].item}</li>`;
        }
        $("#todoList").html(html);
    }

    renderTodoList(JSON.parse(initialTodoList));
    $("form").on("submit", function() {
        var item = $("form input");
        var todo = { item: item.val() };

        $.ajax({
            type: "POST",
            url: "/todo",
            data: todo,
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert("An error occurred while fetching data!");
                }

                renderTodoList(response.todos);
            },
            error: function(err) {
                console.log("error:", err);
                alert("An error occurred.");
            },
        });

        return false;
    });

    $("#todoList").on("click", "li", function() {
        //var item = $(this).text().replace(/ /g, "-");
        const itemId = $(this).attr("data-id");

        $.ajax({
            type: "DELETE",
            url: `/todo/${itemId}`,
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert("An error occurred while fetching data!");
                }

                renderTodoList(response.todos);
            },
            error: function(err) {
                console.log("error:", err);
                alert("An error occurred!");
            },
        });
    });
});