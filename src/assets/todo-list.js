const LIST_TEMPLATE = `<li data-id="{ITEM_ID}" class="flex-container"><p>{ITEM_NAME}</p>
    <button class="btn check-btn mr-5" data-id="{ITEM_ID}"><i class="fa fa-check"></i></button>
    <button class="btn undo-btn mr-5" data-id="{ITEM_ID}"><i class="fa fa-undo"></i></button>
    <button class="btn delete-btn" data-id="{ITEM_ID}"><i class="fa fa-trash"></i></button>
</li>`;

function getListData(item_id, item_name) {
    return LIST_TEMPLATE.replace(/{ITEM_ID}/g, item_id).replace(
        /{ITEM_NAME}/g,
        item_name
    );
}

function renderLists(todoData) {
    loading();
    let pendingTodoHtml = "";
    let completedTodoHtml = "";

    for (let i = 0; i < todoData.length; i++) {
        const html = getListData(todoData[i]._id, todoData[i].item);
        todoData[i].status === "Pending" ?
            (pendingTodoHtml += html) :
            (completedTodoHtml += html);
    }

    $("#todoList").html(pendingTodoHtml);
    $("#completedList").html(completedTodoHtml);
    loaded();
}

$(document).ready(function() {
    // render todo list on page
    renderLists(JSON.parse(initialTodoList));

    $("form").on("submit", function() {
        var itemName = $("form input").val().trim();
        var todo = { item: itemName };

        loading();
        $.ajax({
            type: "POST",
            url: "/todo",
            data: todo,
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert("An error occurred while adding item to TODO list!");
                    return false;
                }

                $("form input").val("");
                $("#todoList").prepend(getListData(response.itemId, itemName));
                loaded();
            },
            error: function(err) {
                console.log("error:", err);
                loaded();
                alert("An error occurred.");
            },
        });

        return false;
    });

    $("#todo-table").on("click", "button.delete-btn", function() {
        const itemId = $(this).attr("data-id");
        const todoItem = $(this).parent();

        loading();
        $.ajax({
            type: "DELETE",
            url: `/todo/${itemId}`,
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert("An error occurred while deleting item from TODO list!");
                    return false;
                }

                todoItem.remove();
                loaded();
            },
            error: function(err) {
                console.log("error:", err);
                loaded();
                alert("An error occurred!");
            },
        });
    });

    $("#todoList").on("click", "button.check-btn", function() {
        const itemId = $(this).attr("data-id");
        const todoItem = $(this).parent();

        loading();
        $.ajax({
            type: "PATCH",
            url: `/todo/${itemId}/complete`,
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert("An error occurred while marking item as complete!");
                    return false;
                }

                todoItem.detach().appendTo("#completedList");
                loaded();
            },
            error: function(err) {
                console.log("error:", err);
                loaded();
                alert("An error occurred!");
            },
        });
    });

    $("#completedList").on("click", "button.undo-btn", function() {
        const itemId = $(this).attr("data-id");
        const todoItem = $(this).parent();

        loading();
        $.ajax({
            type: "PATCH",
            url: `/todo/${itemId}/pending`,
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert("An error occurred while marking item as pending!");
                    return false;
                }

                todoItem.detach().appendTo("#todoList");
                loaded();
            },
            error: function(err) {
                console.log("error:", err);
                loaded();
                alert("An error occurred!");
            },
        });
    });
});