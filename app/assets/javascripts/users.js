$(function(){

  var search_list = $("#user-search-result");
  var member_list = $(".js-add-user");
  
  function appendUser(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
              search_list.append(html);
  }

  function appendMissUser(user){
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user}</p>
               </div>
               `
    search_list.append(html);
  }

  function  appendMember(name, id){
    var html = `
          <div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${id}'> 
            <p class='chat-group-user__name'>${name}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
          </div>
          `
    member_list.append(html);
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      url: "/users",
      type: "GET",
      data: {keyword: input},
      dataType: "json"
    })

    .done(function(users){
      if (users.length == 0) {
        $("#user-search-result").empty();
        appendMissUser("一致するユーザーが見つかりません")
      }
      else{
        $('#user-search-result').empty();
        users.forEach(function(user){ 
          appendUser(user)
        });
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });

  $(document).on('click', ".chat-group-user__btn--add", function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
    .parent()
    .remove();
    appendMember(userName, userId);
  });

  $(document).on('click', ".user-search-remove", function(){
    $(this)
    .parent()
    .remove();
  });
});